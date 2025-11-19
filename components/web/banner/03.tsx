'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Banner03() {
	return (
		<div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[500px] md:h-[600px]">
				{/* Left Panel - iPhone Advertisement */}
				<div className="lg:col-span-2 relative bg-gray-100 rounded-lg overflow-hidden group">
					{/* Background Image */}
					<div className="absolute inset-0">
						<img
							src="https://i.ibb.co.com/K8q6Vcy/image-2.png"
							alt="iPhone 17 Pro Max"
							className="w-full h-full object-cover"
							loading="lazy"
						/>
					</div>

					{/* Content Overlay */}
					<div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-8 lg:px-12">
						{/* Large IPHONE Text (behind phones, partially obscured) */}
						<div className="absolute top-4 left-4 md:top-8 md:left-8 z-0">
							<h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-gray-400 opacity-50">
								IPHONE
							</h2>
						</div>

						{/* Text Content */}
						<div className="relative z-20 space-y-2 md:space-y-3">
							{/* Discount Text */}
							<p className="text-sm md:text-base lg:text-lg font-normal text-black">
								Save Up To 20% Off
							</p>

							{/* Product Name */}
							<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight">
								17 Pro Max
							</h1>

							{/* Shop Now Button */}
							<Link
								href="/shop/iphone-17-pro-max"
								className="inline-flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors mt-4 md:mt-6 text-sm md:text-base"
							>
								<span>Shop Now</span>
								<ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
							</Link>
						</div>
					</div>
				</div>

				{/* Right Panels Container */}
				<div className="lg:col-span-1 flex flex-col gap-4">
					{/* Top Right Panel - Bluetooth Speaker */}
					<div className="flex-1 relative bg-gray-800 rounded-lg overflow-hidden group">
						{/* Background Image */}
						<div className="absolute inset-0">
							<img
								src="https://i.ibb.co.com/nsgnh7vk/image-1.png"
								alt="Bluetooth Speaker"
								className="w-full h-full object-cover"
								loading="lazy"
							/>
						</div>

						{/* Content Overlay */}
						<div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-6">
							{/* Top Text */}
							<div className="space-y-1 md:space-y-2">
								<p className="text-white text-base md:text-lg lg:text-xl font-serif italic">
									Music Collection
								</p>
								<h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white uppercase tracking-wider">
									BLUETOOTH SPEAKER
								</h3>
							</div>

							{/* Shop Now Button */}
							<Link
								href="/shop/bluetooth-speaker"
								className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-medium hover:bg-gray-900 transition-colors w-fit text-sm md:text-base"
							>
								<span>SHOP NOW</span>
								<ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-white" />
							</Link>
						</div>
					</div>

					{/* Bottom Right Panel - Bluetooth Headphone */}
					<div className="flex-1 relative bg-slate-200 rounded-lg overflow-hidden group">
						{/* Background Image */}
						<div className="absolute inset-0">
							<img
								src="https://i.ibb.co.com/4ZxHkFmR/image-3.png"
								alt="Bluetooth Headphone"
								className="w-full h-full object-cover"
								loading="lazy"
							/>
						</div>

						{/* Content Overlay */}
						<div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-6">
							{/* Top Text */}
							<div className="space-y-1 md:space-y-2">
								<p className="text-white text-base md:text-lg lg:text-xl font-serif italic">
									Music Collection
								</p>
								<h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white uppercase tracking-wider">
									BLUETOOTH HEADPHONE
								</h3>
							</div>

							{/* Shop Now Button */}
							<Link
								href="/shop/bluetooth-headphone"
								className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors w-fit text-sm md:text-base"
							>
								<span>SHOP NOW</span>
								<ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-black" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
