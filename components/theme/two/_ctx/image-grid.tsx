'use client';

import { imageFormat } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Link from 'next/link';

export function ImageGrid({ settings }: { settings: iTenantFrontend | null }) {
	const images = [
		{
			image: imageFormat(settings?.cms?.three_column_banner_1 ?? null),
			url: settings?.cms?.three_column_banner_1_url ?? '',
		},
		{
			image: imageFormat(settings?.cms?.three_column_banner_2 ?? null),
			url: settings?.cms?.three_column_banner_2_url ?? '',
		},
		{
			image: imageFormat(settings?.cms?.three_column_banner_3 ?? null),
			url: settings?.cms?.three_column_banner_3_url ?? '',
		},
	];
	return (
		<div
			className={`grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 max-w-[1720px] mx-auto px-4 lg:px-8 `}
		>
			{images.map((image, index) => (
				<Link href={image.url} className="block w-full h-full max-h-[300px]">
					<img
						key={index}
						src={image.image}
						alt={`Image ${index + 1}`}
						width={1000}
						height={1000}
						className="w-full h-full object-cover"
					/>
				</Link>
			))}
		</div>
	);
}
