import { getApiDataWithSubdomain, imageFormat } from '@/lib';
import { socialIcons } from '@/lib/icon/social-icon';
import { iBrand } from '@/store/features/admin/brand';
import { iCategory } from '@/store/features/admin/category';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MoveToTop } from './ctx/move-to-top';

export default async function Footer03() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms',
	);

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
		<>
			<MotionFadeIn>
				<div className="bg-primary3/10 py-10 md:py-14 lg:py-16 2xl:py-24">
					<div className="max-w-[1425px] mx-auto  sp-60 px-sp flex flex-wrap justify-center items-center grid-cols-4 gap-6">
						{settings?.content_services?.map((item) => (
							<div
								key={item.title}
								className="flex flex-col items-center justify-center border border-primary3/25 hover:border-primary3 transition-all rounded-lg p-2 lg:p-7"
							>
								<Image
									src={imageFormat(item.icon || null)}
									alt="image"
									width={1000}
									height={1000}
									className="w-10 lg:w-20 h-10 lg:h-20 object-cover block mb-2"
								/>
								<p className=" fs-24 font-montserrat font-semibold text-center">
									{item.title}
								</p>
							</div>
						))}
					</div>
				</div>
			</MotionFadeIn>

			<MotionFadeIn>
				<footer className="bg-primary3/20 text-gray-800">
					{/* Main Footer Content */}
					<div className="max-w-[1340px] mx-auto px-5  lg:px-8 py-10 md:py-14 lg:py-16 2xl:py-24">
						<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-10 gap-8">
							{/* Leftmost Section - Logo and About */}
							<div className="space-y-6  sm:col-span-3 lg:col-span-4 md:pr-20">
								{/* Logo */}
								<div className="flex  flex-col">
									<img
										src={imageFormat(settings?.cms?.footer_logo || null)}
										alt="image"
										width={200}
										height={100}
										className="w-fit h-full object-contain block max-h-[56px]"
									/>
								</div>

								{/* Description */}
								{settings?.cms.footer_description && (
									<p className="text-black/75 leading-relaxed text-sm">
										{settings?.cms.footer_description}
									</p>
								)}

								{/* Social Media Icons */}
								<div className="flex gap-1 flex-wrap ">
									{socialLinks?.map((social) => {
										const url =
											settings?.cms?.[social.key as keyof typeof settings.cms];

										if (!url) return null;

										return (
											<Link
												key={social.key}
												href={url as string}
												className="w-8 h-8  rounded-full flex items-center justify-center  transition-all duration-200"
												aria-label={social.label}
											>
												<Image
													src={social.icon}
													width={1000}
													height={1000}
													alt={social.label}
													className="w-5 h-5 object-contain hover:scale-110 transition-all"
												/>
											</Link>
										);
									})}
								</div>
							</div>

							{/* Middle-Left Section - Category */}
							<div className="space-y-2 col-span-1 lg:col-span-2">
								<h3 className="text-base font-montserrat font-semibold text-black">
									CATEGORY
								</h3>
								<ul className="space-y-2">
									{categories?.slice(0, 5).map((category, index) => (
										<li key={index}>
											<Link
												href={`/shop?category_id=${category?.id}`}
												className="text-black/85 hover:text-gray-700 transition-colors duration-200 text-sm"
											>
												{category.name}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* Middle-Right Section - Brands */}
							<div className="space-y-2 col-span-1 lg:col-span-2">
								<h3 className="text-base font-montserrat font-semibold text-black">
									BRANDS
								</h3>
								<ul className="space-y-2">
									{brands?.slice(0, 5).map((brand, index) => (
										<li key={index}>
											<Link
												href={'#'}
												className="text-black/85 hover:text-gray-700 transition-colors duration-200 text-sm"
											>
												{brand.name}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* Rightmost Section - Stores */}
							<div className="space-y-2 col-span-1 lg:col-span-2">
								<h3 className="text-base font-montserrat font-semibold text-black">
									CONTACT US
								</h3>
								<ul className="space-y-2">
									{settings?.cms.footer_contact_number_one && (
										<li className="flex items-center gap-2">
											<Phone className="size-5 inline-flex" />
											<a
												href={`tel:${settings?.cms.footer_contact_number_one}`}
											>
												{settings?.cms.footer_contact_number_one}
											</a>
										</li>
									)}
									{settings?.cms.footer_contact_address_one && (
										<li className="flex items-center gap-2  ">
											<MapPin className="size-5 inline-flex" />
											<span>{settings?.cms.footer_contact_address_one}</span>
										</li>
									)}

									{settings?.cms.footer_contact_number_two && (
										<li className="flex items-center gap-2 mt-6">
											<Phone className="size-5 inline-flex" />
											<a
												href={`tel:${settings?.cms.footer_contact_number_two}`}
											>
												{settings?.cms.footer_contact_number_two}
											</a>
										</li>
									)}
									{settings?.cms.footer_contact_address_two && (
										<li className="flex items-center gap-2">
											<MapPin className="size-5 inline-flex" />
											<span>{settings?.cms.footer_contact_address_two}</span>
										</li>
									)}
								</ul>
							</div>
						</div>
					</div>

					{/* Bottom Section - Copyright and Payment Methods */}
					<div className="bg-primary3 py-4">
						<div className="max-w-[1340px] mx-auto px-5  lg:px-8">
							<div className="flex flex-col lg:flex-row justify-between items-center gap-1 lg:gap-4">
								{/* Copyright */}
								<div className="text-white/80 text-sm text-center">
									<span className="text-white ">
										{settings?.cms?.footer_copyright_text}
									</span>{' '}
									<span className="text-white font-semibold">
										{settings?.cms?.app_name}
									</span>
								</div>
								<div>
									<Image
										src={imageFormat(
											settings?.cms?.footer_payment_methods || null,
										)}
										alt={settings?.cms?.footer_payment_methods || ''}
										width={1000}
										height={1000}
										className="block h-[24px] w-full object-contain"
									/>
								</div>
								<div>
									<MoveToTop />
								</div>
							</div>
						</div>
					</div>
				</footer>
			</MotionFadeIn>
		</>
	);
}
