'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';

import { Container1 } from '@/components/dashboard';
import { useDebounce } from '@/hooks/use-debounce';
import { sign, tableSrCount } from '@/lib';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { VendorPosExchangeCheckout } from './vendor-pos-exchange-checkout';
import { VendorPosSalesExchangeCard } from './vendor-pos-sales-exchange-card';
import { usePosSalesExchange } from './vendor-pos-sales-exchange.hook';
import {
	useVendorPosSalesCreateDataQuery,
	useVendorPosSellReturnMutation,
} from './vendor-pos-sales.api-slice';
import { iVendorPosSalesOrderShow } from './vendor-pos-sales.type';
import { VendorPosSellFilter } from './vendor-pos-sell-filter';
// Zod Schema for return form
const returnItemSchema = z.object({
	product_id: z.number().optional(),
	product_name: z.string().optional(),
	unit: z.string().optional(),
	color: z.string().optional(),
	variation: z.string().optional(),
	purchase_qty: z.number().optional(),
	rate: z.string().optional(),
	subtotal: z.string().optional(),
	return_qty: z
		.number({ error: 'Return Qty is required' })
		.min(0, { message: 'Return Qty must be at least 0' })
		.refine((val) => !isNaN(val), {
			message: 'Return Qty must be a number',
		}),
	remark: z.string().optional(),
});

const returnSchema = z.object({
	return_items: z
		.array(returnItemSchema)
		.min(1, 'At least one item must be returned'),
});

export type ReturnFormData = z.infer<typeof returnSchema>;

