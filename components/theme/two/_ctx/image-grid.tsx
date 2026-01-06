'use client';

import Image from 'next/image';

interface ImageGridProps {
	images: string[];
	columns?: 2 | 3 | 4;
	className?: string;
}

export function ImageGrid({ images, columns = 3, className }: ImageGridProps) {
	const gridCols = {
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4',
	};

	return (
		<div
			className={`grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 max-w-[1720px] mx-auto px-4 lg:px-8 ${className}`}
		>
			{images.map((image, index) => (
				<Image
					key={index}
					src={image}
					alt={`Image ${index + 1}`}
					width={1000}
					height={1000}
					className="w-full h-full object-cover"
				/>
			))}
		</div>
	);
}
