'use client';

import { useGetCartQuery } from '@/store/features/frontend/cart';
import { useGetWishlistQuery } from '@/store/features/frontend/wish-list';
import { Heart, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface UtilityIconsProps {
	variant?: 'desktop' | 'mobile';
}

export function UtilityIcons({ variant = 'desktop' }: UtilityIconsProps) {
	const { status } = useSession();
	const isAuthenticated = status === 'authenticated';

	// Only fetch data if authenticated
	const { data: wishlistData } = useGetWishlistQuery(undefined, {
		skip: !isAuthenticated,
	});

	const { data: cartData } = useGetCartQuery(undefined, {
		skip: !isAuthenticated,
	});

	const wishlistCount = wishlistData?.wishlist?.length || 0;
	const cartCount = cartData?.cart?.length || 0;

	return (
		<div
			className={`flex items-center ${
				variant === 'mobile' ? '' : 'hidden md:flex'
			}`}
		>
			<Link
				href="/shop/wish-list"
				className="relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors"
			>
				<Heart className="w-5 h-5" />
				{wishlistCount > 0 && (
					<span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
						{wishlistCount > 99 ? '99+' : wishlistCount}
					</span>
				)}
			</Link>
			<Link
				href="/shop/cart"
				className="relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors"
			>
				<ShoppingCart className="w-5 h-5" />
				{cartCount > 0 && (
					<span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
						{cartCount > 99 ? '99+' : cartCount}
					</span>
				)}
			</Link>
		</div>
	);
}
