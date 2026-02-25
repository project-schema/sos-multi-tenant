import { imageFormat } from '@/lib';
import Link from 'next/link';

export default function Card03({
	category,
}: {
	category: { name: string; image: string; id: number };
}) {
	return (
		<div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
			<Link
				href={`/shop?category_id=${category.id}`}
				className="group relative aspect-[3/4] bg-gray-100 block"
			>
				<img
					src={imageFormat(category.image ?? '')}
					alt={category.name ?? ''}
					className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
				/>

				<div className="w-[90%] md:w-auto absolute bottom-3 left-1/2 -translate-x-1/2">
					<span className="whitespace-normal px-2 md:px-4 py-2 rounded-md bg-white text-gray-900  md:font-semibold shadow-sm transition-all duration-300 text-xs md:text-sm group-hover:bg-black group-hover:text-white line-clamp-2 text-center">
						{category.name ?? ''}
					</span>
				</div>
			</Link>
		</div>
	);
}
