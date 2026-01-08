'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAddToCartMutation, useGetCartQuery } from './api-slice';

interface AddToCartButtonProps {
	productId: number;
	qty?: number;
	color?: string | null;
	size?: string | null;
	variantId?: number | null;
	unit?: string | null;
	purchaseType?: 'single' | 'bulk';
	variant?: 'icon' | 'button' | 'full';
	className?: string;
	disabled?: boolean;
}

export function AddToCartButton({
	productId,
	qty = 1,
	color = null,
	size = null,
	variantId = null,
	unit = null,
	purchaseType = 'single',
	variant = 'button',
	className,
	disabled = false,
}: AddToCartButtonProps) {
	const { status, data: session } = useSession();
	const router = useRouter();
	const isAuthenticated = status === 'authenticated';

	const { data: cartData } = useGetCartQuery(undefined, {
		skip: !isAuthenticated,
	});

	const [addToCart, { isLoading }] = useAddToCartMutation();

	// Check if product is already in cart
	const isInCart = cartData?.cart?.some(
		(item) => item.product_id === productId
	);

	const handleClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!isAuthenticated) {
			toast.info('Please login to add items to your cart');
			router.push('/auth?tab=login');
			return;
		}

		if (isInCart) {
			toast.info('Product already in cart');
			router.push('/shop/cart');
			return;
		}

		try {
			const result = await addToCart({
				product_id: productId,
				purchase_type: 'single',
				tenant_id: session?.tenant_id,
				color_id: [color || null],
				size_id: [size || null],
				unit_id: [unit || null],
				qty: [qty],
				cartItems: [
					{
						qty,
						color,
						size,
						variant_id: variantId,
						unit,
					},
				],
			}).unwrap();

			if (result.status === 201) {
				toast.success(result.message || 'Added to cart');
			} else if (result.status === 409) {
				toast.info(result.message || 'Product already in cart');
			} else {
				toast.error(result.message || 'Failed to add to cart');
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Something went wrong');
		}
	};

	if (variant === 'icon') {
		return (
			<button
				onClick={handleClick}
				disabled={isLoading || disabled}
				className={cn(
					'w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 disabled:opacity-50',
					isInCart && 'bg-black text-white',
					className
				)}
			>
				{isLoading ? (
					<Loader2 className="w-5 h-5 animate-spin" />
				) : (
					<ShoppingCart className="w-5 h-5" />
				)}
			</button>
		);
	}

	if (variant === 'full') {
		return (
			<Button
				onClick={handleClick}
				disabled={isLoading || disabled}
				className={cn(
					'w-full gap-2 bg-black text-white hover:bg-black/90',
					className
				)}
			>
				{isLoading ? (
					<Loader2 className="w-4 h-4 animate-spin" />
				) : (
					<ShoppingCart className="w-4 h-4" />
				)}
				{isInCart ? 'View Cart' : 'Add To Cart'}
			</Button>
		);
	}

	return (
		<Button
			onClick={handleClick}
			disabled={isLoading || disabled}
			className={cn('gap-2 bg-black text-white hover:bg-black/90', className)}
		>
			{isLoading ? (
				<Loader2 className="w-4 h-4 animate-spin" />
			) : (
				<ShoppingCart className="w-4 h-4" />
			)}
			{isInCart ? 'In Cart' : 'Add To Cart'}
		</Button>
	);
}
