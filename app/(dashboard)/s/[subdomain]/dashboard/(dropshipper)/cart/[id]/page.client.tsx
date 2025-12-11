'use client';

import { Container1 } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm } from '@/lib';
import {
	useCartViewQuery,
	useCheckoutCartMutation,
	useUpdateCartMutation,
} from '@/store/features/dropshipper/cart';
import {
	Check,
	Edit2,
	Minus,
	Plus,
	ShoppingCart,
	Trash2,
	X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
const plans = [
	{
		id: 'aamarpay', // should match backend value
		name: 'Amar Pay',
		description: 'Pay with Amar Pay',
		price: '$10',
	},
	{
		id: 'my-wallet', // should match backend value
		name: 'My Wallet',
		description: 'Pay with My Wallet',
		price: '$10',
	},
] as const;
interface CartViewPageClientProps {
	cartId: string;
}

interface CartItem {
	id: string;
	first_name: string;
	last_name: string;
	phone: string;
	email: string;
	city: string;
	address: string;
	note: string;
	delivery_area_id?: string;
	courier_id?: string;
	delivery_type?: 'area' | 'courier';
	variants: Array<{
		id: string;
		unit_id?: number;
		color_id?: number;
		size_id?: number;
		qty: number;
		unit_name?: string;
		color_name?: string;
		size_name?: string;
		variant_id?: string;
		price: number;
	}>;
}

export default function CartViewPageClient({
	cartId,
}: CartViewPageClientProps) {
	const [gateway, setGateway] = useState<'aamarpay'>('aamarpay');
	const { data, isLoading, isError, isFetching } = useCartViewQuery(
		{ cartId },
		{ skip: !cartId }
	);
	const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
	const [checkoutCart, { isLoading: isCheckoutLoading }] =
		useCheckoutCartMutation();
	const cartItem = data?.data;
	const product = cartItem?.product;

	const [items, setItems] = useState<CartItem[]>([]);
	console.log(items);

	const [editingItemId, setEditingItemId] = useState<string | null>(null);
	const [form, setForm] = useState<any>({
		first_name: '',
		last_name: '',
		phone: '',
		email: '',
		city: '',
		address: '',
		note: '',
		delivery_area_id: '',
		courier_id: '',
	});
	const [variantForm, setVariantForm] = useState<any>({
		unit_id: '',
		color_id: '',
		size_id: '',
		qty: '',
		variant_id: '',
	});

	// State for managing variant quantities
	const [variantQuantities, setVariantQuantities] = useState<
		Record<string, number>
	>({});

	// State to track total quantities used per variant across all cart items
	const [usedQuantities, setUsedQuantities] = useState<Record<string, number>>(
		{}
	);

	// Initialize variant quantities with remaining quantities available
	useEffect(() => {
		if (cartItem?.cart_details) {
			const initialQuantities: Record<string, number> = {};
			const fallbackQuantity = cartItem?.product_qty || 0;
			cartItem.cart_details.forEach((detail) => {
				const originalMax =
					parseFloat(detail.qty?.toString() || '0') ||
					parseFloat(cartItem?.product_qty?.toString() || '0') ||
					fallbackQuantity;
				const remaining = getRemainingQuantity(
					detail.id.toString(),
					originalMax
				);
				// Set default to remaining quantity, but at least 1 if available
				initialQuantities[detail.id.toString()] = Math.min(
					remaining,
					remaining > 0 ? 1 : 0
				);
			});
			setVariantQuantities(initialQuantities);
		}
	}, [cartItem, usedQuantities]);

	// Helper functions
	const getRemainingQuantity = (detailId: string, originalMax: number) => {
		const used = usedQuantities[detailId] || 0;
		return Math.max(0, originalMax - used);
	};

	const resetForm = () => {
		setForm({
			first_name: '',
			last_name: '',
			phone: '',
			email: '',
			city: '',
			address: '',
			note: '',
			delivery_area_id: '',
			courier_id: '',
		});
		setVariantForm({
			unit_id: '',
			color_id: '',
			size_id: '',
			qty: '',
			variant_id: '',
		});
		// Reset variant quantities to remaining available quantities
		if (cartItem?.cart_details) {
			const resetQuantities: Record<string, number> = {};
			const fallbackQuantity = cartItem?.product_qty || 0;
			cartItem.cart_details.forEach((detail) => {
				const originalMax =
					parseFloat(detail.qty?.toString() || '0') ||
					parseFloat(cartItem?.product_qty?.toString() || '0') ||
					fallbackQuantity;
				const used = usedQuantities[detail.id.toString()] || 0;
				const remaining = Math.max(0, originalMax - used);
				// Set default to remaining quantity, but at least 1 if available
				resetQuantities[detail.id.toString()] = Math.min(
					remaining,
					remaining > 0 ? 1 : 0
				);
			});
			setVariantQuantities(resetQuantities);
		}
		// Note: usedQuantities state is not reset here as it should persist across form resets
	};

	const handleCreateItem = () => {
		if (
			!form.first_name ||
			!form.phone ||
			!form.email ||
			!form.city ||
			!form.address
		) {
			toast.error('Please fill in all required fields');
			return;
		}

		const newItem: CartItem = {
			id: `item-${Date.now()}`,
			first_name: form.first_name,
			last_name: form.last_name || '',
			phone: form.phone,
			email: form.email,
			city: form.city,
			address: form.address,
			note: form.note || '',
			delivery_area_id: form.delivery_area_id || undefined,
			courier_id: form.courier_id || undefined,
			delivery_type: form.delivery_area_id
				? 'area'
				: form.courier_id
				? 'courier'
				: undefined,
			variants:
				cartItem?.cart_details?.map((detail) => ({
					id: `variant-${detail.id}`,
					unit_id: detail.unit_id,
					color_id: detail.color?.id,
					size_id: detail.size?.id,
					qty:
						variantQuantities[detail.id.toString()] ||
						parseFloat(detail.qty || '0') ||
						1,
					unit_name: detail.unit?.name,
					color_name: detail.color?.name,
					size_name: detail.size?.name,
					variant_id: detail.variant_id,
					price: Number(product?.selling_price) || 0,
				})) || [],
		};

		setItems([...items, newItem]);

		// Update used quantities for each variant
		setUsedQuantities((prev) => {
			const updated = { ...prev };
			newItem.variants.forEach((variant) => {
				const detailId = variant.id.replace('variant-', '');
				updated[detailId] = (updated[detailId] || 0) + variant.qty;
			});
			return updated;
		});

		resetForm();
		toast.success('Item created successfully');
	};

	const handleEditItem = (itemId: string) => {
		const item = items.find((i) => i.id === itemId);
		if (item) {
			setEditingItemId(itemId);
			setForm({
				first_name: item.first_name,
				last_name: item.last_name,
				phone: item.phone,
				email: item.email,
				city: item.city,
				address: item.address,
				note: item.note,
				delivery_area_id: item.delivery_area_id || '',
				courier_id: item.courier_id || '',
			});
			// Set variant quantities for editing
			const editingQuantities: Record<string, number> = {};
			item.variants.forEach((variant) => {
				const detailId = variant.id.replace('variant-', '');
				editingQuantities[detailId] = variant.qty;
			});
			setVariantQuantities(editingQuantities);

			// Temporarily release the quantities of the item being edited
			// so they become available for reselection
			setUsedQuantities((prev) => {
				const updated = { ...prev };
				item.variants.forEach((variant) => {
					const detailId = variant.id.replace('variant-', '');
					updated[detailId] = Math.max(
						0,
						(updated[detailId] || 0) - variant.qty
					);
				});
				return updated;
			});
		}
	};

	const handleUpdateItem = () => {
		if (!editingItemId) return;

		if (
			!form.first_name ||
			!form.phone ||
			!form.email ||
			!form.city ||
			!form.address
		) {
			toast.error('Please fill in all required fields');
			return;
		}

		const updatedItem: CartItem = {
			...items.find((item) => item.id === editingItemId)!,
			first_name: form.first_name,
			last_name: form.last_name || '',
			phone: form.phone,
			email: form.email,
			city: form.city,
			address: form.address,
			note: form.note || '',
			delivery_area_id: form.delivery_area_id || undefined,
			courier_id: form.courier_id || undefined,
			delivery_type: (form.delivery_area_id
				? 'area'
				: form.courier_id
				? 'courier'
				: undefined) as 'area' | 'courier' | undefined,
			variants: items
				.find((item) => item.id === editingItemId)!
				.variants.map((variant) => {
					// Find the corresponding cart detail to get the current quantity
					const detail = cartItem?.cart_details?.find(
						(d) => `variant-${d.id}` === variant.id
					);
					if (detail) {
						return {
							...variant,
							qty: variantQuantities[detail.id.toString()] || variant.qty,
						};
					}
					return variant;
				}),
		};

		setItems(
			items.map((item) => (item.id === editingItemId ? updatedItem : item))
		);

		// Add back the new quantities to used tracking
		setUsedQuantities((prev) => {
			const updated = { ...prev };
			updatedItem.variants.forEach((variant) => {
				const detailId = variant.id.replace('variant-', '');
				updated[detailId] = (updated[detailId] || 0) + variant.qty;
			});
			return updated;
		});

		setEditingItemId(null);
		resetForm();
		toast.success('Item updated successfully');
	};

	const handleCancelEdit = () => {
		// Add back the original quantities since edit was cancelled
		if (editingItemId) {
			const originalItem = items.find((item) => item.id === editingItemId);
			if (originalItem) {
				setUsedQuantities((prev) => {
					const updated = { ...prev };
					originalItem.variants.forEach((variant) => {
						const detailId = variant.id.replace('variant-', '');
						updated[detailId] = (updated[detailId] || 0) + variant.qty;
					});
					return updated;
				});
			}
		}

		setEditingItemId(null);
		resetForm();
	};

	const handleDeleteItem = (itemId: string) => {
		if (items.length === 1) {
			toast.error('At least one item is required');
			return;
		}

		// Get the item being deleted to subtract its quantities
		const itemToDelete = items.find((item) => item.id === itemId);
		if (itemToDelete) {
			setUsedQuantities((prev) => {
				const updated = { ...prev };
				itemToDelete.variants.forEach((variant) => {
					const detailId = variant.id.replace('variant-', '');
					updated[detailId] = Math.max(
						0,
						(updated[detailId] || 0) - variant.qty
					);
				});
				return updated;
			});
		}

		setItems(items.filter((item) => item.id !== itemId));
		toast.success('Item deleted successfully');
	};

	const getDeliveryCharge = (item: CartItem) => {
		if (item.delivery_type === 'area' && item.delivery_area_id) {
			const area = data?.deliveryArea?.find(
				(a) => a.id.toString() === item.delivery_area_id
			);
			return area ? parseFloat(area.charge) : 0;
		}
		if (item.delivery_type === 'courier' && item.courier_id) {
			const courier = data?.data?.courier?.find(
				(c) => c.id.toString() === item.courier_id
			);
			return courier ? parseFloat(courier.charge) : 0;
		}
		return 0;
	};

	// Calculate totals from created cart items
	const calculateTotals = () => {
		const basePrice = parseFloat(product?.selling_price || '0');
		const discountRate = parseFloat(product?.discount_rate || '0');
		const discount = (basePrice * discountRate) / 100;
		const discountedPrice = basePrice - discount;

		// Calculate totals from created items
		let totalQuantity = 0;
		let totalDeliveryCharge = 0;
		let totalCommission = 0;
		let totalAdvancePayment = 0;

		items.forEach((item) => {
			// Sum quantities across all variants
			const itemQuantity = item.variants.reduce(
				(sum, variant) => sum + variant.qty,
				0
			);
			totalQuantity += itemQuantity;

			// Add delivery charge for this item
			totalDeliveryCharge += getDeliveryCharge(item);

			// Calculate commission and advance payment based on item quantity
			// Using the same logic as the original cart item
			const itemCommission =
				(cartItem?.total_affiliate_commission || 0) *
				(itemQuantity / (cartItem?.product_qty || 1));
			const itemAdvancePayment =
				(cartItem?.advancepayment || 0) *
				(itemQuantity / (cartItem?.product_qty || 1));

			totalCommission += itemCommission;
			totalAdvancePayment += itemAdvancePayment;
		});

		const totalProductPrice = discountedPrice * totalQuantity;
		const totalWithDelivery = totalProductPrice + totalDeliveryCharge;

		return {
			basePrice,
			discountedPrice,
			totalQuantity,
			totalProductPrice,
			totalDeliveryCharge,
			totalCommission,
			totalAdvancePayment,
			totalWithDelivery,
		};
	};

	const totals = calculateTotals();
	// For backward compatibility, keep the old variables
	const price = totals.basePrice;
	const quantity = totals.totalQuantity;
	const discount = (price * parseFloat(product?.discount_rate || '0')) / 100;
	const discountedPrice = totals.discountedPrice;

	const handleCheckout = () => {
		// Transform cart items into the required API format
		const checkoutData = items.map((item, index) => {
			// Get delivery area name
			const deliveryArea = item.delivery_area_id
				? data?.deliveryArea?.find(
						(area) => area.id.toString() === item.delivery_area_id
				  )
				: null;

			// Calculate total quantity for this item
			const itemQuantity = item.variants.reduce(
				(sum, variant) => sum + variant.qty,
				0
			);

			// Get delivery type (map to required format)
			let deliveryType = 48; // default
			if (item.delivery_type === 'area' && deliveryArea) {
				deliveryType = deliveryArea.id; // or whatever mapping is needed
			} else if (item.delivery_type === 'courier' && item.courier_id) {
				deliveryType = parseInt(item.courier_id); // or proper mapping
			}

			// Transform variants
			const transformedVariants = item.variants
				.map((variant) => ({
					id: parseInt(variant.id.replace('variant-', '')),
					unit: {
						id: variant.unit_id || 0,
						unit_name: variant.unit_name || '',
					},
					qty: variant.qty.toString(),
					size: variant.size_id
						? {
								id: variant.size_id,
								name: variant.size_name || '',
						  }
						: undefined,
					color: variant.color_id
						? {
								id: variant.color_id,
								name: variant.color_name || '',
						  }
						: undefined,
					variant_id: variant.variant_id || '',
					previousQty:
						cartItem?.cart_details?.find(
							(detail) =>
								detail.id.toString() === variant.id.replace('variant-', '')
						)?.qty || '0',
				}))
				.filter((variant) => variant.id); // Remove any invalid variants

			return {
				id: Date.now() + index, // Generate unique ID
				name: `${item.first_name} ${item.last_name || ''}`.trim(),
				phone: item.phone,
				email: item.email,
				area_name: deliveryArea?.area || 'N/A',
				city: item.city,
				item_type: 2, // Default item type
				item_weight: 1, // Default weight, could be calculated
				amount_to_collect: totals.totalWithDelivery, // Grand total
				delivery_type: deliveryType,
				item_quantity: itemQuantity,
				special_instruction: item.note || '',
				item_description: `Product Description: ${
					product?.name || 'N/A'
				} Order Phone: ${item.phone}`,
				address: item.address,
				variants: transformedVariants,
			};
		});

		console.log('Checkout Data:', checkoutData);

		// TODO: Replace with actual API call
		// await checkoutCart(checkoutData);

		alertConfirm({
			onOk: async () => {
				try {
					const response: any = await checkoutCart({
						cart_id: cartId,
						tenant_id: data?.data?.tenant_id,
						datas: checkoutData,
						payment_type: gateway,
					});
					console.log('Response:', response);
					if (response?.data?.payment_url) {
						window.location.href = response?.data?.payment_url;
					} else {
						toast.error(response?.data?.message || 'Something went wrong');
					}
				} catch (error: any) {
					toast.error('Something went wrong');
				}
			},
		});
	};

	return (
		<Container1
			isLoading={isLoading}
			isError={isError}
			header={
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2">
						<ShoppingCart className="size-5" />
						Cart Details
					</CardTitle>
				</div>
			}
		>
			<div className="grid grid-cols-12 gap-4 mb-5">
				{/* Left Side - Shipping Address & Variant Info */}
				<Card className="col-span-8">
					<CardHeader>
						<CardTitle>
							{editingItemId ? 'Edit Shipping Address' : 'Shipping Address'}
						</CardTitle>
						{editingItemId && (
							<p className="text-sm text-muted-foreground mt-1">
								Editing item. Fill in the form below and click Update.
							</p>
						)}
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">First name</Label>
								<Input
									id="firstName"
									placeholder="Enter Name Here"
									name="first_name"
									value={form.first_name}
									onChange={(e) =>
										setForm((prev: any) => ({
											...prev,
											first_name: e.target.value,
										}))
									}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="phone">Phone Number</Label>
								<Input
									id="phone"
									placeholder="017********"
									name="phone"
									value={form.phone}
									onChange={(e) =>
										setForm((prev: any) => ({ ...prev, phone: e.target.value }))
									}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="you@example.com"
									name="email"
									value={form.email}
									onChange={(e) =>
										setForm((prev: any) => ({ ...prev, email: e.target.value }))
									}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="city">City</Label>
								<Input
									id="city"
									placeholder="Dhaka"
									name="city"
									value={form.city}
									onChange={(e) =>
										setForm((prev: any) => ({ ...prev, city: e.target.value }))
									}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="address">Full Address</Label>
								<Textarea
									id="address"
									placeholder="1234 Main St"
									defaultValue=""
									name="address"
									value={form.address}
									onChange={(e) =>
										setForm((prev: any) => ({
											...prev,
											address: e.target.value,
										}))
									}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="note">Note</Label>
								<Textarea
									id="note"
									placeholder="special instruction"
									defaultValue=""
									name="note"
									value={form.note}
									onChange={(e) =>
										setForm((prev: any) => ({ ...prev, note: e.target.value }))
									}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="deliveryCharge">Delivery Charge</Label>
								<Select
									name="delivery_area_id"
									value={form.delivery_area_id || form.courier_id || ''}
									onValueChange={(value) => {
										setForm((prev: any) => ({
											...prev,
											delivery_area_id: value,
											courier_id: '',
										}));
									}}
								>
									<SelectTrigger className="w-full" id="deliveryCharge">
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent>
										{data?.deliveryArea?.map((area) => (
											<SelectItem key={area.id} value={area.id.toString()}>
												{area.area} - {area.charge} tk
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						{/* Variant Information */}
						<div className="space-y-4">
							{cartItem?.cart_details?.map((detail) => (
								<div
									key={detail.id}
									className="mt-6 space-y-4 border-t p-4  border rounded-lg"
								>
									<h3 className="font-semibold text-lg">Variant {detail.id}</h3>
									<div className="grid grid-cols-4 gap-4">
										<div className="space-y-2">
											<Label>Unit</Label>
											<Input readOnly value={detail.unit?.name ?? ''} />
										</div>
										<div className="space-y-2">
											<Label>Color</Label>
											<Input readOnly value={detail.color?.name ?? ''} />
										</div>
										<div className="space-y-2">
											<Label>Size</Label>
											<Input readOnly value={detail.size?.name ?? ''} />
										</div>
										<div className="space-y-2">
											<Label>Quantity</Label>
											{(() => {
												const remainingQty = getRemainingQuantity(
													detail.id.toString(),
													parseFloat(detail.qty?.toString() || '0') ||
														parseFloat(
															cartItem?.product_qty?.toString() || '0'
														) ||
														quantity
												);

												if (remainingQty === 0) {
													return (
														<div className="text-center">
															<p className="text-sm text-red-500 font-medium">
																Sold Out
															</p>
															<p className="text-xs text-muted-foreground">
																All stock allocated
															</p>
														</div>
													);
												}

												return (
													<>
														<div className="flex items-center space-x-2">
															<Button
																type="button"
																variant="outline"
																size="sm"
																onClick={() => {
																	const currentQty =
																		variantQuantities[detail.id.toString()] ||
																		1;
																	if (currentQty > 1) {
																		setVariantQuantities((prev) => ({
																			...prev,
																			[detail.id.toString()]: currentQty - 1,
																		}));
																	}
																}}
																disabled={
																	(variantQuantities[detail.id.toString()] ||
																		1) <= 1
																}
															>
																<Minus className="h-4 w-4" />
															</Button>
															<Input
																type="number"
																min="1"
																max={remainingQty}
																value={
																	variantQuantities[detail.id.toString()] || 1
																}
																onChange={(e) => {
																	const value = parseInt(e.target.value) || 1;
																	const clampedValue = Math.max(
																		1,
																		Math.min(value, remainingQty)
																	);
																	setVariantQuantities((prev) => ({
																		...prev,
																		[detail.id.toString()]: clampedValue,
																	}));
																}}
																className="w-20 text-center"
															/>
															<Button
																type="button"
																variant="outline"
																size="sm"
																onClick={() => {
																	const currentQty =
																		variantQuantities[detail.id.toString()] ||
																		1;
																	if (currentQty < remainingQty) {
																		setVariantQuantities((prev) => ({
																			...prev,
																			[detail.id.toString()]: currentQty + 1,
																		}));
																	}
																}}
																disabled={
																	(variantQuantities[detail.id.toString()] ||
																		1) >= remainingQty
																}
															>
																<Plus className="h-4 w-4" />
															</Button>
														</div>
														<p className="text-xs text-muted-foreground">
															Remaining: {remainingQty} (Max:{' '}
															{parseFloat(detail.qty?.toString() || '0') ||
																parseFloat(
																	cartItem?.product_qty?.toString() || '0'
																) ||
																quantity}
															)
														</p>
													</>
												);
											})()}
										</div>
									</div>
								</div>
							))}
							<div className="flex justify-end gap-2">
								{editingItemId ? (
									<>
										<Button variant="outline" onClick={handleCancelEdit}>
											<X className="w-4 h-4 mr-2" />
											Cancel
										</Button>
										<Button onClick={handleUpdateItem}>
											<Check className="w-4 h-4 mr-2" />
											Update
										</Button>
									</>
								) : (
									<Button onClick={handleCreateItem}>
										<Plus className="w-4 h-4 mr-2" />
										Create Item
									</Button>
								)}
							</div>

							{/* Display Created Items */}
							<div className="grid grid-cols-2 gap-4 mt-6">
								{items.map((item, index) => (
									<Card key={item.id}>
										<CardHeader>
											<div className="flex items-center justify-between">
												<CardTitle>Item {index + 1}</CardTitle>
												{editingItemId !== item.id && (
													<div className="flex gap-2">
														<Button
															variant="outline"
															size="sm"
															onClick={() => handleEditItem(item.id)}
														>
															<Edit2 className="w-4 h-4" />
														</Button>
														<Button
															variant="destructive"
															size="sm"
															onClick={() => handleDeleteItem(item.id)}
														>
															<Trash2 className="w-4 h-4" />
														</Button>
													</div>
												)}
											</div>
										</CardHeader>
										<CardContent>
											<div className="space-y-2 text-sm mb-4">
												<p>
													<strong>{item.first_name}</strong>
													{item.last_name && ` ${item.last_name}`}
												</p>
												<p>Phone: {item.phone}</p>
												<p>Email: {item.email}</p>
												<p>City: {item.city}</p>
												<p>Address: {item.address}</p>
												{item.note && <p>Special Instruction: {item.note}</p>}
												{item.delivery_type === 'area' &&
													item.delivery_area_id && (
														<p>
															Delivery Charge:{' '}
															{
																data?.deliveryArea?.find(
																	(a) =>
																		a.id.toString() === item.delivery_area_id
																)?.area
															}{' '}
															({getDeliveryCharge(item).toFixed(2)} tk)
														</p>
													)}
												{item.delivery_type === 'courier' &&
													item.courier_id && (
														<p>
															Courier:{' '}
															{
																data?.data?.courier?.find(
																	(c) => c.id.toString() === item.courier_id
																)?.name
															}{' '}
															({getDeliveryCharge(item).toFixed(2)} tk)
														</p>
													)}
												<p>
													Total Quantity:{' '}
													{item.variants.reduce((sum, v) => sum + v.qty, 0)}
												</p>
											</div>
											<div>
												<Table>
													<TableHeader>
														<TableRow>
															<TableHead>Sr.</TableHead>
															<TableHead>Unit</TableHead>
															<TableHead>Color</TableHead>
															<TableHead>Size</TableHead>
															<TableHead>Qty</TableHead>
															<TableHead>Price</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														{item.variants.map((variant, vIndex) => (
															<TableRow key={variant.id}>
																<TableCell>{vIndex + 1}</TableCell>
																<TableCell>
																	{variant.unit_name || '-'}
																</TableCell>
																<TableCell>
																	{variant.color_name || '-'}
																</TableCell>
																<TableCell>
																	{variant.size_name || '-'}
																</TableCell>
																<TableCell>{variant.qty}</TableCell>
																<TableCell>
																	{(variant.price * variant.qty).toFixed(2)} tk
																</TableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Right Side - Product Details */}
				<Card className="col-span-4 gap-2">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="xl:text-xl">Product Details</CardTitle>
							<Badge variant="outline">{cartItem?.purchase_type}</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							{items.map((item, index) => (
								<div
									key={item.id}
									className="space-y-1 not-last:border-b pb-2 text-xs"
								>
									<div className="flex justify-between items-center">
										<p className="text-xs">Variant {index + 1}</p>
										<p>
											{item.variants.reduce(
												(sum, v) => sum + v.price * v.qty,
												0
											)}{' '}
											tk
										</p>
									</div>
									<div className="flex justify-between items-center">
										<p>Quantity</p>
										<p>{item.variants.reduce((sum, v) => sum + v.qty, 0)}</p>
									</div>
									<div className="flex justify-between items-center">
										<p>Delivery Charge :</p>
										<p>{getDeliveryCharge(item).toFixed(2)} tk</p>
									</div>
								</div>
							))}
						</div>

						<div className="space-y-3 border-t pt-4 text-xs ">
							<div className="flex justify-between items-center">
								<span className="font-medium">
									SUMMARY ({items.length} item{items.length !== 1 ? 's' : ''})
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Base Price:</span>
								<span className="font-medium">{price.toFixed(2)} tk</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">
									Discount (
									{parseFloat(product?.discount_rate || '0').toFixed(1)}%):
								</span>
								<span className="font-medium">-{discount.toFixed(2)} tk</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Unit Price:</span>
								<span className="font-medium">
									{discountedPrice.toFixed(2)} tk
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Total Quantity:</span>
								<span className="font-medium">{totals.totalQuantity}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Product Subtotal:</span>
								<span className="font-medium">
									{totals.totalProductPrice.toFixed(2)} tk
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Delivery Charges:</span>
								<span className="font-medium">
									{totals.totalDeliveryCharge.toFixed(2)} tk
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Total Commission:</span>
								<span className="font-medium">
									{totals.totalCommission.toFixed(2)} tk
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Advance Amount:</span>
								<span className="font-medium">
									{totals.totalAdvancePayment.toFixed(2)} tk
								</span>
							</div>
							<div className="flex justify-between items-center border-t pt-2">
								<span className="font-semibold">Grand Total:</span>
								<span className="font-semibold">
									{totals.totalWithDelivery.toFixed(2)} tk
								</span>
							</div>
						</div>
						<div>
							<fieldset className="flex flex-col gap-3">
								<legend className="text-sm font-medium">Payment Method</legend>
								<p className="text-muted-foreground text-sm">
									Select your preferred payment method.
								</p>
								<RadioGroup
									defaultValue={gateway}
									className="grid grid-cols-1 md:grid-cols-2 gap-3"
									onValueChange={(val) => setGateway(val as 'aamarpay')}
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
												<div className="font-medium">{plan.name}</div>
												<div className="text-muted-foreground pr-2 text-xs leading-snug text-balance">
													{plan.description}
												</div>
											</div>
										</Label>
									))}
								</RadioGroup>
							</fieldset>
						</div>
						<div className="flex flex-col">
							<Button onClick={handleCheckout}>Checkout</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</Container1>
	);
}
