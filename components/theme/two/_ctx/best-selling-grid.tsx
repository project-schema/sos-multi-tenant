'use client';

import { BestSellingProducts } from './best-selling-products';

interface BestSellingGridProps {
	columns?: number;
	title?: string;
	count?: number;
}

export function BestSellingGrid({
	columns = 4,
	title = 'Best Selling Products',
	count = 4,
}: BestSellingGridProps) {
	return (
		<div
			className={`grid  grid-cols-2  2xl:grid-cols-4 gap-3 lg:gap-6 max-w-[1720px] mx-auto px-4 lg:px-8`}
		>
			{Array.from({ length: columns }).map((_, index) => (
				<BestSellingProducts key={index} title={title} count={count} />
			))}
		</div>
	);
}
