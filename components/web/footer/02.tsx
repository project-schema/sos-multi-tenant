import { getApiDataWithSubdomain, imageFormat } from '@/lib';
import { socialIcons } from '@/lib/icon/social-icon';
import { iBrand } from '@/store/features/admin/brand';
import { iCategory } from '@/store/features/admin/category';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import Image from 'next/image';
import Link from 'next/link';

export default async function Footer02() {
	const settings = await getApiDataWithSubdomain<{
		cms: iSystem;
	}>('/tenant-frontend/cms');
	const categories = await getApiDataWithSubdomain<iCategory[]>(
		'/tenant-frontend/categories',
	);
	const brands = await getApiDataWithSubdomain<iBrand[]>(
		'/tenant-frontend/brands',
	);

	const socialLinks = [
		{
			key: 'fb_url',
			label: 'Facebook',
			icon: socialIcons.fb,
		},
		{
			key: 'x_url',
			label: 'X (Twitter)',
			icon: socialIcons.x,
		},
		{
			key: 'instagram_url',
			label: 'Instagram',
			icon: socialIcons.ins,
		},
		{
			key: 'tiktok_url',
			label: 'TikTok',
			icon: socialIcons.tiktok,
		},
		{
			key: 'youtube_url',
			label: 'YouTube',
			icon: socialIcons.youtube,
		},
		{
			key: 'telegram_url',
			label: 'Telegram',
			icon: socialIcons.telegram,
		},
		{
			key: 'whatsapp_url',
			label: 'WhatsApp',
			icon: socialIcons.whatsAPP,
		},
	];
	return (
		<footer className="bg-gray-100 text-gray-800 mt-24">
			{/* Main Footer Content */}
			<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-8">
					{/* Leftmost Section - Logo and About */}
					<div className="space-y-6 lg:col-span-4 lg:mr-10 2xl:mr-24">
						{/* Logo */}
						<div className="h-[34px] flex space-x-2">
							<img
								src={imageFormat(settings?.cms?.footer_logo ?? null)}
								alt={settings?.cms?.footer_logo ?? ''}
								className="  h-full object-contain"
							/>
						</div>

						{/* Description */}
						<p className="text-gray-500 leading-relaxed text-sm">
							{settings?.cms?.footer_description ?? ''}
						</p>

						{/* Social Media Icons */}
						<div className="flex space-x-3">
							{socialLinks?.map((social) => {
								const url = settings?.cms?.[social.key as keyof iSystem];

								if (!url) return null;

								return (
									<Link
										key={social.key}
										href={url as string}
										className="w-10 h-10 bg-white border border-orange-500/10 rounded-full flex items-center justify-center hover:bg-orange-500/5 transition-all duration-200"
										aria-label={social.label}
									>
										<Image
											src={social.icon}
											width={1000}
											height={1000}
											alt={social.label}
											className="w-6 h-6"
										/>
									</Link>
								);
							})}
						</div>
					</div>

					{/* Middle-Left Section - Category */}
					<div className="space-y-4 lg:col-span-2">
						<h3 className="text-lg font-bold text-black">Category</h3>
						<ul className="space-y-2">
							{categories?.slice(0, 5).map((category, index) => (
								<li key={index}>
									<Link
										href={`/shop?category_id=${category?.id}`}
										className="text-gray-500 hover:text-orange-500 transition-colors duration-200 text-sm"
									>
										{category.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Middle-Right Section - Brands */}
					<div className="space-y-4 lg:col-span-2">
						<h3 className="text-lg font-bold text-black">Brands</h3>
						<ul className="space-y-2">
							{brands?.slice(0, 5).map((brand, index) => (
								<li key={index}>
									<Link
										href={'#'}
										className="text-gray-500 hover:text-orange-500 transition-colors duration-200 text-sm"
									>
										{brand.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Rightmost Section - Stores */}
					<div className="space-y-4 lg:col-span-2">
						<h3 className="text-lg font-bold text-black">Stores</h3>
						<div className="space-y-4">
							<div className="space-y-2">
								<h4 className="font-bold text-black text-sm">Store One</h4>
								<div>
									<p className="text-gray-500 text-sm leading-relaxed">
										{settings?.cms?.footer_contact_address_one}
									</p>
									<p className="text-gray-500 text-sm leading-relaxed">
										{settings?.cms?.footer_contact_number_one}
									</p>
								</div>
							</div>
							<div className="space-y-2">
								<h4 className="font-bold text-black text-sm">Store Two</h4>
								<div>
									<p className="text-gray-500 text-sm leading-relaxed">
										{settings?.cms?.footer_contact_address_two}
									</p>
									<p className="text-gray-500 text-sm leading-relaxed">
										{settings?.cms?.footer_contact_number_two}
									</p>
								</div>
							</div>
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
							{settings?.cms?.footer_copyright_text ?? ''}{' '}
							<span className="text-orange-500 font-semibold">
								{settings?.cms?.app_name ?? ''}
							</span>
						</div>

						{/* Payment Methods */}
						<div className="flex items-center space-x-2 flex-wrap justify-center">
							<div className="relative max-w-5xl">
								<img
									src={imageFormat(
										settings?.cms?.footer_payment_methods || null,
									)}
									alt={'payment logo'}
									className="h-8 w-auto object-contain"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
