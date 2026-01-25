import { imageFormat } from '@/lib/img';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Link from 'next/link';

export default function Card04({ settings }: { settings: iTenantFrontend }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div className="relative h-[300px] w-full overflow-hidden rounded-xl">
				<Link href={settings?.cms?.two_column_banner_1_url ?? ''}>
					<img
						src={imageFormat(settings?.cms?.two_column_banner_1 ?? null)}
						alt={settings?.cms?.two_column_banner_1 ?? ''}
						className="object-cover"
					/>
				</Link>
				<div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
			</div>

			<div className="relative h-[300px] w-full overflow-hidden rounded-xl">
				<Link href={settings?.cms?.two_column_banner_2_url ?? ''}>
					<img
						src={imageFormat(settings?.cms?.two_column_banner_2 ?? null)}
						alt={settings?.cms?.two_column_banner_2 ?? ''}
						className="object-cover"
					/>
				</Link>
				<div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
			</div>
		</div>
	);
}
