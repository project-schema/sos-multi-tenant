'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { env, imageFormat, sign } from '@/lib';
import { iCategory } from '@/store/features/admin/category';
import { useFrontendSearchQuery } from '@/store/features/frontend/product/api-slice';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CategoriesDropdown } from './categories-dropdown';

interface SearchBarProps {
	variant?: 'desktop' | 'mobile';
	className?: string;
	categories: iCategory[];
	cms: iSystem | null;
}

export function SearchBar({
	variant = 'desktop',
	className,
	cms,
	categories,
}: SearchBarProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null
	);
	const debouncedSearch = useDebounce(searchTerm, 500);

	const { data: products = [], isFetching } = useFrontendSearchQuery(
		{
			search: debouncedSearch,
			category_id: selectedCategoryId ? String(selectedCategoryId) : '',
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
								<div className="flex items-center gap-2">
									<img
										className="flex w-10 h-10 rounded-md object-cover"
										src={imageFormat(product?.image)}
										alt="product image"
									/>
									<div>
										<span className="line-clamp-1 text-gray-700">
											{product.name}
										</span>
										<span
											className={`ml-auto text-xs font-medium  `}
											style={{ color: cms?.color_primary || env.color_primary }}
										>
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

	if (variant === 'mobile') {
		return (
			<div className={`relative w-full ${className}`}>
				<div className="flex w-full overflow-hidden rounded-md border border-gray-300">
					<input
						type="text"
						value={searchTerm}
						onChange={handleChange}
						placeholder="Search for products"
						className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
					/>
					<button
						className={`flex h-10 w-10 items-center justify-center   text-white transition-colors hover:bg-${
							cms?.color_secondary || env.color_secondary
						}`}
						style={{ backgroundColor: cms?.color_primary || env.color_primary }}
					>
						<Search className="h-5 w-5" />
					</button>
				</div>
				{renderSearchResults()}
			</div>
		);
	}

	return (
		<div className={`relative w-full ${className}`}>
			<div
				className="flex w-full overflow-hidden rounded-md border  "
				style={{ borderColor: cms?.color_primary || env.color_primary }}
			>
				<CategoriesDropdown
					categories={categories}
					selectedCategoryId={selectedCategoryId}
					onCategorySelect={setSelectedCategoryId}
					cms={cms ?? null}
				/>
				<input
					type="text"
					value={searchTerm}
					onChange={handleChange}
					placeholder="Search for products"
					className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
				/>
				<button
					className={`m-1 flex h-10 w-10 items-center justify-center rounded   text-white transition-colors hover:bg-${
						cms?.color_secondary || env.color_secondary
					}`}
					style={{ backgroundColor: cms?.color_primary || env.color_primary }}
				>
					<Search className="h-5 w-5" />
				</button>
			</div>
			{renderSearchResults()}
		</div>
	);
}
