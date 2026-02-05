import { Button } from '@/components/ui/button';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './_ctx/logo';
import { UserAccount1 } from './_ctx/user-account-1';
import { UtilityIcons1 } from './_ctx/utility-icons-1';
export default async function Header01() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);

	return (
		<header className="w-full bg-white shadow-sm">
			{/* Top Bar */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<Logo logo={settings?.cms?.logo ?? ''} className="py-2" />

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
							<UtilityIcons1 />

							{/* User Account */}
							<UserAccount1 />
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
	);
}
