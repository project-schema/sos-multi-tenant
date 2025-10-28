'use client';

import { Button } from '@/components/ui/button';
import {
	ChevronDown,
	Heart,
	Menu,
	Search,
	ShoppingCart,
	User,
} from 'lucide-react';
import Link from 'next/link';

export default function Header01() {
	return (
		<header className="w-full bg-white shadow-sm">
			{/* Top Bar */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<div className="flex items-center">
							<Link href="/" className="flex items-center space-x-2">
								<div className="w-8 h-8 border-2 border-black rounded flex items-center justify-center">
									<ShoppingCart className="w-5 h-5 text-black" />
								</div>
								<span className="text-xl font-semibold text-black">
									SOSCommerce
								</span>
							</Link>
						</div>

						{/* Search Bar */}
						<div className="flex-1 max-w-lg mx-8 hidden md:block">
							<div className="relative">
								<input
									type="text"
									placeholder="Search"
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
								/>
								<button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-1 rounded hover:bg-gray-800 transition-colors">
									<Search className="w-4 h-4" />
								</button>
							</div>
						</div>

						{/* Right Side Actions */}
						<div className="  items-center space-x-6 hidden md:flex">
							{/* Wishlist */}
							<div className="flex items-center space-x-2">
								<div className="relative">
									<button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
										<Heart className="w-5 h-5 text-black" />
									</button>
									<span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
										5
									</span>
								</div>
							</div>

							{/* Shopping Cart */}
							<div className="flex items-center space-x-2">
								<div className="relative">
									<button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
										<ShoppingCart className="w-5 h-5 text-black" />
									</button>
									<span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
										5
									</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm text-black font-medium">cart</span>
									<span className="text-sm text-black font-semibold">
										৳1,689.00
									</span>
								</div>
							</div>

							{/* User Account */}
							<div className="flex items-center space-x-2">
								<button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
									<User className="w-5 h-5 text-black" />
								</button>
								<div className="flex flex-col">
									<span className="text-sm text-black">Hi,</span>
									<Link
										href="/auth"
										className="text-sm text-gray-600 hover:text-black transition-colors"
									>
										Log In / Register
									</Link>
								</div>
							</div>
						</div>
						<div className="md:hidden">
							<Button variant="ghost" size="icon">
								<Menu className="w-4 h-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Navigation Bar */}
			<div className="bg-black md:block hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<nav className="flex items-center justify-center">
						<ul className="flex items-center space-x-8 whitespace-nowrap flex-wrap">
							<li>
								<Link
									href="/category/t-shirts"
									className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
								>
									T-Shirts
								</Link>
							</li>
							<li>
								<Link
									href="/category/shirts"
									className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
								>
									Shirts
								</Link>
							</li>
							<li>
								<Link
									href="/category/polo-shirts"
									className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
								>
									Polo Shirts
								</Link>
							</li>
							<li className="relative group">
								<Link
									href="/category/panjabi"
									className="flex items-center space-x-1 text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
								>
									<span>Panjabi</span>
									<ChevronDown className="w-4 h-4" />
								</Link>
								{/* Dropdown Menu */}
								<div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
									<div className="py-2">
										<Link
											href="/category/panjabi/casual"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Casual Panjabi
										</Link>
										<Link
											href="/category/panjabi/formal"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Formal Panjabi
										</Link>
										<Link
											href="/category/panjabi/designer"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Designer Panjabi
										</Link>
									</div>
								</div>
							</li>
							<li>
								<Link
									href="/category/pants"
									className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
								>
									Pants
								</Link>
							</li>
							<li>
								<Link
									href="/category/trousers"
									className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
								>
									Trousers
								</Link>
							</li>
							<li>
								<Link
									href="/category/jeans"
									className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
								>
									Jeans
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}
