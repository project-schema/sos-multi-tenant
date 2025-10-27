'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import style from './AllServices.style.module.css';

type Category = { id: number; name: string; slug: string; status: string };

export default function Filters({
	categories = [],
	current,
}: {
	categories: Category[];
	current?: {
		page?: string;
		category_id?: string;
		type?: string;
		search?: string;
		tags?: string;
	};
}) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const setParam = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams?.toString());
		if (value) params.set(key, value);
		else params.delete(key);
		// Reset page when filter changes
		params.delete('page');
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div className={style.filterOption}>
			<p className={style.serviceLeftFilter}>Filter:</p>

			<input
				className={style.filterByCategory}
				placeholder="Search services"
				defaultValue={current?.search || ''}
				onKeyDown={(e) => {
					if (e.key === 'Enter')
						setParam('search', (e.target as HTMLInputElement).value);
				}}
			/>

			<select
				className={style.filterBySort}
				id="sortBy"
				defaultValue={current?.type || ''}
				onChange={(e) => setParam('type', e.target.value)}
			>
				<option value="">Sort by</option>
				<option value="latest">Latest</option>
				<option value="best_selling">Best selling</option>
				<option value="avg_rating">Avg rating</option>
			</select>

			<select
				className={style.filterByCategory}
				id="categories"
				defaultValue={current?.category_id || ''}
				onChange={(e) => setParam('category_id', e.target.value)}
			>
				<option value="">Category</option>
				{categories.map((c) => (
					<option value={String(c.id)} key={c.id}>
						{c.name}
					</option>
				))}
			</select>
		</div>
	);
}
