import { getApiDataWithSubdomain, imageFormat } from '@/lib';
import { iBrand } from '@/store/features/admin/brand';
import { iCategory } from '@/store/features/admin/category';
import { iService } from '@/store/features/vendor/cms/home-page';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import {
	Facebook,
	Instagram,
	MapPin,
	MessageCircle,
	Music,
	Phone,
	Shield,
	Star,
	Truck,
	Twitter,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Feature {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
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

export default async function Footer01() {
	const settings = await getApiDataWithSubdomain<{
		cms: iSystem;
		content_services: iService[];
	}>('/tenant-frontend/cms');
	const categories = await getApiDataWithSubdomain<iCategory[]>(
		'/tenant-frontend/categories'
	);
	const brands = await getApiDataWithSubdomain<iBrand[]>(
		'/tenant-frontend/brands'
	);

	return (
		<footer className="bg-gray-900 text-white">
			{/* Features Section */}
			<div className="border-b border-gray-700">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex flex-wrap 2xl:justify-between justify-center items-center gap-6">
						{settings?.content_services?.map((feature, index) => (
							<div
								key={index}
								className="flex flex-col items-center text-center space-y-3"
							>
								<div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
									<Image
										src={imageFormat(feature.icon || '')}
										alt={feature.title}
										width={1000}
										height={1000}
										className="w-6 h-6 object-contain"
									/>
								</div>
								<div>
									<h3 className="font-bold text-lg mb-1">{feature.title}</h3>
									<p className="text-gray-300 text-sm">
										{feature.description || ''}
									</p>
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
						{/* Logo */}
						<div className="h-[34px] flex items-center">
							{settings?.cms?.footer_logo ? (
								<img
									src={imageFormat(settings.cms.footer_logo)}
									alt={settings.cms.app_name || 'Logo'}
									className="h-full object-contain"
								/>
							) : (
								<span className="text-2xl font-bold">
									{settings?.cms?.app_name || 'SOSCommerce'}
								</span>
							)}
						</div>

						{/* Description */}
						{settings?.cms?.footer_description && (
							<p className="text-gray-300 leading-relaxed">
								{settings.cms.footer_description}
							</p>
						)}

						{/* Social Media Icons */}
						<div className="flex space-x-4">
							{settings?.cms?.fb_url && (
								<Link
									href={settings.cms.fb_url}
									className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-200"
									aria-label="Facebook"
								>
									<Facebook className="w-5 h-5" />
								</Link>
							)}
							{settings?.cms?.instagram_url && (
								<Link
									href={settings.cms.instagram_url}
									className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-200"
									aria-label="Facebook"
								>
									<Facebook className="w-5 h-5" />
								</Link>
							)}
							{settings?.cms?.tiktok_url && (
								<Link
									href={settings.cms.tiktok_url}
									className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-200"
									aria-label="Instagram"
								>
									<Instagram className="w-5 h-5" />
								</Link>
							)}
							{settings?.cms?.youtube_url && (
								<Link
									href={settings.cms.youtube_url}
									className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-200"
									aria-label="TikTok"
								>
									<Music className="w-5 h-5" />
								</Link>
							)}
							{settings?.cms?.x_url && (
								<Link
									href={settings.cms.x_url}
									className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-200"
									aria-label="X (Twitter)"
								>
									<Twitter className="w-5 h-5" />
								</Link>
							)}
						</div>
					</div>

					{/* Middle Column - Categories */}
					<div className="space-y-6">
						<h3 className="text-xl font-bold">Categories</h3>
						<ul className="space-y-3">
							{categories?.slice(0, 6).map((category, index) => (
								<li key={index}>
									<Link
										href={`/shop?category_id=${category?.id}`}
										className="text-gray-300 hover:text-white transition-colors duration-200"
									>
										{category.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Right Column - Contact Info */}
					<div className="space-y-6">
						<h3 className="text-xl font-bold">Contact Info</h3>
						<ul className="space-y-4">
							{settings?.cms?.footer_contact_address_one && (
								<li className="flex items-start space-x-3">
									<MapPin className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
									<span className="text-gray-300">
										{settings.cms.footer_contact_address_one}
									</span>
								</li>
							)}
							{settings?.cms?.footer_contact_number_one && (
								<li className="flex items-start space-x-3">
									<Phone className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
									<span className="text-gray-300">
										{settings.cms.footer_contact_number_one}
									</span>
								</li>
							)}
							{settings?.cms?.footer_contact_address_two && (
								<li className="flex items-start space-x-3">
									<MapPin className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
									<span className="text-gray-300">
										{settings.cms.footer_contact_address_two}
									</span>
								</li>
							)}
							{settings?.cms?.footer_contact_number_two && (
								<li className="flex items-start space-x-3">
									<Phone className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
									<span className="text-gray-300">
										{settings.cms.footer_contact_number_two}
									</span>
								</li>
							)}
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
							© {new Date().getFullYear()}{' '}
							{settings?.cms?.footer_copyright_text || 'All rights reserved'}{' '}
							{settings?.cms?.app_name && (
								<span className="font-semibold">{settings.cms.app_name}</span>
							)}
						</div>

						{/* Payment Methods */}
						{settings?.cms?.footer_payment_methods && (
							<div className="flex items-center space-x-4">
								<span className="text-gray-300 text-sm mr-4">
									Payment Methods:
								</span>
								<Image
									src={imageFormat(settings.cms.footer_payment_methods)}
									alt="Payment methods"
									width={1000}
									height={1000}
									className="h-8 w-auto rounded"
									loading="lazy"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</footer>
	);
}
