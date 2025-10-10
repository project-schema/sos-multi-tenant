'use client';

import {
	Facebook,
	Instagram,
	Mail,
	MapPin,
	MessageCircle,
	Music,
	Phone,
	Shield,
	ShoppingCart,
	Star,
	Truck,
} from 'lucide-react';
import Link from 'next/link';

interface Feature {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

interface QuickLink {
	label: string;
	href: string;
}

interface ContactInfo {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

interface PaymentMethod {
	name: string;
	logo: string;
	alt: string;
}

const features: Feature[] = [
	{
		icon: Star,
		title: 'High-quality Goods',
		description: 'Enjoy top quality items for less.',
	},
	{
		icon: MessageCircle,
		title: '24/7 Live chat',
		description: 'Get instant assistance.',
	},
	{
		icon: Truck,
		title: 'Express Shipping',
		description: 'Fast & reliable delivery options.',
	},
	{
		icon: Shield,
		title: 'Secure Payment',
		description: 'Multiple safe payment methods.',
	},
];

const quickLinks: QuickLink[] = [
	{ label: 'Order Tracking', href: '/order-tracking' },
	{ label: 'About Us', href: '/about' },
	{ label: 'Contact Us', href: '/contact' },
	{ label: 'Privacy Policy', href: '/privacy' },
	{ label: 'Return Policy', href: '/returns' },
	{ label: 'Terms and Conditions', href: '/terms' },
];

const contactInfo: ContactInfo[] = [
	{
		icon: MapPin,
		text: '685 Market Street, Las Vegas, LA 95820, United States.',
	},
	{
		icon: Phone,
		text: '065464949166',
	},
	{
		icon: Mail,
		text: 'support@sosecomerce.com',
	},
];

const paymentMethods: PaymentMethod[] = [
	{
		name: 'bKash',
		logo: 'https://via.placeholder.com/80x40/E91E63/FFFFFF?text=bKash',
		alt: 'bKash Payment',
	},
	{
		name: 'Nagad',
		logo: 'https://via.placeholder.com/80x40/FF9800/FFFFFF?text=Nagad',
		alt: 'Nagad Payment',
	},
	{
		name: 'COD',
		logo: 'https://via.placeholder.com/80x40/F44336/FFFFFF?text=COD',
		alt: 'Cash on Delivery',
	},
];

export default function Footer01() {
	return (
		<footer className="bg-gray-900 text-white">
			{/* Features Section */}
			<div className="border-b border-gray-700">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{features.map((feature, index) => (
							<div
								key={index}
								className="flex flex-col items-center text-center space-y-3"
							>
								<div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
									<feature.icon className="w-6 h-6 text-white" />
								</div>
								<div>
									<h3 className="font-bold text-lg mb-1">{feature.title}</h3>
									<p className="text-gray-300 text-sm">{feature.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Main Footer Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Left Column - Branding and Social Media */}
					<div className="space-y-6">
						{/* Logo and Name */}
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-white rounded flex items-center justify-center">
								<ShoppingCart className="w-6 h-6 text-gray-900" />
							</div>
							<span className="text-2xl font-bold">SOSCommerce</span>
						</div>

						{/* Description */}
						<p className="text-gray-300 leading-relaxed">
							Transform Your Shopping Experience with Sosecommerce - Step into a
							world of handpicked styles, cutting-edge trends, and timeless
							elegance. From everyday essentials to standout statement pieces,
							discover fashion that fits your life. Redefine your wardrobe with
							sophistication and ease. Shop smart. Shop Sosecommerce.
						</p>

						{/* Social Media Icons */}
						<div className="flex space-x-4">
							<Link
								href="https://facebook.com"
								className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-200"
								aria-label="Facebook"
							>
								<Facebook className="w-5 h-5" />
							</Link>
							<Link
								href="https://instagram.com"
								className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-200"
								aria-label="Instagram"
							>
								<Instagram className="w-5 h-5" />
							</Link>
							<Link
								href="https://tiktok.com"
								className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-200"
								aria-label="TikTok"
							>
								<Music className="w-5 h-5" />
							</Link>
						</div>
					</div>

					{/* Middle Column - Quick Links */}
					<div className="space-y-6">
						<h3 className="text-xl font-bold">Quick Links</h3>
						<ul className="space-y-3">
							{quickLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className="text-gray-300 hover:text-white transition-colors duration-200"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Right Column - Contact Info */}
					<div className="space-y-6">
						<h3 className="text-xl font-bold">Contact Info</h3>
						<ul className="space-y-4">
							{contactInfo.map((contact, index) => (
								<li key={index} className="flex items-start space-x-3">
									<contact.icon className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
									<span className="text-gray-300">{contact.text}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* Bottom Section - Copyright and Payment Methods */}
			<div className="border-t border-gray-700">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						{/* Copyright */}
						<div className="text-gray-300 text-sm">
							© 2025. All rights reserved by SOSEcommerce.
						</div>

						{/* Payment Methods */}
						<div className="flex items-center space-x-4">
							<span className="text-gray-300 text-sm mr-4">
								Payment Methods:
							</span>
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
