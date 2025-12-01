'use client';

import { Container1 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
	useCartViewQuery,
	useUpdateCartMutation,
} from '@/store/features/dropshipper/cart';
import { Check, Edit2, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
	}>;
}

export default function CartViewPageClient({
	cartId,
}: CartViewPageClientProps) {
	const { data, isLoading, isError, isFetching } = useCartViewQuery(
		{ cartId },
		{ skip: !cartId }
	);
	const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
	const cartItem = data?.data;
	const product = cartItem?.product;

	const [items, setItems] = useState<CartItem[]>([]);
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

	// Initialize form with existing cart data
	// useEffect(() => {
	// 	if (cartItem && items.length === 0) {
	// 		// Initialize with existing cart data as first item
	// 		const initialItem: CartItem = {
	// 			id: `item-${Date.now()}`,
	// 			first_name: '',
	// 			last_name: '',
	// 			phone: '',
	// 			email: '',
	// 			city: '',
	// 			address: '',
	// 			note: '',
	// 			variants:
	// 				cartItem.cart_details?.map((detail) => ({
	// 					id: `variant-${detail.id}`,
	// 					unit_id: detail.unit_id,
	// 					color_id: detail.color?.id,
	// 					size_id: detail.size?.id,
	// 					qty: parseFloat(detail.qty || '0'),
	// 					unit_name: detail.unit?.name,
	// 					color_name: detail.color?.name,
	// 					size_name: detail.size?.name,
	// 					variant_id: detail.variant_id,
	// 				})) || [],
	// 		};
	// 		setItems([initialItem]);
	// 	}
	// }, [cartItem, items.length]);

	// Helper functions
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
					qty: parseFloat(detail.qty || '0'),
					unit_name: detail.unit?.name,
					color_name: detail.color?.name,
					size_name: detail.size?.name,
					variant_id: detail.variant_id,
				})) || [],
		};

		setItems([...items, newItem]);
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

		setItems(
			items.map((item) =>
				item.id === editingItemId
					? {
							...item,
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
					  }
					: item
			)
		);

		setEditingItemId(null);
		resetForm();
		toast.success('Item updated successfully');
	};

	const handleCancelEdit = () => {
		setEditingItemId(null);
		resetForm();
	};

	const handleDeleteItem = (itemId: string) => {
		if (items.length === 1) {
			toast.error('At least one item is required');
			return;
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

	// Calculate totals
	const price = parseFloat(product?.selling_price || '0');
	const quantity = cartItem?.product_qty || 0;
	const discountRate = parseFloat(product?.discount_rate || '0');
	const discount = (price * discountRate) / 100;
	const discountedPrice = price - discount;
	const commission = cartItem?.total_affiliate_commission || 0;
	const advancePayment = cartItem?.advancepayment || 0;
	const totalProductPrice = discountedPrice * quantity;
	const deliveryCharge = 0; // This would come from deliveryArea selection
	const totalWithDelivery = totalProductPrice + deliveryCharge;

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
			<div className="grid grid-cols-12 gap-4">
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
											<Input
												value={detail.qty || cartItem?.product_qty || quantity}
											/>
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
																	{(discountedPrice * variant.qty).toFixed(2)}{' '}
																	tk
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
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Product Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>Purchase Type</Label>
							<Input value={cartItem?.purchase_type ?? 'single'} />
						</div>

						<div className="space-y-3 border-t pt-4">
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium">DISCOUNT</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-muted-foreground">Price:</span>
								<span className="text-sm font-medium">
									{price.toFixed(2)} tk
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-muted-foreground">
									Commission:
								</span>
								<span className="text-sm font-medium">
									{commission.toFixed(2)} tk
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-muted-foreground">
									Advance Payment:
								</span>
								<span className="text-sm font-medium">
									{advancePayment.toFixed(2)} tk
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-muted-foreground">
									Total Commission
								</span>
								<span className="text-sm font-medium">
									{cartItem?.total_affiliate_commission?.toFixed(2) || '0.00'}{' '}
									tk
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-muted-foreground">
									Advance Amount (TK)
								</span>
								<span className="text-sm font-medium">
									{cartItem?.totaladvancepayment?.toFixed(2) || '0.00'} tk
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-muted-foreground">
									Total Product Price (TK)
								</span>
								<span className="text-sm font-medium">
									{cartItem?.totalproductprice?.toFixed(2) || '0.00'} tk
								</span>
							</div>
							<div className="flex justify-between items-center border-t pt-2">
								<span className="text-sm font-semibold">
									Product Price & Delivery Charge (TK)
								</span>
								<span className="text-sm font-semibold">
									{totalWithDelivery.toFixed(2)} tk
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</Container1>
	);
}
