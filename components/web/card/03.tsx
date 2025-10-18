import Image from 'next/image';

interface Card03Props {
	image?: string;
	title?: string;
	href?: string;
	className?: string;
}

export default function Card03({
	image = 'https://i.ibb.co.com/MyvjK6sT/product-1.png',
	title = 'T-SHIRT',
	href,
	className = '',
}: Card03Props) {
	const Wrapper = ({ children }: { children: React.ReactNode }) =>
		href ? (
			<a href={href} className="block" aria-label={title}>
				{children}
			</a>
		) : (
			<>{children}</>
		);

	return (
		<div
			className={`group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
		>
			<Wrapper>
				<div className="relative aspect-[3/4] bg-gray-100">
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
						sizes="(min-width: 1024px) 320px, (min-width: 640px) 240px, 200px"
						priority={false}
					/>

					{/* subtle border */}
					<div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-xl" />

					{/* bottom centered label */}
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2">
						<span className="px-4 py-2 rounded-md bg-white text-gray-900 text-sm font-semibold shadow-sm group-hover:bg-black group-hover:text-white transition-colors">
							{title}
						</span>
					</div>
				</div>
			</Wrapper>
		</div>
	);
}
