import { env, getApiDataWithSubdomain } from '@/lib';
import { webSocialLinks } from '@/lib/icon/social-icon';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MobileMenu } from './_ctx/mobile-menu';
import SearchPopup from './_ctx/search-popup';
import { UserAccount } from './_ctx/user-account';
import { UtilityIcons } from './_ctx/utility-icons';

export default async function MainHeader() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms',
	);
	const menuItems = [
		{
			label: 'Home',
			href: '/',
			badge: '',
		},
		{
			label: 'Shop',
			href: '/shop',
			badge: '',
		},
		{
			label: 'Blog',
			href: '/blog',
			badge: '',
		},

		{
			label: 'Contact',
			href: '/contact',
			badge: '',
		},
	];

	// const menuItems = [
	// 	{
	// 		label: 'New',
	// 		href: '/',
	// 		badge: '',
	// 		subItems: [
	// 			{
	// 				label: 'New Sarees',
	// 				href: '/new-sarees',
	// 			},
	// 		],
	// 	},
	// 	{
	// 		label: 'Sarees',
	// 		href: '/',
	// 		badge: 'Best',
	// 		subItems: [],
	// 	},
	// 	{
	// 		label: 'Lehengas',
	// 		href: '/',
	// 		badge: '',
	// 		subItems: [
	// 			{
	// 				label: 'Best Lehengas',
	// 				href: '/best-lehengas',
	// 			},
	// 			{
	// 				label: 'Best Salwar Kameez',
	// 				href: '/best-salwar-kameez',
	// 			},
	// 			{
	// 				label: 'Best Kurtis',
	// 				href: '/best-kurtis',
	// 			},
	// 		],
	// 	},
	// 	{
	// 		label: 'Salwar Kameez',
	// 		href: '/',
	// 		badge: '',
	// 		subItems: [],
	// 	},
	// 	{
	// 		label: 'Kurtis',
	// 		href: '/',
	// 		badge: '',
	// 		subItems: [],
	// 	},
	// 	{
	// 		label: 'Jewellery',
	// 		href: '/',
	// 		badge: '',
	// 		subItems: [],
	// 	},
	// 	{
	// 		label: 'Luxery',
	// 		href: '/',
	// 		badge: 'New',
	// 		subItems: [],
	// 	},
	// 	{
	// 		label: 'Fashion',
	// 		href: '/',
	// 		badge: '',
	// 		subItems: [],
	// 	},
	// ];
	return (
		<header className="w-full bg-white border-b border-primary3/20">
			{/* Top Promotional Bar */}
			{/* {settings?.offers && settings?.offers?.length > 0 && (
				<TopPromotionalBar offers={settings?.offers ?? []} />
			)} */}

			{/* Top Bar - Maroon Background */}
			<div className="bg-primary3 text-white py-2.5 hidden lg:block">
				<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between flex-wrap gap-4 text-xs sm:text-sm">
						{/* Social Media Icons */}
						<div className="flex items-center gap-2">
							{webSocialLinks?.map((social) => {
								const url =
									settings?.cms?.[social.key as keyof typeof settings.cms];

								if (!url) return null;

								return (
									<Link
										key={social.key}
										href={url as string}
										className="w-4 h-4  rounded-full flex items-center justify-center  transition-all duration-200"
										aria-label={social.label}
										prefetch={false}
									>
										<Image
											src={social.icon}
											width={1000}
											height={1000}
											alt={social.label}
											className="w-4 h-4 object-contain hover:scale-110 transition-all"
										/>
									</Link>
								);
							})}
						</div>

						{/* Contact Information */}
						<div className="flex items-center gap-3">
							<a
								href={`tel:${settings?.cms.footer_contact_number_one}`}
								className="flex items-center gap-2"
							>
								<Phone className="w-4 h-4" />
								<span>{settings?.cms.footer_contact_number_one}</span>
							</a>
							<div className="h-4 w-px bg-white/50" />
							<div className="flex items-center gap-2">
								<MapPin className="w-4 h-4" />
								<span>{settings?.cms.footer_contact_address_one}</span>
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
						<SearchPopup cms={settings?.cms || null} />

						{/* Logo - Center */}
						<Link
							href="/"
							className="flex flex-col items-center justify-center flex-shrink-0 absolute left-1/2 transform -translate-x-1/2"
						>
							<img
								className="h-10"
								// src={imageFormat(settings?.cms.logo || null)}
								src={
									settings?.cms.logo
										? `${env.baseAPI}/${settings?.cms.logo}`
										: '/logo-black.png'
								}
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
							<UserAccount cms={settings?.cms ?? null} />
							<MobileMenu cms={settings?.cms ?? null} />
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar - Navigation Menu */}
			<div className="bg-white border-t border-primary3/10 relative">
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
									className="text-sm font-semibold font-montserrat flex items-center gap-2 hover:text-primary3"
								>
									{item.label}
									{/* {item?.subItems?.length > 0 && (
										<ChevronDown className="w-6 h-6" />
									)} */}
								</Link>
								{item.badge && (
									<span className="text-sm font-semibold font-montserrat absolute -top-3 -right-4 bg-primary3 text-[8px] text-white px-2 py-0.5 rounded-full">
										{item.badge}
									</span>
								)}

								{/* {item?.subItems?.length > 0 && (
									<div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
										{item?.subItems?.map((subItem) => (
											<Link
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												key={subItem.label}
												href={subItem.href}
											>
												{subItem.label}
											</Link>
										))}
									</div>
								)} */}
							</div>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
}
