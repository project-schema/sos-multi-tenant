import { imageFormat } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Image from 'next/image';
import Link from 'next/link';

export default function Banner03({
	settings,
}: {
	settings: iTenantFrontend | null;
}) {
	return (
		<section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{/* Main Banner */}
				<div className="lg:col-span-2">
					<Link
						href={settings?.cms?.banner_1_url ?? '#'}
						className="block w-full overflow-hidden rounded-none"
					>
						<Image
							width={1000}
							height={1000}
							src={imageFormat(settings?.cms?.banner_1 ?? null)}
							alt="banner 1"
							className="w-full h-auto object-cover block max-w-full"
							priority
						/>
					</Link>
				</div>

				{/* Right Banners */}
				<div className="lg:col-span-1  grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4">
					<Link
						href={settings?.cms?.banner_2_url ?? '#'}
						className="block w-full overflow-hidden rounded-none"
					>
						<Image
							width={1000}
							height={1000}
							src={imageFormat(settings?.cms?.banner_2 ?? null)}
							alt="banner 2"
							priority
							className="w-full h-auto object-cover block max-w-full"
						/>
					</Link>

					<Link
						href={settings?.cms?.banner_3_url ?? '#'}
						className="block w-full overflow-hidden rounded-none"
					>
						<Image
							width={1000}
							height={1000}
							priority
							src={imageFormat(settings?.cms?.banner_3 ?? null)}
							alt="banner 3"
							className="w-full h-auto object-cover block max-w-full"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
}
