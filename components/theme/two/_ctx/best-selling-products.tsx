'use client';

import { Card08 } from '@/components/web';

interface BestSellingProductsProps {
	title?: string;
	count?: number;
}

export function BestSellingProducts({
	title = 'Best Selling Products',
	count = 4,
}: BestSellingProductsProps) {
	return (
		<div className="space-y-10">
			<h2 className="text-base line-clamp-1 xl:text-2xl font-semibold border-b border-gray-200 pb-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-orange-500 after:w-1/3">
				{title}
			</h2>
			<div className="space-y-6">
				{Array.from({ length: count }).map((_, index) => (
					<Card08 key={index} />
				))}
			</div>
		</div>
	);
}
