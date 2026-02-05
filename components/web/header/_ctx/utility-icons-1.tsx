'use client';

import { useGetCartQuery } from '@/store/features/frontend/cart';
import { useGetWishlistQuery } from '@/store/features/frontend/wish-list';
import { Heart, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export function UtilityIcons1() {
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
	const cartTotal =
		cartData?.cart?.reduce(
			(acc, item) => acc + Number(item.totalproductprice || 0),
			0
		) || 0;

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
						{wishlistCount > 0 ? wishlistCount : 0}
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
						{cartCount > 0 ? cartCount : 0}
					</span>
				</div>
				<div className="flex flex-col">
					<span className="text-sm text-black font-medium">cart</span>
					<span className="text-sm text-black font-semibold">
						{cartCount > 0 ? `৳${cartTotal}` : '৳0.00'}
					</span>
				</div>
			</div>
		</>
	);
}
