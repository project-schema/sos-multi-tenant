'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { imageFormat } from '@/lib';
import { AddToCartButton } from '@/store/features/frontend/cart';
import {
	useDeleteFromWishlistMutation,
	useGetWishlistQuery,
} from '@/store/features/frontend/wish-list';
import { Heart, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CommonWishList() {
	const { data, isLoading, isError } = useGetWishlistQuery();
	const [deleteFromWishlist, { isLoading: isDeleting }] =
		useDeleteFromWishlistMutation();

	const handleRemoveItem = async (id: number) => {
		try {
			const result = await deleteFromWishlist({ id }).unwrap();
			if (result.success) {
				toast.success(result.message || 'Item removed from wishlist');
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Failed to remove item');
		}
	};

	// Loading state
	if (isLoading) {
		return (
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-3xl font-bold mb-6">Wishlist</h1>
				<div className="rounded-md overflow-hidden border">
					<div className="hidden md:grid grid-cols-12 bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-3 border-b">
						<div className="col-span-7">Product</div>
						<div className="col-span-3">Price</div>
						<div className="col-span-2 text-right">Actions</div>
					</div>
					<div className="divide-y">
						{[1, 2, 3].map((i) => (
							<div key={i} className="grid grid-cols-12 items-center gap-4 p-4">
								<div className="col-span-12 md:col-span-7 flex items-center gap-4">
									<Skeleton className="w-5 h-5 rounded" />
									<Skeleton className="w-20 h-20 rounded" />
									<Skeleton className="h-4 w-48" />
								</div>
								<div className="col-span-6 md:col-span-3">
									<Skeleton className="h-3 w-16 mb-1" />
									<Skeleton className="h-5 w-20" />
								</div>
								<div className="col-span-6 md:col-span-2 flex md:justify-end">
									<Skeleton className="h-10 w-32" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	// Error state
	if (isError) {
		return (
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-3xl font-bold mb-6">Wishlist</h1>
				<div className="rounded-md border p-8 text-center">
					<p className="text-red-500 mb-4">
						Failed to load wishlist. Please try again.
					</p>
					<Button onClick={() => window.location.reload()}>Retry</Button>
				</div>
			</section>
		);
	}

	const items = data?.wishlist || [];

	// Empty state
	if (items.length === 0) {
		return (
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-3xl font-bold mb-6">Wishlist</h1>
				<div className="rounded-md border p-12 text-center">
					<Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
					<h2 className="text-xl font-semibold text-gray-700 mb-2">
						Your wishlist is empty
					</h2>
					<p className="text-gray-500 mb-6">
						Start adding items you love to your wishlist
					</p>
					<Link href="/shop">
						<Button className="bg-black text-white">Browse Products</Button>
					</Link>
				</div>
			</section>
		);
	}

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
			<h1 className="text-3xl font-bold mb-6">
				Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})
			</h1>

			<div className="rounded-md overflow-hidden border">
				{/* Header row (md+) */}
				<div className="hidden md:grid grid-cols-12 bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-3 border-b">
					<div className="col-span-7">Product</div>
					<div className="col-span-3">Price</div>
					<div className="col-span-2 text-right">Actions</div>
				</div>

				{/* Rows */}
				<div className="divide-y">
					{items.map((item) => {
						const product = (item as any)?.product;
						const hasDiscount =
							product?.discount_price &&
							Number(product?.discount_price) < Number(product?.selling_price);

						return (
							<div
								key={item.id}
								className="grid grid-cols-12 items-center gap-4 p-4"
							>
								{/* Product */}
								<div className="col-span-12 md:col-span-7 flex items-center gap-4">
									<DeleteWishlistButton id={item.id} />
									<Link
										href={`/shop/${product.slug}`}
										className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0"
									>
										<img
											src={imageFormat(product?.image)}
											alt={product.name}
											className="object-cover"
										/>
									</Link>
									<Link
										href={`/shop/${product.slug}`}
										className="text-sm font-medium hover:text-orange-500 transition-colors"
									>
										{product.name}
									</Link>
								</div>

								{/* Price */}
								<div className="col-span-6 md:col-span-3">
									{hasDiscount && (
										<div className="text-xs text-gray-400 line-through">
											{Number(product.selling_price).toLocaleString()}৳
										</div>
									)}
									<div className="text-base font-semibold">
										{hasDiscount
											? Number(product.discount_price).toLocaleString()
											: Number(product.selling_price).toLocaleString()}
										৳
									</div>
								</div>

								{/* Actions */}
								<div className="col-span-6 md:col-span-2 flex md:justify-end">
									{product.qty > 0 ? (
										<AddToCartButton
											productId={product.id}
											variant="button"
											className="w-full md:w-auto"
											wishId={item.id}
										/>
									) : (
										<Button variant="secondary" disabled>
											Out of Stock
										</Button>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

const DeleteWishlistButton = ({ id }: { id: number }) => {
	const [deleteFromWishlist, { isLoading: isDeleting }] =
		useDeleteFromWishlistMutation();

	const handleRemoveItem = async (id: number) => {
		try {
			const result = await deleteFromWishlist({ id }).unwrap();
			if (result.success) {
				toast.success(result.message || 'Item removed from wishlist');
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Failed to remove item');
		}
	};

	return (
		<button
			onClick={() => handleRemoveItem(id)}
			disabled={isDeleting}
			className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
		>
			{isDeleting ? (
				<Loader2 className="w-5 h-5 animate-spin" />
			) : (
				<X className="w-5 h-5" />
			)}
		</button>
	);
};
