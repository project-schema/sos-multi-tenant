'use client';

import { imageFormat } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Link from 'next/link';

export function PromoBanner({
	settings,
}: {
	settings: iTenantFrontend | null;
}) {
	const images = [
		{
			src: imageFormat(settings?.cms?.two_column_banner_1 ?? null),
			href: settings?.cms?.two_column_banner_1_url ?? '',
		},
		{
			src: imageFormat(settings?.cms?.two_column_banner_2 ?? null),
			href: settings?.cms?.two_column_banner_2_url ?? '',
		},
	];
	return (
		<div
			className={`grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 2 justify-between max-w-[1720px] mx-auto px-4 lg:px-8 `}
		>
			{images.map((image, index) => (
				<Link href={image.href} className="block w-full h-full max-h-[400px]">
					<img
						key={index}
						src={image.src}
						alt={`Promo banner ${index + 1}`}
						width={1000}
						height={1000}
						className="w-full h-full object-cover"
					/>
				</Link>
			))}
		</div>
	);
}
