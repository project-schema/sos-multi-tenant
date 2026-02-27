'use client';
import { Button } from '@/components/ui/button';
import { imageFormat, Motion } from '@/lib';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Banner04({ cms }: { cms?: iSystem | null }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!cms?.banner_1) return null;

	return (
		<div className="w-full py-12 md:py-[72px] bg-primary3/10 relative overflow-hidden">
			{/* Decorative shapes - hidden on mobile */}
			{mounted && (
				<>
					<Motion>
						<img
							className="absolute left-0 bottom-1/4 hidden md:block"
							src="/shape1.svg"
							alt="shape"
						/>
					</Motion>
					<Motion>
						<img
							className="absolute right-0 bottom-1/4 hidden md:block"
							src="/shape2.svg"
							alt="shape"
						/>
					</Motion>
				</>
			)}

			<div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col-reverse md:grid md:grid-cols-12 md:gap-8 lg:gap-24 items-center">
					{/* Content Section */}
					<div className="space-y-4 md:space-y-7 col-span-12 md:col-span-7 text-center md:text-left">
						{/* Title */}
						<motion.h1
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, ease: 'easeOut' }}
							className="text-3xl sm:text-4xl line-clamp-2 md:text-5xl lg:text-[64px] font-bold text-primary3 capitalize font-kalnia leading-tight"
						>
							{cms?.banner_title}
						</motion.h1>

						{/* Description */}
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
							className="line-clamp-3 text-sm sm:text-base md:text-lg text-gray-700 font-montserrat max-w-2xl mx-auto md:mx-0"
						>
							{cms?.banner_description}
						</motion.p>

						{/* Button */}
						{cms?.banner_1_url && (
							<motion.div
								initial={{ opacity: 0, y: 20, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ duration: 0.6, delay: 0.6 }}
								className="flex justify-center md:justify-start"
							>
								<Link href={cms?.banner_1_url}>
									<Button
										variant="style3"
										size="style3"
										className="text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
									>
										Shop Now
										<ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
									</Button>
								</Link>
							</motion.div>
						)}
					</div>

					{/* Image Section */}
					<div className="col-span-12 md:col-span-5 mb-8 md:mb-0 w-full">
						<motion.div
							initial={{ clipPath: 'inset(0 0 100% 0)' }}
							animate={{ clipPath: 'inset(0 0 0% 0)' }}
							transition={{ duration: 1.2, ease: 'easeInOut' }}
							className="relative z-10 rounded-ss-[80px] sm:rounded-ss-[120px] md:rounded-ss-[160px] rounded-br-[80px] sm:rounded-br-[120px] md:rounded-br-[160px] overflow-hidden"
						>
							<Link
								href={cms?.banner_1_url || '#'}
								className="relative m-2 sm:m-3 md:m-4 block"
							>
								{/* Border frame */}
								<span className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 w-full h-full bg-transparent border border-primary3 rounded-ss-[80px] sm:rounded-ss-[120px] md:rounded-ss-[160px] rounded-br-[80px] sm:rounded-br-[120px] md:rounded-br-[160px]"></span>

								{/* Image */}
								<Image
									src={imageFormat(cms?.banner_1 || null)}
									alt={cms?.banner_title || 'Banner image'}
									width={1000}
									height={1000}
									className="relative z-10 rounded-ss-[80px] sm:rounded-ss-[120px] md:rounded-ss-[160px] rounded-br-[80px] sm:rounded-br-[120px] md:rounded-br-[160px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[585px] w-full object-cover block"
								/>
							</Link>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
