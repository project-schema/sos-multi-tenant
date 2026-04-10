'use client';

import {
	getGuestCart,
	getGuestWishlist,
	iGuestCartItem,
	iGuestWishlistItem,
} from '@/components/theme/common/guest-cart-action';
import { GUEST_CART_KEY, GUEST_WISHLIST_KEY } from '@/lib';
import { Heart, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export const setGuestCart = (cart: iGuestCartItem[]) => {
	localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
	window.dispatchEvent(new Event('guest-cart-updated'));
};

export const setGuestWishlist = (wishlist: iGuestWishlistItem[]) => {
	localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
	window.dispatchEvent(new Event('guest-wishlist-updated'));
};
export function GuestUtilityIcons1() {
	const { data: session } = useSession();
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);
	const [wishlistCount, setWishlistCount] = useState(0);

	useEffect(() => {
		const sync = () => {
			const cart = getGuestCart();
			const wishlist = getGuestWishlist();
			setCartCount(cart.length);
			setCartTotal(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
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
		<>
			{/* Wishlist */}
			<div className="flex items-center space-x-2">
				<div className="relative">
					<Link
						href="/shop/wish-list"
						className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
					>
						<Heart className="w-5 h-5 text-black" />
					</Link>
					<span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{wishlistCount}
					</span>
				</div>
			</div>

			{/* Shopping Cart */}
			<div className="flex items-center space-x-2">
				<div className="relative">
					<Link
						href="/shop/cart"
						className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
					>
						<ShoppingCart className="w-5 h-5 text-black" />
					</Link>
					<span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{cartCount}
					</span>
				</div>
				<div className="flex flex-col">
					<span className="text-sm text-black font-medium">cart</span>
					<span className="text-sm text-black font-semibold">
						{cartTotal > 0 ? `৳${cartTotal.toLocaleString()}` : '৳0.00'}
					</span>
				</div>
			</div>
		</>
	);
}
