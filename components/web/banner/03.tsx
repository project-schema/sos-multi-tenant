'use client';

import { imageFormat } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Link from 'next/link';

export default function Banner03({
	settings,
}: {
	settings: iTenantFrontend | null;
}) {
	return (
		<div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div className="grid grid-cols-1  lg:grid-cols-3 gap-4 h-[400px] md:h-[500px] lg:h-[750px] select-none">
				{/* Main Image - Full width on mobile, 2/3 on desktop */}
				<div className="col-span-1 overflow-hidden lg:col-span-2 relative h-full">
					<Link
						href={settings?.cms?.banner_1_url ?? ''}
						className="block w-full h-full relative overflow-hidden"
					>
						<img
							src={imageFormat(settings?.cms?.banner_1 ?? null)}
							alt={'image 1'}
							className="object-cover w-full h-full block"
						/>
					</Link>
				</div>

				{/* Right Images - Hidden on mobile, visible on desktop */}
				<div className="hidden lg:grid col-span-1 grid-rows-2 gap-4 h-full">
					<Link
						href={settings?.cms?.banner_2_url ?? ''}
						className="block w-full h-full relative overflow-hidden"
					>
						<img
							src={imageFormat(settings?.cms?.banner_2 ?? null)}
							alt={'image 2'}
							className="object-cover w-full h-full block"
						/>
					</Link>

					<Link
						href={settings?.cms?.banner_3_url ?? ''}
						className="block w-full h-full relative overflow-hidden"
					>
						<img
							src={imageFormat(settings?.cms?.banner_3 ?? null)}
							alt={'image 3'}
							className="object-cover w-full h-full block"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
