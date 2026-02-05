import { imageFormat } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';

export default function Card05({ settings }: { settings: iTenantFrontend }) {
	return (
		<div className="relative aspect-[16/5] w-full overflow-hidden rounded-xl">
			<img
				src={imageFormat(settings?.cms?.three_column_banner_1 ?? null)}
				alt={settings?.cms?.three_column_banner_1 ?? ''}
				className="object-cover w-full h-full"
			/>
			<div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
		</div>
	);
}
