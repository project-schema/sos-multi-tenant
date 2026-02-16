'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { logout } from '@/lib';
import { accountLink } from '@/lib/links/account';
import { iCategory } from '@/store/features/admin/category';
import { useGetCartQuery } from '@/store/features/frontend/cart';
import { useFrontendCategoriesQuery } from '@/store/features/frontend/product/api-slice';
import { useGetWishlistQuery } from '@/store/features/frontend/wish-list';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import {
	Heart,
	LayoutDashboard,
	LogOut,
	Menu,
	Settings,
	ShoppingBag,
	ShoppingCart,
	User,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { SearchBar } from './search-bar';

export function MobileMenu1({ cms }: { cms: iSystem | null }) {
	const [open, setOpen] = useState(false);
	const { data: categories = [] } = useFrontendCategoriesQuery();
	const { data: session, status } = useSession();
	const isAuthenticated = status === 'authenticated' && session?.user;

	// Cart and Wishlist data
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
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<button className="md:hidden w-10 h-10 flex items-center justify-center">
					<Menu className="w-5 h-5 text-black" />
				</button>
			</SheetTrigger>
			<SheetContent side="left" className="w-[300px] sm:w-[400px]">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<div className=" flex flex-col gap-6 p-4">
					{/* Mobile Search */}
					<div className="flex flex-col gap-2">
						<SearchBar
							variant="mobile"
							categories={(categories as iCategory[]) || []}
							cms={cms}
						/>
					</div>

					{/* Mobile Navigation */}
					<nav className="flex flex-col gap-2">
						<Link
							href="/"
							className="text-sm font-medium text-gray-700 hover:text-black transition-colors py-2 uppercase"
							onClick={() => setOpen(false)}
						>
							Home
						</Link>
						<Link
							href="/shop"
							className="text-sm font-medium text-gray-700 hover:text-black transition-colors py-2 uppercase"
							onClick={() => setOpen(false)}
						>
							Shop
						</Link>
						<Link
							href="/blog"
							className="text-sm font-medium text-gray-700 hover:text-black transition-colors py-2 uppercase"
							onClick={() => setOpen(false)}
						>
							Blog
						</Link>
						<Link
							href="/contact"
							className="text-sm font-medium text-gray-700 hover:text-black transition-colors py-2 uppercase"
							onClick={() => setOpen(false)}
						>
							Contact
						</Link>
					</nav>

					{/* Mobile User Actions */}
					<div className="flex flex-col gap-8 pt-4 border-t ">
						{/* User Account */}
						{isAuthenticated ? (
							<div className="flex items-center gap-2.5">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<button className="flex items-center gap-2.5 outline-none">
											<div className="w-10 h-10 bg-black border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
												<User className="w-5 h-5 text-white" />
											</div>
											<div className="flex flex-col gap-0.5 text-left">
												<span className="text-xs text-black leading-tight">
													Welcome back
												</span>
												<span className="text-sm font-bold text-black/70 leading-tight truncate max-w-[120px]">
													{session.user.name || 'User'}
												</span>
											</div>
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start" className="w-48">
										<DropdownMenuItem asChild>
											<Link
												href={accountLink(session)}
												className="cursor-pointer"
											>
												<LayoutDashboard className="mr-2 h-4 w-4" />
												Dashboard
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link
												href={
													session.user.role_type === 'admin'
														? '/dashboard/product-order'
														: '/account?view=orders'
												}
												className="cursor-pointer"
											>
												<ShoppingBag className="mr-2 h-4 w-4" />
												My Orders
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link
												href={
													session.user.role_type === 'admin'
														? '/dashboard/profile'
														: '/account?view=profile'
												}
												className="cursor-pointer"
											>
												<Settings className="mr-2 h-4 w-4" />
												Profile Settings
											</Link>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={() => logout()}
											className="cursor-pointer text-red-600 focus:text-red-600"
										>
											<LogOut className="mr-2 h-4 w-4" />
											Log Out
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						) : (
							<div className="flex items-center gap-2.5">
								<div className="w-10 h-10 bg-white border border-[#DBDFE9] rounded-full flex items-center justify-center flex-shrink-0">
									<User className="w-5 h-5 text-black" />
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-xs text-black leading-tight">
										Welcome
									</span>
									<div className="flex items-center gap-1">
										<Link
											href="/auth?tab=login"
											className="text-sm font-bold text-black/70 hover:text-black transition-colors leading-tight"
											onClick={() => setOpen(false)}
										>
											Log In
										</Link>
										<span className="text-sm text-black/70">/</span>
										<Link
											href="/auth?tab=register"
											className="text-sm font-bold text-black/70 hover:text-black transition-colors leading-tight"
											onClick={() => setOpen(false)}
										>
											Register
										</Link>
									</div>
								</div>
							</div>
						)}

						{/* Utility Icons */}
						<div className="flex items-center gap-4">
							{/* Wishlist */}
							<Link
								href="/shop/wish-list"
								className="relative w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
								onClick={() => setOpen(false)}
							>
								<Heart className="w-5 h-5 text-black" />
								{wishlistCount > 0 && (
									<span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
										{wishlistCount}
									</span>
								)}
							</Link>

							{/* Shopping Cart */}
							<Link
								href="/shop/cart"
								className="flex items-center space-x-2"
								onClick={() => setOpen(false)}
							>
								<div className="relative">
									<div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
										<ShoppingCart className="w-5 h-5 text-black" />
									</div>
									{cartCount > 0 && (
										<span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
											{cartCount}
										</span>
									)}
								</div>
								<div className="flex flex-col">
									<span className="text-sm text-black font-medium">cart</span>
									<span className="text-sm text-black font-semibold">
										{cartCount > 0 ? `৳${cartTotal}` : '৳0.00'}
									</span>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
