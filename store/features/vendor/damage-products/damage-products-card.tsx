'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, env, sign, tableSrCount } from '@/lib';
import { useAudio } from '@/lib/audio';
import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useVendorPosSalesProductDetailsQuery } from '../pos-sales';
import { iVendorPosSalesResponse } from '../pos-sales/vendor-pos-sales.type';
import { usePosSalesDamage } from './damage-products-hook';

export const VendorDamageProductsCard = ({
	product,
}: {
	product: iVendorPosSalesResponse['products'][0];
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const { cart, addToCart, removeFromCart } = usePosSalesDamage();

	// pos select product
	const posSelectProduct = cart.find((item) => item.product_id === product.id);

	const handleCardClick = () => {
		setIsOpen(true);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Card
					className={cn(
						posSelectProduct && 'border-blue-400',
						`overflow-hidden hover:shadow-md transition-shadow cursor-pointer group border-2 hover:border-blue-400 py-0 gap-0`
					)}
					onClick={handleCardClick}
				>
					<div className="relative aspect-square overflow-hidden bg-gray-50">
						<Avatar className="h-full w-full rounded-none">
							<AvatarImage
								src={env.baseAPI + '/' + product.image}
								alt={product.name}
								className="object-cover"
							/>
							<AvatarFallback className="rounded-none bg-sky-100 text-lg">
								{product.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</div>
					<CardContent className={`lg:px-2 py-2 space-y-2`}>
						<h3 className="font-medium text-sm line-clamp-2 leading-tight">
							{product.name}
						</h3>
						<div className="space-y-1">
							<Badge
								variant="secondary"
								className="text-xs w-full justify-center"
							>
								{product.selling_price} {sign.tk}
							</Badge>
						</div>
					</CardContent>
				</Card>
			</PopoverTrigger>
			{isOpen && (
				<PopoverContent sideOffset={-200} className="min-w-80 w-auto p-4">
					<CardDetails slug={product.slug} setIsOpen={setIsOpen} />
				</PopoverContent>
			)}
		</Popover>
	);
};

const CardDetails = ({
	slug,
	setIsOpen,
}: {
	slug: string;
	setIsOpen: (isOpen: boolean) => void;
}) => {
	const { playAdd, playRemove } = useAudio();

	const { data, isLoading, isError } = useVendorPosSalesProductDetailsQuery(
		{ product_id: slug },
		{ skip: !slug }
	);
	const { cart, addToCart, removeFromCart } = usePosSalesDamage();

	if (isLoading) {
		return (
			<div className="space-y-4">
				<div className="flex items-center space-x-3">
					<Skeleton className="h-12 w-12 rounded-md" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-3 w-24" />
					</div>
				</div>
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-4/6" />
				</div>
				<div className="space-y-2">
					<Skeleton className="h-6 w-20" />
					<Skeleton className="h-4 w-16" />
				</div>
			</div>
		);
	}

	if (isError || !data?.product) {
		return (
			<div className="text-center text-red-500">
				<p>Failed to load product details</p>
			</div>
		);
	}

	const product = data.product;

	// selected item in cart
	const selectedItem = cart.find((item) => item.product_id === product.id);

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="font-medium text-sm text-center">{product.name}</h3>
				<Button
					variant="link"
					size="icon"
					className="w-8 h-8"
					onClick={() => setIsOpen(false)}
				>
					<X className="text-destructive" />
				</Button>
			</div>
			{/* Product Variants */}
			<table className="w-full whitespace-nowrap">
				<thead>
					<tr>
						<th className="text-xs ">Sr.</th>
						<th className="text-sm px-3 py-2">Unit</th>
						<th className="text-sm px-3 py-2">Color</th>
						<th className="text-sm px-3 py-2">Variation</th>
						<th className="text-sm px-3 py-2">Stock</th>
						<th className="text-xs"></th>
					</tr>
				</thead>
				<tbody>
					{product.product_variant.map((variant, i) => {
						const isSelected = selectedItem?.variant_id === variant.id;
						const isOutOfStock = variant?.qty === 0;
						return (
							<tr
								className={cn(
									isSelected && 'bg-blue-50 rounded-2xl user-select-none',
									'cursor-pointer'
								)}
								onClick={() => {
									if (isOutOfStock) {
										toast.error('Out of Stock');
										return;
									}
									playAdd(); // Add audio feedback
									addToCart({
										id: variant.id,
										product_id: variant.product_id,
										variant_id: variant.id,
										name: variant.product.name,
										sku: variant.product.sku,
										image: '',
										selling_price: parseFloat(variant.product.selling_price),
										quantity: 1,
										stock: variant.qty,
										subtotal: parseFloat(variant.product.selling_price),
										color: variant.color?.name,
										size: variant.size?.name,
										unit: variant.unit?.unit_name,
										unit_id: variant.unit?.id,
										color_id: variant.color?.id,
										size_id: variant.size?.id,
										remark: '',
										discount_price: 0,
										discount_percentage: 0,
									});
								}}
								key={variant.id}
							>
								<td className="text-xs ">{tableSrCount(1, i)}</td>
								<td className="text-sm px-3 py-2">{variant?.size?.name}</td>
								<td className="text-sm px-3 py-2">{variant?.color?.name}</td>
								<td className="text-sm px-3 py-2">{variant?.size?.name}</td>
								<td className="text-sm px-3 py-2">
									{isOutOfStock ? 'Out of Stock' : variant?.qty}
								</td>
								<td className="text-xs ">
									<Button
										variant="link"
										size="icon"
										className="w-8 h-8"
										type="button"
										onClick={(e) => {
											if (isOutOfStock) {
												toast.error('Out of Stock');
												return;
											}
											e.stopPropagation();
											playAdd(); // Add audio feedback
											addToCart({
												id: variant.id,
												product_id: variant.product_id,
												variant_id: variant.id,
												name: variant.product.name,
												sku: variant.product.sku,
												image: '',
												selling_price: parseFloat(
													variant.product.selling_price
												),
												quantity: 1,
												stock: variant.qty,
												subtotal: parseFloat(variant.product.selling_price),
												color: variant.color?.name,
												size: variant.size?.name,
												unit: variant.unit?.unit_name,
												unit_id: variant.unit?.id,
												color_id: variant.color?.id,
												size_id: variant.size?.id,
												remark: '',
												discount_price: 0,
												discount_percentage: 0,
											});
										}}
									>
										<Plus />
									</Button>

									{isSelected && (
										<Button
											variant="link"
											size="icon"
											className="w-8 h-8"
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												playRemove(); // Add audio feedback
												removeFromCart({
													id: variant.id,
													variant_id: variant.id,
												});
											}}
										>
											<Trash2 className="text-destructive" />
										</Button>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
