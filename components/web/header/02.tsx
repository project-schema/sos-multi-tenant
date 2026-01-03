'use client';

import {
	ChevronDown,
	GitCompare,
	Heart,
	Menu,
	Phone,
	Search,
	ShoppingCart,
	User,
} from 'lucide-react';
import Link from 'next/link';

export default function Header02() {
	return (
		<header className="w-full bg-white">
			{/* Top Promotional Bar */}
			<div className="bg-black text-white py-3">
				<div className="w-full px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between flex-wrap gap-3 text-xs  ">
						<span>10% discount on your first purchase for new members</span>
						<span className="text-white">•</span>
						<span>Get 10% off your first order — use code: WELCOME10</span>
						<span className="text-white">•</span>
						<span>New Season Collection | Shop Now</span>
						<span className="text-white">•</span>
						<span>Free Returns Within 30 Days</span>
					</div>
				</div>
			</div>

			{/* Main Header Section */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between gap-4 py-4">
						{/* Logo */}
						<Link
							href="/"
							className="flex items-center space-x-2 flex-shrink-0"
						>
							<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
								<ShoppingCart className="w-6 h-6 text-white" />
							</div>
							<span className="text-xl font-bold text-black">SOSComrz</span>
						</Link>

						{/* Search Bar */}
						<div className="flex-1 max-w-2xl mx-4 hidden md:flex">
							<div className="flex w-full border border-amber-600   overflow-hidden">
								{/* Categories Dropdown */}
								<button className="flex items-center gap-2 px-4 py-2.5 bg-white border-r border-amber-600 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
									<span>All Categories</span>
									<ChevronDown className="w-4 h-4" />
								</button>
								{/* Search Input */}
								<input
									type="text"
									placeholder="Search for products"
									className="flex-1 px-4 py-2.5 outline-none text-sm text-gray-700 placeholder:text-gray-400"
								/>
								{/* Search Button */}
								<button className="bg-orange-500 m-1 text-white w-10 h-10 hover:bg-orange-600 transition-colors flex items-center justify-center">
									<Search className="w-5 h-5" />
								</button>
							</div>
						</div>

						{/* Right Side Actions */}
						<div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
							{/* Contact Info */}
							<div className="hidden lg:flex items-center gap-2.5">
								<div className="w-10 h-10 bg-white border border-[#DBDFE9] rounded-full flex items-center justify-center flex-shrink-0">
									<Phone className="w-5 h-5 text-orange-500" />
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-xs text-orange-600 leading-tight">
										Contact
									</span>
									<span className="text-sm font-bold text-black/70 leading-tight">
										+880 124 36626
									</span>
								</div>
							</div>

							{/* User Account */}
							<div className="hidden lg:flex items-center gap-2.5">
								<div className="w-10 h-10 bg-white border border-[#DBDFE9] rounded-full flex items-center justify-center flex-shrink-0">
									<User className="w-5 h-5 text-orange-500" />
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-xs text-orange-600 leading-tight">
										Welcome
									</span>
									<Link
										href="/auth"
										className="text-sm font-bold text-black/70 hover:text-orange-500 transition-colors leading-tight"
									>
										Log In / Register
									</Link>
								</div>
							</div>

							{/* Mobile Menu Button */}
							<button className="lg:hidden w-10 h-10 flex items-center justify-center">
								<Menu className="w-6 h-6 text-black" />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Navigation Bar */}
			<div className="bg-gray-100 border-b border-gray-200">
				<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between   gap-4">
						<div className="flex items-center gap-4">
							{/* Categories Button */}
							<button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3.5   hover:bg-orange-600 transition-colors font-medium whitespace-nowrap">
								<Menu className="w-5 h-5" />
								<span>All Categories</span>
								<ChevronDown className="w-4 h-4" />
							</button>

							{/* Navigation Links */}
							<nav className="hidden md:flex items-center gap-6">
								<Link
									href="/clothes"
									className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
								>
									Clothes
								</Link>
								<Link
									href="/new-arrivals"
									className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
								>
									New Arrivals
								</Link>
								<Link
									href="/best-sellers"
									className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
								>
									Best Sellers
								</Link>
								<Link
									href="/blog"
									className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
								>
									Blog
								</Link>
								<div className="relative group">
									<Link
										href="/pages"
										className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
									>
										<span>Pages</span>
										<ChevronDown className="w-4 h-4" />
									</Link>
									{/* Dropdown Menu */}
									<div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
										<div className="py-2">
											<Link
												href="/pages/about"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												About Us
											</Link>
											<Link
												href="/pages/contact"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Contact
											</Link>
											<Link
												href="/pages/faq"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												FAQ
											</Link>
										</div>
									</div>
								</div>
							</nav>
						</div>

						{/* Utility Icons */}
						<div className="flex items-center gap-4">
							{/* Compare Icon */}
							<button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors">
								<GitCompare className="w-5 h-5" />
							</button>

							{/* Wishlist Icon */}
							<button className="relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors">
								<Heart className="w-5 h-5" />
								<span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
									2
								</span>
							</button>

							{/* Shopping Cart Icon */}
							<button className="relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors">
								<ShoppingCart className="w-5 h-5" />
								<span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
									1
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
