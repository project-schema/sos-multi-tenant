'use client';

import { imageFormat } from '@/lib';
import { iCategory } from '@/store/features/admin/category';
import { ChevronDown, Text } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const ExtraNavClient = ({ categories }: { categories: iCategory[] }) => {
	const [openCategories, setOpenCategories] = useState(false);

	return (
		<div className="hidden lg:flex items-center gap-10 relative max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
			{/* Category Button */}
			<div className="relative">
				<button
					onClick={() => setOpenCategories((prev) => !prev)}
					className="bg-black flex justify-between items-center text-white w-[300px] h-[60px] px-3"
				>
					<span className="flex items-center gap-2">
						<Text />
						<span>All Categories</span>
					</span>

					<ChevronDown
						className={`transition-transform ${
							openCategories ? 'rotate-180' : ''
						}`}
					/>
				</button>

				{/* Absolute Dropdown */}
				{openCategories && (
					<ul className="absolute left-0 top-full z-50 w-[300px] border border-gray-300 max-h-[300px] xl:max-h-[545px] overflow-y-auto rounded-b bg-white shadow-lg">
						{categories?.map((e) => (
							<li
								key={e.id}
								className="not-last:border-b border-gray-200 px-3 py-2 hover:bg-primary/5 transition-colors cursor-pointer"
							>
								<Link
									href={`/shop?category_id=${e.id}`}
									className="flex items-center gap-3 text-sm line-clamp-1"
								>
									<Image
										src={imageFormat(e.image)}
										width={200}
										height={200}
										alt={e.name}
										className="w-12 h-12 object-cover object-center rounded"
									/>
									{e.name}
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Navigation Links */}
			<nav className="hidden md:flex items-center gap-6">
				<Link
					href="/"
					className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
				>
					Home
				</Link>
				<Link
					href="/shop"
					className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
				>
					Shop
				</Link>
				<Link
					href="/blog"
					className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
				>
					Blog
				</Link>
				<Link
					href="/contact"
					className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
				>
					Contact
				</Link>
			</nav>
		</div>
	);
};
