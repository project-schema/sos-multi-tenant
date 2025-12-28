'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { alertConfirm, sign } from '@/lib';
import { iCompleteMerchantProduct } from '@/store/features/admin/merchant-product';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAddToCartMutation } from './dropshipper-product-api-slice';

interface SelectedVariant {
	id: number;
	qty: number;
	size: number | null;
	color: number | null;
	unit: number | null;
	variant_id: number;
}

export const DropshipperProductAddToCart = ({
	product,
}: {
	product: iCompleteMerchantProduct;
}) => {
	const [productType, setProductType] = useState<'single' | 'bulk'>('single');
	const [quantities, setQuantities] = useState<Map<number, number>>(new Map());
	const [addToCart, { isLoading }] = useAddToCartMutation();
	const router = useRouter();
	const handleQtyChange = (variantId: number, value: string) => {
		const qty = parseInt(value) || 0;
		const newQuantities = new Map(quantities);

		if (qty > 0) {
			newQuantities.set(variantId, qty);
		} else {
			newQuantities.delete(variantId);
		}

		setQuantities(newQuantities);
	};

	const handleAddToCart = async () => {
		if (quantities.size === 0) {
			alert('Please add quantity for at least one variant');
			return;
		}

		alertConfirm({
			onOk: async () => {
				const cartItems: SelectedVariant[] = [];

				quantities.forEach((qty, variantId) => {
					const variant = product?.product_variant?.find(
						(v) => v.id === variantId
					);
					if (variant) {
						cartItems.push({
							id: variantId,
							qty: qty,
							size: variant.size?.id || null,
							color: variant.color?.id || null,
							unit: variant.unit?.id || null,
							variant_id: variantId,
						});
					}
				});

				const cartData = {
					product_id: product.id,
					vendor_id: product.vendor_id,
					product_price: product.selling_price,
					discount_type: product.discount_type || 'flat',
					discount_rate: product.discount_rate || '0',
					category_id: product.category_id,
					purchase_type: productType,
					color_id: cartItems.map((item) => item.color || null),
					size_id: cartItems.map((item) => item.size || null),
					unit_id: cartItems.map((item) => item.unit || null),
					qty: cartItems.map((item) => item.qty || null),
					cartItems: cartItems,
					tenant_id: product.tenant_id,
				};

				console.log('Cart Data:', cartData);
				// TODO: Here you would typically call your API or update your cart state
				// For example: addToCart(cartData) or dispatch(addToCartAction(cartData))

				const response = await addToCart(cartData).unwrap();
				if (response.status === 201) {
					router.push(`/dashboard/cart`);
					toast.success(
						response?.message || 'Product added to cart successfully'
					);
				} else {
					toast.error(response?.message || 'Failed to add product to cart');
				}
			},
		});
	};

	useEffect(() => {
		if (product.selling_type) {
			if (product.selling_type === 'single') {
				setProductType('single');
			} else if (product.selling_type === 'bulk') {
				setProductType('bulk');
			} else if (product.selling_type === 'both') {
				setProductType('single');
			}
		}
	}, [product.selling_type]);

	return (
		<>
			{product?.selling_details && product?.selling_details?.length > 0 && (
				<div className="mt-4 border rounded-lg p-1">
					<p>Bulk Product Details</p>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Bulk Qty </TableHead>
								<TableHead>Bulk Price </TableHead>
								<TableHead>Commission </TableHead>
								<TableHead>Advance Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{product?.selling_details?.map((variant, index) => (
								<TableRow key={index}>
									<TableCell>{variant?.min_bulk_qty}</TableCell>
									<TableCell>
										{variant?.min_bulk_price} {sign.tk}
									</TableCell>
									<TableCell>
										{variant?.bulk_commission} {sign.tk}
									</TableCell>
									<TableCell>
										{variant?.advance_payment} {sign.tk}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
			{product?.product_variant && product?.product_variant?.length > 0 && (
				<div className="mt-4 border rounded-lg p-1">
					<p className="capitalize">{product.selling_type} Product Details</p>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Unit</TableHead>
								<TableHead>Size</TableHead>
								<TableHead>Color</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Stock</TableHead>
								<TableHead>Quantity</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{product?.product_variant?.map((variant) => {
								const qty = quantities.get(variant.id) || '';

								return (
									<TableRow key={variant.id}>
										<TableCell>{variant?.unit?.unit_name}</TableCell>
										<TableCell>{variant?.size?.name}</TableCell>
										<TableCell>{variant?.color?.name}</TableCell>
										<TableCell>{product.discount_price} BDT</TableCell>
										<TableCell>{variant?.qty}</TableCell>
										<TableCell>
											<Input
												type="number"
												className="w-24"
												min="0"
												placeholder="0"
												value={qty}
												onChange={(e) =>
													handleQtyChange(variant.id, e.target.value)
												}
											/>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			)}
			<div>
				<div className="grid grid-cols-2 gap-2 max-w-sm mb-4">
					{(product.selling_type === 'single' ||
						product.selling_type === 'both') && (
						<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
							<Checkbox
								checked={productType === 'single'}
								onCheckedChange={(checked) =>
									setProductType(checked ? 'single' : 'bulk')
								}
								className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
							/>
							<div className="grid gap-1.5 font-normal">
								<p className="text-sm leading-none font-medium">Single</p>
								<p className="text-muted-foreground text-sm">
									Advance Payment: <strong>{product?.advance_payment} </strong>
									{product?.single_advance_payment_type === 'flat'
										? ' BDT'
										: '%'}
								</p>
							</div>
						</Label>
					)}
					{(product.selling_type === 'bulk' ||
						product.selling_type === 'both') && (
						<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
							<Checkbox
								checked={productType === 'bulk'}
								onCheckedChange={(checked) =>
									setProductType(checked ? 'bulk' : 'single')
								}
								className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
							/>
							<div className="grid gap-1.5 font-normal">
								<p className="text-sm leading-none font-medium">Bulk</p>
								<p className="text-muted-foreground text-sm">
									Mark this product as bulk.
								</p>
							</div>
						</Label>
					)}
				</div>
				<Button onClick={handleAddToCart} disabled={quantities.size === 0}>
					<ShoppingCart className="size-4" />
					Add to Cart ({quantities.size})
				</Button>
			</div>
		</>
	);
};
