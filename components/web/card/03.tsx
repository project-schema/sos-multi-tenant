import { imageFormat } from '@/lib';

export default function Card03({
	category,
}: {
	category: { name: string; image: string; id: number };
}) {
	return (
		<div
			className={`group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300`}
		>
			<div className="relative aspect-[3/4] bg-gray-100">
				<img
					src={imageFormat(category.image ?? '')}
					alt={category.name ?? ''}
					className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
					sizes="(min-width: 1024px) 320px, (min-width: 640px) 240px, 200px"
				/>

				{/* subtle border */}
				<div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-xl" />

				{/* bottom centered label */}
				<div className="absolute bottom-3 left-1/2 -translate-x-1/2">
					<span className="whitespace-nowrap px-4 py-2 rounded-md bg-white text-gray-900 text-sm font-semibold shadow-sm group-hover:bg-black group-hover:text-white transition-colors">
						{category.name ?? ''}
					</span>
				</div>
			</div>
		</div>
	);
}
