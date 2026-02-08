'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { imageFormat, sign } from '@/lib';
import { iCategory } from '@/store/features/admin/category';
import { useFrontendCategoriesQuery, useFrontendSearchQuery } from '@/store/features/frontend/product/api-slice';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SearchPopup1() {
	const { data: categories = [] } = useFrontendCategoriesQuery();
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);

	const { data: products = [], isFetching } = useFrontendSearchQuery(
		{
			search: debouncedSearch,
			category_id: '',
		},
		{
			skip: !debouncedSearch,
		}
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const renderSearchResults = () => {
		if (!debouncedSearch) return null;

		return (
			<div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
				{isFetching && (
					<div className="px-4 py-2 text-sm text-gray-500">Searching...</div>
				)}

				{!isFetching && products.length === 0 && (
					<div className="px-4 py-2 text-sm text-gray-500">
						No products found
					</div>
				)}

				<ul className="max-h-64 overflow-auto">
					{products.map((product) => (
						<li key={product.id}>
							<Link
								href={`/shop/${product.slug}`}
								className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
							>
								<div className="flex items-center gap-2 w-full">
									<img
										className="flex w-10 h-10 rounded-md object-cover"
										src={imageFormat(product?.image)}
										alt="product image"
									/>
									<div className="flex-1">
										<span className="line-clamp-1 text-gray-700 block">
											{product.name}
										</span>
										<span className="text-xs font-medium text-orange-500">
											{product.selling_price} {sign.tk}
										</span>
									</div>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<div className="relative w-full">
			<div className="relative">
				<input
					type="text"
					value={searchTerm}
					onChange={handleChange}
					placeholder="Search"
					className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
				/>
				<button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-1 rounded hover:bg-gray-800 transition-colors">
					<Search className="w-4 h-4" />
				</button>
			</div>
			{renderSearchResults()}
		</div>
	);
}
