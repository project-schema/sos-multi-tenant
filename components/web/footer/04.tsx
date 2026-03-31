import { env, getApiDataWithSubdomain, imageFormat } from '@/lib';
import { webSocialLinks } from '@/lib/icon/social-icon';
import { iCategory } from '@/store/features/admin/category';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iService } from '@/store/features/vendor/cms/home-page';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import { MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Footer04() {
	const settings = await getApiDataWithSubdomain<{
		cms: iSystem;
		content_services: iService[];
	}>('/tenant-frontend/cms');
	const categories = await getApiDataWithSubdomain<iCategory[]>(
		'/tenant-frontend/categories',
	);

	return (
		<MotionFadeIn>
			<footer className="">
				{/* Features Section */}
				<div className="border-b border-gray-700">
					<div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
						<div className="flex flex-wrap 2xl:justify-between justify-center items-center gap-6">
							{settings?.content_services?.map((feature, index) => (
								<div
									key={index}
									className="flex flex-col items-center text-center space-y-3"
								>
									<div className="w-12 h-12 bg-primary3 bg-opacity-10 rounded-full flex items-center justify-center">
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
										<p className="text-gray-600 text-sm">
											{feature.description || ''}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Main Footer Content */}
				<div className="bg-gray-900 text-white">
					<div className=" max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-12  gap-8">
							{/* Left Column - Branding and Social Media */}
							<div className="space-y-6 md:col-span-2 xl:col-span-1 2xl:col-span-6 2xl:pr-20">
								{/* Logo */}
								<div className="h-[34px] flex items-center">
									{settings?.cms?.footer_logo ? (
										<img
											// src={imageFormat(settings.cms.footer_logo)}
											src={
												settings?.cms?.footer_logo
													? `${env.baseAPI}/${settings.cms.footer_logo}`
													: '/logo-white.png'
											}
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
								<div className="flex gap-4 flex-wrap">
									{webSocialLinks?.map((social) => {
										const url = settings?.cms?.[social.key as keyof iSystem];

										if (!url) return null;

										return (
											<Link
												key={social.key}
												href={url as string}
												className="w-10 h-10 bg-white border border-orange-500/10 rounded-md flex items-center justify-center hover:bg-orange-500/5 transition-all duration-200"
												aria-label={social.label}
												prefetch={false}
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

							{/* Middle Column - Categories */}
							<div className="space-y-6 2xl:col-span-3">
								<h3 className="text-xl font-bold">Categories</h3>
								<ul className="space-y-3">
									{categories && categories?.length <= 0 && (
										<li className="text-gray-300 hover:text-white transition-colors duration-200">
											No categories found
										</li>
									)}
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
							<div className="space-y-6 2xl:col-span-3">
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
											<a
												href={`tel:${settings.cms.footer_contact_number_one}`}
												className="text-gray-300"
											>
												{settings.cms.footer_contact_number_one}
											</a>
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
											<a
												href={`tel:${settings.cms.footer_contact_number_two}`}
												className="text-gray-300"
											>
												{settings.cms.footer_contact_number_two}
											</a>
										</li>
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section - Copyright and Payment Methods */}
				<div className="bg-gray-900 text-white">
					<div className=" border-t border-gray-700">
						<div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
							<div className="flex flex-col gap-3 xl:flex-row justify-between items-center space-y-2 xl:space-y-0">
								{/* Copyright */}
								<div className="text-gray-300 text-sm text-center xl:text-left">
									{settings?.cms?.footer_copyright_text ||
										'All rights reserved'}{' '}
									{settings?.cms?.app_name && (
										<span className="font-semibold">
											{settings.cms.app_name}
										</span>
									)}
								</div>

								{/* Payment Methods */}
								{settings?.cms?.footer_payment_methods && (
									<div className="max-w-auto">
										<Image
											src={imageFormat(settings.cms.footer_payment_methods)}
											alt="Payment methods"
											width={1000}
											height={1000}
											className="h-8 w-auto object-contain"
											loading="lazy"
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</footer>
		</MotionFadeIn>
	);
}
