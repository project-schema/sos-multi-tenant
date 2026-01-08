'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
	useAddToWishlistMutation,
	useDeleteFromWishlistMutation,
	useGetWishlistQuery,
} from './api-slice';

interface WishlistButtonProps {
	productId: number;
	variant?: 'icon' | 'button';
	className?: string;
}

export function WishlistButton({
	productId,
	variant = 'icon',
	className,
}: WishlistButtonProps) {
	const { status } = useSession();
	const router = useRouter();
	const isAuthenticated = status === 'authenticated';

	const { data: wishlistData } = useGetWishlistQuery(undefined, {
		skip: !isAuthenticated,
	});

	const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();
	const [deleteFromWishlist, { isLoading: isDeleting }] =
		useDeleteFromWishlistMutation();

	const isLoading = isAdding || isDeleting;

	// Check if product is already in wishlist
	const wishlistItem = wishlistData?.wishlist?.find(
		(item) => item.product_id === productId
	);
	const isInWishlist = !!wishlistItem;

	const handleClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!isAuthenticated) {
			toast.info('Please login to add items to your wishlist');
			router.push('/auth?tab=login');
			return;
		}

		try {
			if (isInWishlist && wishlistItem) {
				const result = await deleteFromWishlist({
					id: wishlistItem.id,
				}).unwrap();
				if (result.success) {
					toast.success('Removed from wishlist');
				}
			} else {
				const result = await addToWishlist({ product_id: productId }).unwrap();
				if (result.success) {
					toast.success('Added to wishlist');
				}
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Something went wrong');
		}
	};

	if (variant === 'icon') {
		return (
			<button
				onClick={handleClick}
				disabled={isLoading}
				className={cn(
					'w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 disabled:opacity-50',
					isInWishlist && 'text-red-500',
					className
				)}
			>
				{isLoading ? (
					<Loader2 className="w-5 h-5 animate-spin" />
				) : (
					<Heart className={cn('w-5 h-5', isInWishlist && 'fill-current')} />
				)}
			</button>
		);
	}

	return (
		<Button
			onClick={handleClick}
			disabled={isLoading}
			variant={isInWishlist ? 'destructive' : 'outline'}
			className={cn('gap-2', className)}
		>
			{isLoading ? (
				<Loader2 className="w-4 h-4 animate-spin" />
			) : (
				<Heart className={cn('w-4 h-4', isInWishlist && 'fill-current')} />
			)}
			{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
		</Button>
	);
}
