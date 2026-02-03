import { getApiDataWithSubdomain, imageFormat } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import {
	ChevronDown,
	Facebook,
	Instagram,
	MessageCircle,
	Music,
	Phone,
	Search,
	Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { UserAccount } from './_ctx/user-account';
import { UtilityIcons } from './_ctx/utility-icons';

export default async function Header03() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms',
	);
	const menuItems = [
		{
			label: 'New',
			href: '/',
			badge: '',
			subItems: [
				{
					label: 'New Sarees',
					href: '/new-sarees',
				},
			],
		},
		{
			label: 'Sarees',
			href: '/',
			badge: 'Best',
			subItems: [],
		},
		{
			label: 'Lehengas',
			href: '/',
			badge: '',
			subItems: [
				{
					label: 'Best Lehengas',
					href: '/best-lehengas',
				},
				{
					label: 'Best Salwar Kameez',
					href: '/best-salwar-kameez',
				},
				{
					label: 'Best Kurtis',
					href: '/best-kurtis',
				},
			],
		},
		{
			label: 'Salwar Kameez',
			href: '/',
			badge: '',
			subItems: [],
		},
		{
			label: 'Kurtis',
			href: '/',
			badge: '',
			subItems: [],
		},
		{
			label: 'Jewellery',
			href: '/',
			badge: '',
			subItems: [],
		},
		{
			label: 'Luxery',
			href: '/',
			badge: 'New',
			subItems: [],
		},
		{
			label: 'Fashion',
			href: '/',
			badge: '',
			subItems: [],
		},
	];
	return (
		<header className="w-full bg-white">
			{/* Top Bar - Maroon Background */}
			<div className="bg-[#800020] text-white py-2.5">
				<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between flex-wrap gap-4 text-xs sm:text-sm">
						{/* Social Media Icons */}
						<div className="flex items-center gap-3">
							<Link
								href="#"
								className="hover:opacity-80 transition-opacity"
								aria-label="Facebook"
							>
								<Facebook className="w-4 h-4" />
							</Link>
							<Link
								href="#"
								className="hover:opacity-80 transition-opacity"
								aria-label="Instagram"
							>
								<Instagram className="w-4 h-4" />
							</Link>
							<Link
								href="#"
								className="hover:opacity-80 transition-opacity"
								aria-label="TikTok"
							>
								<Music className="w-4 h-4" />
							</Link>
							<Link
								href="#"
								className="hover:opacity-80 transition-opacity"
								aria-label="X (Twitter)"
							>
								<Twitter className="w-4 h-4" />
							</Link>
						</div>

						{/* Contact Information */}
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2">
								<Phone className="w-4 h-4" />
								<span>+881 32 13 122323</span>
							</div>
							<div className="h-4 w-px bg-white/50" />
							<div className="flex items-center gap-2">
								<MessageCircle className="w-4 h-4" />
								<span>admin@subscriber.com</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Middle Bar - White Background */}
			<div className="bg-white">
				<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between gap-4 py-4">
						{/* Search Icon */}
						<button
							className="flex items-center justify-center text-[#800020] hover:opacity-80 transition-opacity"
							aria-label="Search"
						>
							<Search className="w-6 h-6" />
						</button>

						{/* Logo - Center */}
						<Link
							href="/"
							className="flex flex-col items-center justify-center flex-shrink-0"
						>
							<img
								className="h-10"
								src={imageFormat(settings?.cms.logo || null)}
								alt="logo"
							/>
						</Link>
						{/* <Link
							href="/"
							className="flex flex-col items-center justify-center flex-shrink-0"
						>
							<span className="text-[#800020] text-base sm:text-lg font-serif leading-none">
								SOS
							</span>
							<span className="text-black text-xl sm:text-2xl lg:text-3xl font-serif font-semibold leading-none">
								Comerz
							</span>
						</Link> */}

						{/* Account and Cart - Right */}
						<div className="flex items-center gap-4">
							<UtilityIcons variant="desktop" />
							<UserAccount />
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar - Navigation Menu */}
			<div className="bg-white border-t border-gray-200 relative">
				<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
					<nav className="flex items-center justify-center flex-wrap py-5">
						{menuItems.map((item) => (
							<div
								key={item.label}
								className={`relative group ${
									item.badge ? 'not-last:mr-6' : 'not-last:mr-4'
								} `}
							>
								<Link
									href={item.href}
									className="text-sm font-semibold font-montserrat flex items-center gap-2"
								>
									{item.label}
									{item.subItems.length > 0 && (
										<ChevronDown className="w-6 h-6" />
									)}
								</Link>
								{item.badge && (
									<span className="text-sm font-semibold font-montserrat absolute -top-3 -right-4 bg-[#800020] text-[8px] text-white px-2 py-0.5 rounded-full">
										{item.badge}
									</span>
								)}

								{item.subItems.length > 0 && (
									<div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
										{item.subItems.map((subItem) => (
											<Link
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												key={subItem.label}
												href={subItem.href}
											>
												{subItem.label}
											</Link>
										))}
									</div>
								)}
							</div>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
}
