import { env, getApiDataWithSubdomain, imageFormat } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { ArrowUp, Facebook, Instagram, Music, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Footer03() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);

	return (
		<>
			<div className="bg-[#F6F3E9] py-24">
				<div className="max-w-[1425px] mx-auto  sp-60 px-sp grid grid-cols-4 gap-6">
					{[
						{
							title: '24/7 Support',
							icon: 'https://i.ibb.co.com/cSm3rH3D/icon-box-1.png',
						},
						{
							title: 'Secure Payment',
							icon: 'https://i.ibb.co.com/Jj5HPMtN/icon-box-2.png',
						},
						{
							title: '30 Days Return',
							icon: 'https://i.ibb.co.com/jkJ6sVPY/icon-box-3.png',
						},
						{
							title: 'High quality',
							icon: 'https://i.ibb.co.com/rG8vx9cq/icon-box.png',
						},
					].map((item) => (
						<div
							key={item.title}
							className="flex flex-col items-center justify-center border border-primary3/25 rounded-lg p-7"
						>
							<Image
								src={item.icon || env.placeholderImage}
								alt="image"
								width={80}
								height={80}
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
								CATALOG
							</h3>
							<ul className="space-y-2">
								{[
									'Necklaces',
									'hoodies',
									'Jewelry Box',
									't-shirt',
									'jacket',
								].map((category, index) => (
									<li key={index}>
										<Link
											href={'#'}
											className="text-black/85 hover:text-gray-700 transition-colors duration-200 text-sm"
										>
											{category}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Middle-Right Section - Brands */}
						<div className="space-y-4">
							<h3 className="text-base font-montserrat font-semibold text-black">
								ABOUT US
							</h3>
							<ul className="space-y-2">
								{[
									'Our Producers',
									'Sitemap',
									'FAQ',
									'About Us',
									'Terms & Conditions',
								].map((item, index) => (
									<li key={index}>
										<Link
											href={'#'}
											className="text-black/85 hover:text-gray-700 transition-colors duration-200 text-sm"
										>
											{item}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Rightmost Section - Stores */}
						<div className="space-y-4">
							<h3 className="text-base font-montserrat font-semibold text-black">
								CUSTOMER SERVICES
							</h3>
							<ul className="space-y-2">
								{[
									'Contact Us',
									'Track Your Order',
									'Product Care & Repair',
									'Book an Appointment',
									'Shipping & Returns',
								].map((brand, index) => (
									<li key={index}>
										<Link
											href={'#'}
											className="text-black/85 hover:text-gray-700 transition-colors duration-200 text-sm"
										>
											{brand}
										</Link>
									</li>
								))}
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
								©2025 Copywrite Belongs to{' '}
								<span className="text-white font-semibold">SOS Comerz</span>
							</div>
							<div>
								<Image
									src="https://i.ibb.co.com/N6n264pY/icons-payment-1.png"
									alt="image"
									width={1000}
									height={1000}
									className="block  h-[24px] w-full"
								/>
							</div>
							<div>
								<Link
									href="#"
									className="flex text-white/85 items-center gap-1 py-3"
								>
									<span>Scroll to Top</span>
									<ArrowUp className="size-5 inline-flex" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
