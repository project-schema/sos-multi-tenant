'use client';

import Image from 'next/image';

interface PromoBannerProps {
	images: { src: string; alt: string }[];
	className?: string;
}

export function PromoBanner({ images, className }: PromoBannerProps) {
	return (
		<div
			className={`grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 2 justify-between max-w-[1720px] mx-auto px-4 lg:px-8 ${className}`}
		>
			{images.map((image, index) => (
				<Image
					key={index}
					src={image.src}
					alt={image.alt}
					width={1000}
					height={1000}
					className="w-full h-full object-cover"
				/>
			))}
		</div>
	);
}
