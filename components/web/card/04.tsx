import Image from 'next/image';

export default function Card04() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div className="relative h-[300px] w-full overflow-hidden rounded-xl">
				<Image
					src="https://i.ibb.co.com/KjMrRDcF/ads-1.png"
					alt="EID Specials & Discounts"
					fill
					className="object-cover"
					priority
					sizes="(min-width: 1024px) 640px, 100vw"
				/>
				<div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
			</div>

			<div className="relative h-[300px] w-full overflow-hidden rounded-xl">
				<Image
					src="https://i.ibb.co.com/QFPbK7CV/ads-2.png"
					alt="Built to Move - Jeans Collection"
					fill
					className="object-cover"
					sizes="(min-width: 1024px) 640px, 100vw"
				/>
				<div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
			</div>
		</div>
	);
}
