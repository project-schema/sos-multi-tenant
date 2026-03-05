import { imageFormat } from '@/lib';
import { iCategory } from '@/store/features/admin/category';
import Link from 'next/link';

export default function Card13({ category }: { category: iCategory }) {
	return (
		<Link
			href={`/shop?category_id=${category.id}`}
			className="group relative block overflow-hidden rounded-md
			h-[260px] sm:h-[320px] md:h-[420px] lg:h-[555px]"
		>
			{/* Image */}
			<img
				src={imageFormat(category.image ?? '')}
				alt={category.name ?? ''}
				className="object-cover w-full h-[calc(100%-80px)] sm:h-[calc(100%-90px)]
				group-hover:h-full rounded-md group-hover:rounded-none
				transition-all duration-300 ease-in-out"
			/>

			{/* Gradient overlay */}
			<div
				className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
				opacity-0 group-hover:opacity-100 transition-all duration-300"
			/>

			{/* Center text on hover */}
			<p
				className="absolute bottom-6 left-1/2 -translate-x-1/2
				text-lg sm:text-xl font-semibold text-white text-center
				opacity-0 scale-90
				group-hover:opacity-100 group-hover:scale-100
				transition-all duration-300"
			>
				{category.name ?? ''}
			</p>

			{/* Default content */}
			<div
				className="absolute bottom-3 left-3 right-3 space-y-1
				opacity-100 scale-100
				group-hover:opacity-0 group-hover:scale-90
				transition-all duration-300"
			>
				<h3 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-1">
					{category.name ?? ''}
				</h3>
				<p className="text-sm sm:text-base text-gray-600 line-clamp-2">
					{category.description}
				</p>
			</div>
		</Link>
	);
}
