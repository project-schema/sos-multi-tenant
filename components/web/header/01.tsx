import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Link from 'next/link';
import { Logo } from './_ctx/logo';
import { MobileMenu1 } from './_ctx/mobile-menu-1';
import SearchPopup1 from './_ctx/search-popup-1';
import { TopPromotionalBar } from './_ctx/top-promotional-bar';
import { UserAccount1 } from './_ctx/user-account-1';
import { UtilityIcons1 } from './_ctx/utility-icons-1';
export default async function Header01() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);

	return (
		<>
			<header className="w-full bg-white shadow-sm">
				{settings?.offers && settings?.offers?.length > 0 && (
					<TopPromotionalBar offers={settings?.offers ?? []} />
				)}
				{/* Top Bar */}
				<div className="bg-white border-b border-gray-200">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between h-16">
							{/* Logo */}
							<Logo logo={settings?.cms?.logo ?? ''} className="py-2" />

							{/* Search Bar */}
							<div className="flex-1 max-w-lg mx-8 hidden md:block">
								<SearchPopup1 />
							</div>

							{/* Right Side Actions */}
							<div className="hidden md:flex items-center space-x-6">
								<UtilityIcons1 />

								{/* User Account */}
								<UserAccount1 />
							</div>
							{/* Mobile Menu */}
							<div className="md:hidden">
								<MobileMenu1 />
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
										href="/"
										className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										href="/shop"
										className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
									>
										Shop
									</Link>
								</li>
								<li>
									<Link
										href="/blog"
										className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
									>
										Blog
									</Link>
								</li>
								{/* <li className="relative group">
								<Link
									href="/about"
									className="flex items-center space-x-1 text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
								>
									<span>About</span>
									<ChevronDown className="w-4 h-4" />
								</Link>
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
							</li> */}
								<li>
									<Link
										href="/contact"
										className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
									>
										Contact
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
		</>
	);
}
