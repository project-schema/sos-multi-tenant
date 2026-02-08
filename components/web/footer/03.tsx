import { getApiDataWithSubdomain, imageFormat } from '@/lib';
import { iBrand } from '@/store/features/admin/brand';
import { iCategory } from '@/store/features/admin/category';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { Facebook, Instagram, Map, Music, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MoveToTop } from './ctx/move-to-top';

export default async function Footer03() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);

	const categories = await getApiDataWithSubdomain<iCategory[]>(
		'/tenant-frontend/categories'
	);
	const brands = await getApiDataWithSubdomain<iBrand[]>(
		'/tenant-frontend/brands'
	);

	return (
		<>
			<div className="bg-[#F6F3E9] py-24">
				<div className="max-w-[1425px] mx-auto  sp-60 px-sp flex flex-wrap justify-center items-center grid-cols-4   gap-6">
					{settings?.content_services?.map((item) => (
						<div
							key={item.title}
							className="flex flex-col items-center justify-center border border-primary3/25 rounded-lg p-7"
						>
							<Image
								src={imageFormat(item.icon || null)}
								alt="image"
								width={1000}
								height={1000}
								className="w-20 h-20 object-cover block mb-2"
							/>
							<p className="fs-24 font-montserrat font-semibold text-center">
								{item.title}
							</p>
						</div>
					))}
				</div>
			</div>

			<footer className="bg-[#F2E4D8] text-gray-800">
				{/* Main Footer Content */}
				<div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{/* Leftmost Section - Logo and About */}
						<div className="space-y-6">
							{/* Logo */}
							<div className="flex  flex-col">
								<img
									src={imageFormat(settings?.cms.footer_logo || null)}
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
							<div className="flex space-x-3">
								<Link
									href="https://facebook.com"
									className="size-7 text-primary3"
									aria-label="Facebook"
								>
									<Facebook className="" />
								</Link>
								<Link
									href="https://instagram.com"
									className="size-7 text-primary3"
									aria-label="Instagram"
								>
									<Instagram className="" />
								</Link>
								<Link
									href="https://tiktok.com"
									className="size-7 text-primary3"
									aria-label="TikTok"
								>
									<Music className="" />
								</Link>
								<Link
									href="https://x.com"
									className="size-7 text-primary3"
									aria-label="X (Twitter)"
								>
									<Twitter className="" />
								</Link>
							</div>
						</div>

						{/* Middle-Left Section - Category */}
						<div className="space-y-4">
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
						<div className="space-y-4">
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
						<div className="space-y-4">
							<h3 className="text-base font-montserrat font-semibold text-black">
								CONTACT US
							</h3>
							<ul className="space-y-2">
								{settings?.cms.footer_contact_number_one && (
									<li className="flex items-center gap-2">
										<Phone className="size-5 inline-flex" />
										<span>{settings?.cms.footer_contact_number_one}</span>
									</li>
								)}
								{settings?.cms.footer_contact_address_one && (
									<li className="flex items-center gap-2  ">
										<Map className="size-5 inline-flex" />
										<span>{settings?.cms.footer_contact_address_one}</span>
									</li>
								)}

								{settings?.cms.footer_contact_number_two && (
									<li className="flex items-center gap-2 mt-6">
										<Phone className="size-5 inline-flex" />
										<span>{settings?.cms.footer_contact_number_two}</span>
									</li>
								)}
								{settings?.cms.footer_contact_address_two && (
									<li className="flex items-center gap-2">
										<Map className="size-5 inline-flex" />
										<span>{settings?.cms.footer_contact_address_two}</span>
									</li>
								)}
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom Section - Copyright and Payment Methods */}
				<div className="bg-[#7d3c3f]">
					<div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
							{/* Copyright */}
							<div className="text-white/80 text-sm">
								<span className="text-white font-semibold">
									{settings?.cms?.footer_copyright_text}
								</span>
							</div>
							<div>
								<Image
									src={imageFormat(
										settings?.cms?.footer_payment_methods || null
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
		</>
	);
}
