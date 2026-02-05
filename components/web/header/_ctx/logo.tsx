import { cn, imageFormat } from '@/lib';
import Link from 'next/link';

export function Logo({
	logo,
	className,
}: {
	logo: string;
	className?: string;
}) {
	return (
		<Link
			href="/"
			className={cn(
				'flex items-center space-x-2 flex-shrink-0 max-w-max h-14',
				className
			)}
		>
			<img
				src={imageFormat(logo ?? null)}
				alt="logo"
				className="w-full h-full"
			/>
		</Link>
	);
}
