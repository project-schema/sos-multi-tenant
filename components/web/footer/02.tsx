'use client';

import {
	Facebook,
	Instagram,
	Music,
	ShoppingCart,
	Twitter,
} from 'lucide-react';
import Link from 'next/link';

interface Category {
	label: string;
	href?: string;
}

interface Brand {
	label: string;
	href?: string;
}

interface Store {
	name: string;
	address: string;
}

interface PaymentMethod {
	name: string;
	logo: string;
	alt: string;
}

const categories: Category[] = [
	{ label: "Man's Fashion" },
	{ label: "Women's Fashion" },
	{ label: 'Kids' },
	{ label: 'Summer' },
	{ label: 'Winter' },
	{ label: 'Christmas' },
];

const brands: Brand[] = [
	{ label: 'Elysian Glow' },
	{ label: 'Clara Skin' },
	{ label: 'Serenne' },
	{ label: 'Veloura' },
	{ label: 'Lustra' },
	{ label: 'Veloura' },
];

const stores: Store[] = [
	{
		name: 'Store One',
		address:
			'Yeni Mahallesi Öğretmenler Boulevard 87071. Street No: 5 Ground Floor No: 96 Seyhan/Adana',
	},
	{
		name: 'Store Two',
		address:
			'Yeni Mahallesi Öğretmenler Boulevard 87071. Street No: 5 Ground Floor No: 96 Seyhan/Adana',
	},
];

const paymentMethods: PaymentMethod[] = [
	{
		name: 'Google Pay',
		logo: 'https://via.placeholder.com/60x30/4285F4/FFFFFF?text=G+Pay',
		alt: 'Google Pay',
	},
	{
		name: 'Stripe',
		logo: 'https://via.placeholder.com/60x30/635BFF/FFFFFF?text=Stripe',
		alt: 'Stripe',
	},
	{
		name: 'Apple Pay',
		logo: 'https://via.placeholder.com/60x30/000000/FFFFFF?text=Apple+Pay',
		alt: 'Apple Pay',
	},
	{
		name: 'VISA',
		logo: 'https://via.placeholder.com/60x30/1A1F71/FFFFFF?text=VISA',
		alt: 'VISA',
	},
	{
		name: 'Samsung Pay',
		logo: 'https://via.placeholder.com/60x30/1428A0/FFFFFF?text=Samsung',
		alt: 'Samsung Pay',
	},
	{
		name: 'Western Union',
		logo: 'https://via.placeholder.com/60x30/FFCC00/000000?text=WU',
		alt: 'Western Union',
	},
	{
		name: 'Payoneer',
		logo: 'https://via.placeholder.com/60x30/FF4800/FFFFFF?text=Payoneer',
		alt: 'Payoneer',
	},
];

export default function Footer02() {
	return (
		<footer className="bg-gray-100 text-gray-800 mt-24">
			{/* Main Footer Content */}
			<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Leftmost Section - Logo and About */}
					<div className="space-y-6">
						{/* Logo */}
						<div className="flex items-center space-x-2">
							<div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
								<ShoppingCart className="w-6 h-6 text-white" />
							</div>
							<span className="text-2xl font-bold text-black">SOSComrz</span>
						</div>

						{/* Description */}
						<p className="text-gray-500 leading-relaxed text-sm">
							With its half-century history, Seyidoğlu has introduced many
							innovations in areas such as halva, jam, tahini-molasses and cocoa
							cream, and is one of the leading brands.
						</p>

						{/* Social Media Icons */}
						<div className="flex space-x-3">
							<Link
								href="https://facebook.com"
								className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-200"
								aria-label="Facebook"
							>
								<Facebook className="w-5 h-5 text-black" />
							</Link>
							<Link
								href="https://instagram.com"
								className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-200"
								aria-label="Instagram"
							>
								<Instagram className="w-5 h-5 text-black" />
							</Link>
							<Link
								href="https://tiktok.com"
								className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-200"
								aria-label="TikTok"
							>
								<Music className="w-5 h-5 text-black" />
							</Link>
							<Link
								href="https://x.com"
								className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-200"
								aria-label="X (Twitter)"
							>
								<Twitter className="w-5 h-5 text-black" />
							</Link>
						</div>
					</div>

					{/* Middle-Left Section - Category */}
					<div className="space-y-4">
						<h3 className="text-lg font-bold text-black">Category</h3>
						<ul className="space-y-2">
							{categories.map((category, index) => (
								<li key={index}>
									<Link
										href={category.href || '#'}
										className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm"
									>
										{category.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Middle-Right Section - Brands */}
					<div className="space-y-4">
						<h3 className="text-lg font-bold text-black">Brands</h3>
						<ul className="space-y-2">
							{brands.map((brand, index) => (
								<li key={index}>
									<Link
										href={brand.href || '#'}
										className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm"
									>
										{brand.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Rightmost Section - Stores */}
					<div className="space-y-4">
						<h3 className="text-lg font-bold text-black">Stores</h3>
						<div className="space-y-4">
							{stores.map((store, index) => (
								<div key={index} className="space-y-2">
									<h4 className="font-bold text-black text-sm">{store.name}</h4>
									<p className="text-gray-500 text-sm leading-relaxed">
										{store.address}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Section - Copyright and Payment Methods */}
			<div className="border-t border-gray-300">
				<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						{/* Copyright */}
						<div className="text-gray-500 text-sm">
							©2025 Copywrite Belongs to{' '}
							<span className="text-orange-500 font-semibold">SOS Comerz</span>
						</div>

						{/* Payment Methods */}
						<div className="flex items-center space-x-2 flex-wrap justify-center">
							{paymentMethods.map((method, index) => (
								<div key={index} className="relative">
									<img
										src={method.logo}
										alt={method.alt}
										className="h-8 w-auto rounded"
										loading="lazy"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
