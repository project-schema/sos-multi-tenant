'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
	useFrontendBrandsQuery,
	useFrontendCategoriesQuery,
	useFrontendSubcategoriesQuery,
} from '@/store/features/frontend/product/api-slice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function CommonShopSidebar() {
	const { data: categories } = useFrontendCategoriesQuery(undefined);
	const { data: subcategories } = useFrontendSubcategoriesQuery(undefined);
	const { data: brands } = useFrontendBrandsQuery(undefined);

	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const [minPrice, setMinPrice] = useState(searchParams.get('min_price') ?? '');
	const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') ?? '');
	const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(
		() => {
			const param = searchParams.get('category_id');
			if (!param) return [];
			return param
				.split(',')
				.map((id) => Number(id))
				.filter((id) => !Number.isNaN(id));
		}
	);

	const [selectedColorId, setSelectedColorId] = useState<number | null>(
		searchParams.get('color_id') ? Number(searchParams.get('color_id')) : null
	);
	const [selectedSizeId, setSelectedSizeId] = useState<number | null>(
		searchParams.get('size_id') ? Number(searchParams.get('size_id')) : null
	);

	const updateUrl = useCallback(
		(next: {
			categoryIds?: number[];
			minPrice?: string;
			maxPrice?: string;
			colorId?: number | null;
			sizeId?: number | null;
		}) => {
			const params = new URLSearchParams(searchParams.toString());

			if (next.categoryIds) {
				if (next.categoryIds.length) {
					params.set('category_id', next.categoryIds.join(','));
				} else {
					params.delete('category_id');
				}
			}

			if (typeof next.minPrice === 'string') {
				if (next.minPrice) {
					params.set('min_price', next.minPrice);
				} else {
					params.delete('min_price');
				}
			}

			if (typeof next.maxPrice === 'string') {
				if (next.maxPrice) {
					params.set('max_price', next.maxPrice);
				} else {
					params.delete('max_price');
				}
			}

			if ('colorId' in next) {
				if (next.colorId) {
					params.set('color_id', String(next.colorId));
				} else {
					params.delete('color_id');
				}
			}

			if ('sizeId' in next) {
				if (next.sizeId) {
					params.set('size_id', String(next.sizeId));
				} else {
					params.delete('size_id');
				}
			}

			router.push(`${pathname}?${params.toString()}`);
		},
		[pathname, router, searchParams]
	);

	const handleCategoryToggle = (id: number) => {
		const exists = selectedCategoryIds.includes(id);
		const updated = exists
			? selectedCategoryIds.filter((cid) => cid !== id)
			: [...selectedCategoryIds, id];

		setSelectedCategoryIds(updated);
		updateUrl({ categoryIds: updated });
	};

	const handleColorSelect = (id: number) => {
		const next = selectedColorId === id ? null : id;
		setSelectedColorId(next);
		updateUrl({ colorId: next });
	};

	const handleSizeSelect = (id: number) => {
		const next = selectedSizeId === id ? null : id;
		setSelectedSizeId(next);
		updateUrl({ sizeId: next });
	};

	return (
		<aside className="space-y-6">
			<div>
				<h3 className="mb-3 font-semibold">Category</h3>
				<ul className="space-y-2 text-sm">
					{categories?.map((category) => (
						<li key={category.id} className="flex items-center gap-2">
							<Checkbox
								className="size-5"
								checked={selectedCategoryIds.includes(category.id)}
								onCheckedChange={() => handleCategoryToggle(category.id)}
							/>
							<p className="flex items-center gap-2">
								{category.name}
								<span className="text-gray-500">{categories?.length}</span>
							</p>
						</li>
					))}
				</ul>
			</div>

			<div>
				<h3 className="mb-3 font-semibold">Price</h3>
				<div className="grid grid-cols-2 gap-3">
					<input
						className="rounded border p-2 text-sm"
						placeholder="Min price"
						type="number"
						value={minPrice}
						onChange={(e) => {
							const value = e.target.value;
							setMinPrice(value);
							updateUrl({ minPrice: value, maxPrice });
						}}
					/>
					<input
						className="rounded border p-2 text-sm"
						placeholder="Max price"
						type="number"
						value={maxPrice}
						onChange={(e) => {
							const value = e.target.value;
							setMaxPrice(value);
							updateUrl({ minPrice, maxPrice: value });
						}}
					/>
				</div>
			</div>

			<div>
				<h3 className="mb-3 font-semibold">Size</h3>
				<div className="flex flex-wrap gap-2">
					{['S', 'M', 'L', 'XL'].map((s, index) => {
						const id = index + 1; // map to numeric size_id for API
						const active = selectedSizeId === id;
						return (
							<button
								key={s}
								onClick={() => handleSizeSelect(id)}
								className={`rounded border px-3 py-1 text-sm hover:bg-gray-50 ${
									active ? 'border-amber-600 bg-amber-50 text-amber-700' : ''
								}`}
							>
								{s}
							</button>
						);
					})}
				</div>
			</div>

			<div>
				<h3 className="mb-3 font-semibold">Color</h3>
				<div className="flex items-center gap-3">
					{['#111827', '#DC2626', '#2563EB', '#10B981', '#F59E0B'].map(
						(c, index) => {
							const id = index + 1; // map to numeric color_id for API
							const active = selectedColorId === id;
							return (
								<button
									key={c}
									onClick={() => handleColorSelect(id)}
									className={`h-6 w-6 rounded-full border ${
										active ? 'ring-2 ring-amber-500 ring-offset-2' : ''
									}`}
									style={{ background: c }}
									aria-label={c}
								/>
							);
						}
					)}
				</div>
			</div>
		</aside>
	);
}
