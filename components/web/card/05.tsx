import Image from 'next/image';

export default function Card05() {
	return (
		<div className="relative aspect-[16/5] w-full overflow-hidden rounded-xl">
			<Image
				src="https://i.ibb.co.com/gZvXSq2t/ads-3.png"
				alt="EID Specials & Discounts"
				fill
				className="object-cover"
				priority
				sizes="(min-width: 1024px) 640px, 100vw"
			/>
			<div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
		</div>
	);
}
