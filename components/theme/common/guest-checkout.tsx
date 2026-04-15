'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { sign } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import {
	useGetDeliveryChargeQuery,
	useGuestPlaceOrderMutation,
} from '@/store/features/frontend/cart';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Loader2, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	getGuestCart,
	iGuestCartItem,
	setGuestCart,
} from './guest-cart-action';

// ─── Validation schema ────────────────────────────────────────────────────────

const checkoutSchema = z.object({
	name: z.string().min(1, 'Full name is required').max(255),
	phone: z
		.string()
		.min(10, 'Phone number must be at least 10 characters')
		.regex(/^[0-9+\-\s()]+$/, 'Invalid phone number'),
	address: z
		.string()
		.min(10, 'Address must be at least 10 characters')
		.max(500),
	notes: z.string().max(1000).optional(),
	payment_method: z.enum(['cod']),
	agree: z.boolean().refine((val) => val === true, {
		message: 'You must accept the terms and conditions',
	}),
	delivery_charge: z.number().min(1, 'Delivery charge is required'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const plans = [
	{
		id: 'cod' as const,
		name: 'Cash on Delivery',
		description: 'Pay with COD',
	},
];

// ─── Delivery charges (static — replace with API call if needed) ───────────
// If you have a public delivery charges endpoint, swap this with a fetch/useQuery

// ─── Component ────────────────────────────────────────────────────────────────

export default function GuestCheckout() {
	const { data: session } = useSession();
	const { data: deliveryCharge, isLoading: isDeliveryChargeLoading } =
		useGetDeliveryChargeQuery();
	const [items, setItems] = useState<iGuestCartItem[]>([]);
	const [orderSuccess, setOrderSuccess] = useState<{
		orderNumber: string;
	} | null>(null);
	const [discount] = useState(0);

	const [placeOrder, { isLoading: isPlacingOrder }] =
		useGuestPlaceOrderMutation();

	// Load guest cart from localStorage
	useEffect(() => {
		setItems(getGuestCart());
	}, []);

	const subtotal = useMemo(
		() => items.reduce((sum, item) => sum + item.price * item.qty, 0),
		[items],
	);

	const form = useForm<CheckoutFormData>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			name: '',
			phone: '',
			address: '',
			notes: '',
			payment_method: 'cod',
			agree: false,
			delivery_charge: deliveryCharge?.deliveryCharge?.[0].id,
		},
	});

	const deliveryChargeId = form.watch('delivery_charge');
	const shipping =
		deliveryCharge?.deliveryCharge?.find(
			(c) => c.id === Number(deliveryChargeId),
		)?.charge ?? 0;

	const total = subtotal - discount + Number(shipping);

	// ── Submit ─────────────────────────────────────────────────────────────

	const onSubmit = async (data: CheckoutFormData) => {
		try {
			const result = await placeOrder({
				cart_id: 'guest-cart',
				payment_type: 'COD',
				tenant_id: 'perves',
				tenant_type: 'guest',
				datas: [
					{
						address: data.address,
						amount_to_collect: total,
						area_name:
							deliveryCharge?.deliveryCharge?.find(
								(c) => c.id === data.delivery_charge,
							)?.area || '',
						city: 'City',
						delivery_type: 1,
						email: '',
						id: 1,
						item_description: items.map((i) => i.name).join(', '),
						item_quantity: items.reduce((sum, i) => sum + i.qty, 0),
						item_type: 1,
						item_weight: 1,
						name: data.name,
						phone: data.phone,
						special_instruction: data.notes || '',
						// Pass guest cart items as variants
						variants: items.map((item) => ({
							id: item.product_id,
							unit: { id: item.unit_id ?? 1, unit_name: 'Unit' },
							qty: String(item.qty),
							size: { id: 1, name: item.size ?? '' },
							color: { id: 1, name: item.color ?? '' },
							variant_id: String(item.variant_id ?? ''),
							previousQty: String(item.qty),
						})),
					},
				],
			}).unwrap();

			if (result.success || result.status === 200) {
				// Clear guest cart after successful order
				setGuestCart([]);
				setItems([]);
				setOrderSuccess({
					orderNumber: result.data?.order_number || `ORD-${Date.now()}`,
				});
				toast.success('Order placed successfully!');
			} else {
				toast.error(result.message || 'Failed to place order');
			}
		} catch (error: any) {
			const validationErrors = error?.data?.data || error?.data?.errors;

			if (validationErrors && typeof validationErrors === 'object') {
				const fieldMapping: Record<string, keyof CheckoutFormData> = {
					'datas.0.phone': 'phone',
					'datas.0.address': 'address',
					'datas.0.name': 'name',
				};

				Object.entries(validationErrors).forEach(([field, messages]) => {
					const formField = fieldMapping[field] || field;
					const message = Array.isArray(messages) ? messages[0] : messages;
					if (message && formField in form.getValues()) {
						form.setError(formField as any, {
							type: 'server',
							message: String(message),
						});
					}
				});

				const firstError = Object.values(validationErrors)?.[0];
				toast.error(
					String(
						Array.isArray(firstError)
							? firstError[0]
							: firstError || 'Validation failed',
					),
				);
				return;
			}

			toast.error(error?.data?.message || 'Something went wrong');
		}
	};

	if (session) return null;

	// ── Order success ──────────────────────────────────────────────────────

	if (orderSuccess) {
		return (
			<MotionFadeIn>
				<section className="max-w-xl text-center mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
						<CheckCircle className="w-12 h-12 text-green-500" />
					</div>
					<h3 className="text-2xl font-bold mb-4 text-green-600">
						🎉 Order Confirmed!
					</h3>
					<p className="text-gray-600 mb-4">
						Thank you for your purchase! Your order has been placed
						successfully.
					</p>
					<p className="text-sm text-gray-500 mb-8">
						We&apos;ll send you an update when your order is on its way.
					</p>
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<Link href="/auth?tab=login">
							<Button variant="outline">Login to track order</Button>
						</Link>
						<Link href="/shop">
							<Button className="bg-orange-500 text-white">
								Continue Shopping
							</Button>
						</Link>
					</div>
				</section>
			</MotionFadeIn>
		);
	}

	// ── Empty cart ─────────────────────────────────────────────────────────

	if (items.length === 0) {
		return (
			<section>
				<h1 className="text-3xl font-bold mb-6">Checkout</h1>
				<div className="rounded-md border p-12 text-center">
					<ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
					<h2 className="text-xl font-semibold text-gray-700 mb-2">
						Your cart is empty
					</h2>
					<p className="text-gray-500 mb-6">
						Add some items to your cart before checkout
					</p>
					<Link href="/shop">
						<Button className="bg-orange-500 hover:bg-orange-500/80 text-white">
							Browse Products
						</Button>
					</Link>
				</div>
			</section>
		);
	}

	// ── Main checkout ──────────────────────────────────────────────────────

	return (
		<MotionFadeIn>
			<section className="pt-10">
				<h1 className="text-3xl font-bold mb-6">Checkout</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
							{/* Billing Details */}
							<div className="lg:col-span-8">
								<div className="border rounded-md p-5">
									<h2 className="text-lg font-bold mb-4">BILLING DETAILS</h2>
									<div className="space-y-5">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Full Name *</FormLabel>
													<FormControl>
														<Input placeholder="Your full name" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="phone"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Phone Number *</FormLabel>
													<FormControl>
														<Input placeholder="01XXXXXXXXX" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="delivery_charge"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Select Delivery Area *</FormLabel>
													<FormControl>
														<Select
															onValueChange={(value) =>
																field.onChange(Number(value))
															}
															defaultValue={field.value?.toString()}
														>
															<SelectTrigger className="w-full">
																<SelectValue placeholder="Select Delivery Charge" />
															</SelectTrigger>
															<SelectContent>
																{deliveryCharge?.deliveryCharge?.map(
																	(charge) => (
																		<SelectItem
																			key={charge.id}
																			value={charge.id.toString()}
																		>
																			{charge.area} - {charge.charge}
																			{sign.tk}
																		</SelectItem>
																	),
																)}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="address"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Delivery Address *</FormLabel>
													<FormControl>
														<Textarea
															placeholder="House no, Road no, Area, District"
															className="resize-none"
															rows={3}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="notes"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Order Notes (Optional)</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Notes about your order, e.g. special notes for delivery."
															className="resize-none"
															rows={2}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>

							{/* Order Summary */}
							<aside className="lg:col-span-4">
								<div className="border rounded-md p-5 sticky top-4 space-y-4">
									<h2 className="text-lg font-bold">YOUR ORDER</h2>

									{/* Order Items */}
									<div className="divide-y max-h-64 overflow-y-auto">
										{items.map((item) => (
											<div
												key={item.product_id}
												className="py-3 flex items-start gap-3"
											>
												<div className="w-14 h-14 rounded overflow-hidden flex-shrink-0 bg-gray-100">
													{item.image ? (
														<img
															src={item.image}
															alt={item.name}
															className="w-full h-full object-cover"
														/>
													) : (
														<div className="w-full h-full flex items-center justify-center text-gray-300">
															<ShoppingCart className="w-6 h-6" />
														</div>
													)}
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium leading-5 truncate">
														{item.name}
													</p>
													<p className="text-xs text-gray-500">
														Qty: {item.qty}
													</p>
													{item.color && (
														<p className="text-xs text-gray-400">
															Color: {item.color}
														</p>
													)}
													{item.size && (
														<p className="text-xs text-gray-400">
															Size: {item.size}
														</p>
													)}
												</div>
												<div className="text-sm font-semibold">
													{(item.price * item.qty).toLocaleString()}৳
												</div>
											</div>
										))}
									</div>

									<hr />

									{/* Totals */}
									<div className="space-y-2 text-sm">
										<div className="flex items-center justify-between">
											<span className="text-gray-600">Subtotal</span>
											<span className="font-semibold">
												{subtotal.toLocaleString()}৳
											</span>
										</div>
										{discount > 0 && (
											<div className="flex items-center justify-between">
												<span className="text-gray-600">Discount</span>
												<span className="font-semibold text-green-600">
													-{discount}৳
												</span>
											</div>
										)}
										<div className="flex items-start justify-between">
											<span className="text-gray-600">Shipping</span>
											<div className="text-right">
												<div className="font-semibold">{shipping}৳</div>
												<div className="text-xs text-gray-500">
													{deliveryCharge?.deliveryCharge?.find(
														(c) => c.id === Number(deliveryChargeId),
													)?.area || ''}
												</div>
											</div>
										</div>
										<hr />
										<div className="flex items-center justify-between text-base">
											<span className="font-semibold">Total</span>
											<span className="font-bold text-orange-500">
												{total.toLocaleString()}৳
											</span>
										</div>
									</div>

									{/* Payment Method */}
									<FormField
										control={form.control}
										name="payment_method"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="font-semibold">
													Payment Method
												</FormLabel>
												<FormControl>
													<fieldset className="flex flex-col gap-3">
														<p className="text-muted-foreground text-sm">
															Select your preferred payment method.
														</p>
														<RadioGroup
															defaultValue={field.value}
															className="grid grid-cols-1 gap-3"
															onValueChange={field.onChange}
														>
															{plans.map((plan) => (
																<Label
																	className="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/5 flex items-start gap-3 rounded-lg border p-3"
																	key={plan.id}
																>
																	<RadioGroupItem
																		value={plan.id}
																		id={plan.name}
																		className="data-[state=checked]:border-primary"
																	/>
																	<div className="grid gap-1 font-normal">
																		<div className="font-medium">
																			{plan.name}
																		</div>
																		<div className="text-muted-foreground pr-2 text-xs leading-snug">
																			{plan.description}
																		</div>
																	</div>
																</Label>
															))}
														</RadioGroup>
													</fieldset>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Terms */}
									<FormField
										control={form.control}
										name="agree"
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-2 space-y-0">
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
														className="data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
													/>
												</FormControl>
												<div className="space-y-1 leading-none">
													<FormLabel className="text-sm font-normal cursor-pointer">
														I accept the{' '}
														<Link
															href="/terms"
															className="text-orange-500 hover:underline"
														>
															Terms & Conditions
														</Link>
													</FormLabel>
													<FormMessage />
												</div>
											</FormItem>
										)}
									/>

									{/* Place Order Button */}
									<Button
										type="submit"
										disabled={isPlacingOrder}
										className="w-full h-11 text-white bg-orange-500 hover:bg-orange-500/80"
									>
										{isPlacingOrder ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Placing Order...
											</>
										) : (
											`Place Order - ${total.toLocaleString()}৳`
										)}
									</Button>

									{/* Login nudge */}
									<p className="text-xs text-center text-gray-400">
										Have an account?{' '}
										<Link
											href="/auth?tab=login"
											className="text-orange-500 hover:underline"
										>
											Login for faster checkout
										</Link>
									</p>
								</div>
							</aside>
						</div>
					</form>
				</Form>
			</section>
		</MotionFadeIn>
	);
}
