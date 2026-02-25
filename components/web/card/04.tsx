import { imageFormat } from '@/lib/img';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Image from 'next/image';
import Link from 'next/link';

export default function Card04({ settings }: { settings: iTenantFrontend }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden rounded-xl">
				<Link
					href={settings?.cms?.two_column_banner_1_url ?? '#'}
					className="block relative w-full h-full"
				>
					<Image
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						src={imageFormat(settings?.cms?.two_column_banner_1 ?? '')}
						alt={'Banner image 1'}
						className="object-cover hover:scale-105 transition-transform duration-300"
						priority
					/>
				</Link>
				<div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-xl" />
			</div>

			<div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden rounded-xl">
				<Link
					href={settings?.cms?.two_column_banner_2_url ?? '#'}
					className="block relative w-full h-full"
				>
					<Image
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						src={imageFormat(settings?.cms?.two_column_banner_2 ?? '')}
						alt={'Banner image 2'}
						className="object-cover hover:scale-105 transition-transform duration-300"
					/>
				</Link>
				<div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-xl" />
			</div>
		</div>
	);
}