export function VendorPOSalesSellExchange({
	data,
}: {
	data: iVendorPosSalesOrderShow;
}) {
	const router = useRouter();
	const [filters, setFilters] = useState({
		searchTerm: '',
		brand_id: '',
		category_id: '',
	});
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

	const search = useDebounce(filters.searchTerm, 500);
	const {
		data: exchangeData,
		isLoading: exchangeLoading,
		isError: exchangeError,
	} = useVendorPosSalesCreateDataQuery({
		brand_id: filters.brand_id,
		category_id: filters.category_id,
		search,
	});

	// Redux state and actions
	const {
		cart,
		subtotal,
		discount,
		total,
		updateCartItemQuantity,
		removeFromCart,
		clearCart,
		setDiscount,
	} = usePosSalesExchange();
	const { logo, data: showData } = data;
	const [submitReturn, { isLoading }] = useVendorPosSellReturnMutation();
	const form = useForm<ReturnFormData>({
		resolver: zodResolver(returnSchema),
		defaultValues: {
			return_items: showData?.sale_details?.map((item) => ({
				product_id: item?.product_id,
				product_name: item?.product?.name,
				unit: item?.unit?.unit_name,
				color: item?.color?.name,
				variation: item?.size?.name,
				purchase_qty: item?.qty,
				rate: item?.rate,
				subtotal: item?.sub_total,
				return_qty: 0,
				remark: '',
			})),
		},
	});

	const { fields } = useFieldArray({
		control: form.control,
		name: 'return_items',
	});

	const onSubmit = async (formData: ReturnFormData) => {
		setIsCheckoutOpen(true);
	};

	const calculateReturnSubtotal = (returnQty: number, rate: string) => {
		return (returnQty * parseFloat(rate)).toFixed(2);
	};

	return (
		<div className="space-y-6">
			{/* Return Form */}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Return Items</CardTitle>
							<span>Invoice #{showData.barcode}</span>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Bill From */}
								<div>
									<h3 className="font-semibold text-lg mb-2">Bill From:</h3>
									<div className="space-y-1 text-sm">
										<p className="font-medium">
											{showData?.customer?.customer_name}
										</p>
										<p>{showData?.customer?.phone}</p>
										<p>{showData?.customer?.email}</p>
										<p>{showData?.customer?.address}</p>
									</div>
								</div>

								{/* Bill To */}
								<div>
									<h3 className="font-semibold text-lg mb-2">Bill To:</h3>
									<div className="space-y-1 text-sm">
										<p className="font-medium">
											{logo?.shop_name || 'Shop Name'}
										</p>
										<p>{logo?.phone || 'Phone'}</p>
										<p>{logo?.email || 'Email'}</p>
										<p>{logo?.address || 'Address'}</p>
									</div>
								</div>
							</div>
							{/* Products Table */}
							<div className="border rounded-lg">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="bg-stone-100">
												Product Name
											</TableHead>
											<TableHead className="bg-stone-100">Unit</TableHead>
											<TableHead className="bg-stone-100">Color</TableHead>
											<TableHead className="bg-stone-100">Variation</TableHead>
											<TableHead className="bg-stone-100">
												Purchase Qty
											</TableHead>
											<TableHead className="bg-stone-100">Rate</TableHead>
											<TableHead className="bg-stone-100">Return Qty</TableHead>
											<TableHead className="bg-stone-100">
												Return Subtotal
											</TableHead>
											<TableHead className="bg-stone-100 min-w-[200px]">
												Reason
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{fields.map((f_field, index) => {
											const returnQty =
												form.watch(`return_items.${index}.return_qty`) || 0;
											const rate =
												form.watch(`return_items.${index}.rate`) || '0';
											const returnSubtotal = calculateReturnSubtotal(
												returnQty,
												rate,
											);

											return (
												<TableRow key={f_field.id}>
													<TableCell className="font-medium">
														{f_field.product_name}
													</TableCell>
													<TableCell>{f_field.unit}</TableCell>
													<TableCell>{f_field.color}</TableCell>
													<TableCell>{f_field.variation}</TableCell>
													<TableCell>
														<Badge variant="outline">
															{f_field.purchase_qty}
														</Badge>
													</TableCell>
													<TableCell>
														{f_field.rate} {sign.tk}
													</TableCell>
													<TableCell>
														<FormField
															control={form.control}
															name={`return_items.${index}.return_qty`}
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Input
																			type="number"
																			min="0"
																			max={f_field?.purchase_qty}
																			{...field}
																			onChange={(e) => {
																				const value =
																					parseInt(e.target.value) || 0;
																				const max = f_field?.purchase_qty || 0;
																				if (value > max) {
																					toast.error(
																						`Return Qty must be less than or equal to ${max}`,
																					);
																					return;
																				}
																				field.onChange(value);
																			}}
																			onWheel={(e) => {
																				(e.target as HTMLInputElement).blur();
																			}}
																			className="w-20 pr-3"
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</TableCell>
													<TableCell>
														<Badge variant="secondary">
															{returnSubtotal} {sign.tk}
														</Badge>
													</TableCell>
													<TableCell>
														<FormField
															control={form.control}
															name={`return_items.${index}.remark`}
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Textarea
																			placeholder="Return reason..."
																			{...field}
																			className="min-h-[60px] w-full"
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</div>

							{/* Summary */}
							{/* <div className="flex justify-end">
								<Card className="w-80">
									<CardHeader>
										<CardTitle className="text-lg">Return Summary</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="flex justify-between">
											<span>Total Items:</span>
											<span>
												{
													form
														.watch('return_items')
														.filter((item) => item?.return_qty > 0).length
												}
											</span>
										</div>
										<div className="flex justify-between">
											<span>Total Return Qty:</span>
											<span>
												{form
													.watch('return_items')
													.reduce(
														(sum, item) => sum + (item?.return_qty || 0),
														0
													)}
											</span>
										</div>
										<Separator />
										<div className="flex justify-between font-semibold">
											<span>Total Return Amount:</span>
											<span>
												{form
													.watch('return_items')
													.reduce((sum, item) => {
														const returnQty = item?.return_qty || 0;
														const rate = parseFloat(item?.rate || '0') || 0;
														return sum + returnQty * rate;
													}, 0)
													.toFixed(2)}{' '}
												{sign.tk}
											</span>
										</div>
									</CardContent>
								</Card>
							</div> */}

							<Container1
								isError={exchangeError}
								isLoading={exchangeLoading}
								header={
									<>
										<div className="pb-2 lg:pb-3 flex items-center justify-between">
											<CardTitle>POS Sales</CardTitle>
										</div>
									</>
								}
							>
								<div className="grid grid-cols-12 gap-4">
									<Card className="col-span-12 lg:col-span-7">
										<CardContent className="space-y-4">
											<VendorPosSellFilter
												filters={filters}
												setFilters={setFilters}
												data={exchangeData || undefined}
												clearFilters={() =>
													setFilters({
														searchTerm: '',
														brand_id: '',
														category_id: '',
													})
												}
											/>
											<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
												{exchangeData?.products?.map((product) => (
													<VendorPosSalesExchangeCard
														key={product.id}
														product={product}
													/>
												))}
											</div>
											{/* products card and other info  */}
										</CardContent>
									</Card>
									<Card className="col-span-12 lg:col-span-5">
										<CardContent className="space-y-4">
											{/* Cart Items Table */}
											<div className="overflow-x-auto">
												<Table>
													<TableHeader>
														<TableRow>
															<TableHead className="w-10">Sr.</TableHead>
															<TableHead>Item Information</TableHead>
															<TableHead className="w-24">Sell Price</TableHead>
															<TableHead className="w-24">Discount</TableHead>
															<TableHead className="w-50 text-center">
																Qty
															</TableHead>
															<TableHead className="w-24">SubTotal</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														{cart.length === 0 ? (
															<TableRow>
																<TableCell
																	colSpan={7}
																	className="text-center text-muted-foreground"
																>
																	No items in cart
																</TableCell>
															</TableRow>
														) : (
															cart?.map((item, index) => (
																<TableRow
																	key={`${item.id}-${
																		item.variant_id || 'default'
																	}`}
																>
																	<TableCell className="font-medium">
																		{tableSrCount(1, index)}
																	</TableCell>
																	<TableCell>
																		<div className="space-y-1">
																			<div className="font-medium">
																				{item.name}
																			</div>

																			<div className="text-xs text-muted-foreground capitalize">
																				{item.unit ? item.unit : ''}
																				{item.color ? `, ${item.color}` : ''}
																				{item.size ? `, ${item.size}` : ''}
																			</div>
																		</div>
																	</TableCell>
																	<TableCell>
																		{sign.tk} {item.selling_price}
																	</TableCell>
																	<TableCell>
																		{item.discount_percentage
																			? `${item.discount_percentage}%`
																			: '-'}
																	</TableCell>
																	<TableCell>
																		<div className="relative">
																			<Button
																				variant="link"
																				size="icon"
																				className="h-8 w-8 absolute -bottom-1 right-0 z-10"
																				onClick={() =>
																					updateCartItemQuantity({
																						id: item.id,
																						variant_id: item.variant_id,
																						quantity: item.quantity - 1,
																					})
																				}
																			>
																				<Minus className="h-3 w-3" />
																			</Button>
																			<Input
																				type="number"
																				value={item.quantity}
																				onChange={(e) =>
																					updateCartItemQuantity({
																						id: item.id,
																						variant_id: item.variant_id,
																						quantity:
																							parseInt(e.target.value) || 0,
																					})
																				}
																				className="pr-3 hide-number-input-arrow w-full"
																			/>
																			<Button
																				variant="link"
																				size="icon"
																				className="h-8 w-8 absolute -top-1 right-0 z-10"
																				onClick={() =>
																					updateCartItemQuantity({
																						id: item.id,
																						variant_id: item.variant_id,
																						quantity: item.quantity + 1,
																					})
																				}
																			>
																				<Plus className="h-3 w-3" />
																			</Button>
																		</div>
																	</TableCell>
																	<TableCell className="relative overflow-hidden">
																		<span>
																			{sign.tk} {item.subtotal}
																		</span>
																		<Button
																			variant="link"
																			size="icon"
																			className="absolute -top-2 -right-2"
																			onClick={() =>
																				removeFromCart({
																					id: item.id,
																					variant_id: item.variant_id,
																				})
																			}
																		>
																			<Trash2 className="text-destructive  h-4 w-4" />
																		</Button>
																	</TableCell>
																</TableRow>
															))
														)}
													</TableBody>
												</Table>
											</div>

											{/* Cart Summary */}
											{cart.length > 0 && (
												<div className="space-y-4 border-t pt-4">
													<div className="space-y-2">
														<div className="flex justify-between">
															<span>Subtotal:</span>
															<span>
																{sign.tk} {subtotal}
															</span>
														</div>
														<div className="flex justify-between">
															<span>Discount:</span>
															<div className="flex items-center space-x-2">
																<Input
																	type="number"
																	value={discount}
																	onChange={(e) =>
																		setDiscount(parseFloat(e.target.value) || 0)
																	}
																	className="pr-3 hide-number-input-arrow"
																	placeholder="0"
																/>
																<span>%</span>
															</div>
														</div>
														{/* <div className="flex justify-between">
										<span>Tax:</span>
										<div className="flex items-center space-x-2">
											<Input
												type="number"
												value={tax}
												onChange={(e) =>
													setTax(parseFloat(e.target.value) || 0)
												}
												className="pr-3 hide-number-input-arrow"
												placeholder="0"
											/>
											<span>%</span>
										</div>
									</div> */}
														<div className="flex justify-between font-bold text-lg border-t pt-2">
															<span>Total:</span>
															<span>
																{sign.tk} {total < 0 ? 0 : total}
															</span>
														</div>
													</div>
												</div>
											)}
										</CardContent>
									</Card>
								</div>

								{/* Checkout Modal */}
								<VendorPosExchangeCheckout
									isOpen={isCheckoutOpen}
									onClose={() => setIsCheckoutOpen(false)}
									data={exchangeData}
									showData={showData}
									returnData={form.getValues()}
								/>
							</Container1>

							{/* Submit Button */}
							<div className="flex justify-end space-x-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => {
										form.reset();
										clearCart();
									}}
									disabled={isLoading}
								>
									Reset
								</Button>
								<Button
									type="submit"
									disabled={isLoading}
									className="min-w-[120px]"
								>
									{isLoading ? (
										<>
											<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
											Processing...
										</>
									) : (
										'Next Step'
									)}
								</Button>
							</div>
						</CardContent>
					</Card>
				</form>
			</Form>
		</div>
	);
}
