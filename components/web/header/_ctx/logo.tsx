import { imageFormat } from '@/lib';
import Link from 'next/link';

export function Logo({ logo }: { logo: string }) {
	return (
		<Link
			href="/"
			className="flex items-center space-x-2 flex-shrink-0 max-w-max h-14"
		>
			<img
				src={imageFormat(logo ?? null)}
				alt="logo"
				className="w-full h-full"
			/>
		</Link>
	);
}
