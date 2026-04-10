'use client';

import {
	getGuestCart,
	getGuestWishlist,
} from '@/components/theme/common/guest-cart-action';
import { Heart, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface UtilityIconsProps {
	variant?: 'desktop' | 'mobile';
}

export function GuestUtilityIcons({ variant = 'desktop' }: UtilityIconsProps) {
	const { data: session } = useSession();
	const [cartCount, setCartCount] = useState(0);
	const [wishlistCount, setWishlistCount] = useState(0);

	useEffect(() => {
		const sync = () => {
			const cart = getGuestCart();
			const wishlist = getGuestWishlist();
			setCartCount(cart.length);
			setWishlistCount(wishlist.length);
		};

		sync(); // initial load

		// Stay in sync when GuestCartAction dispatches updates
		window.addEventListener('guest-cart-updated', sync);
		window.addEventListener('guest-wishlist-updated', sync);
		return () => {
			window.removeEventListener('guest-cart-updated', sync);
			window.removeEventListener('guest-wishlist-updated', sync);
		};
	}, []);

	if (session) return null;

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
