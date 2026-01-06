'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
	useFrontendBrandsQuery,
	useFrontendCategoriesQuery,
	useFrontendSubcategoriesQuery,
} from '@/store/features/frontend/product/api-slice';

export default function CommonShopSidebar() {
	const { data: categories } = useFrontendCategoriesQuery(undefined);
	const { data: subcategories } = useFrontendSubcategoriesQuery(undefined);
	const { data: brands } = useFrontendBrandsQuery(undefined);
	return (
		<aside className="space-y-6">
			<div>
				<h3 className="font-semibold mb-3">Category</h3>
				<ul className="space-y-2 text-sm">
					{categories?.map((category) => (
						<li key={category.id} className="flex items-center gap-2">
							<Checkbox className="size-5" />
							<p className="flex items-center gap-2">
								{category.name}
								<span className="text-gray-500">{categories?.length}</span>
							</p>
						</li>
					))}
				</ul>
			</div>

			<div>
				<h3 className="font-semibold mb-3">Price</h3>
				<div className="grid grid-cols-2 gap-3">
					<input className="border rounded p-2 text-sm" placeholder="From" />
					<input className="border rounded p-2 text-sm" placeholder="To" />
				</div>
			</div>

			<div>
				<h3 className="font-semibold mb-3">Size</h3>
				<div className="flex flex-wrap gap-2">
					{['S', 'M', 'L', 'XL'].map((s) => (
						<button
							key={s}
							className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
						>
							{s}
						</button>
					))}
				</div>
			</div>

			<div>
				<h3 className="font-semibold mb-3">Color</h3>
				<div className="flex items-center gap-3">
					{['#111827', '#DC2626', '#2563EB', '#10B981', '#F59E0B'].map((c) => (
						<button
							key={c}
							className="w-6 h-6 rounded-full border"
							style={{ background: c }}
							aria-label={c}
						/>
					))}
				</div>
			</div>
		</aside>
	);
}
