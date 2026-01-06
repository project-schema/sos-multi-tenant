'use client';

import { Button } from '@/components/ui/button';
import { Card07 } from '@/components/web';

interface ProductSectionProps {
	title: string;
	buttons?: { label: string; onClick?: () => void }[];
	productCount?: number;
}

export function ProductSection({
	title,
	buttons,
	productCount = 10,
}: ProductSectionProps) {
	return (
		<div className="max-w-[1720px] mx-auto px-4 lg:px-8">
			<div className="flex items-center flex-wrap gap-4 justify-between mb-6">
				<h2 className="text-2xl font-semibold">{title}</h2>
				{buttons && buttons.length > 0 && (
					<div className="flex gap-2 overflow-x-auto">
						{buttons.map((button, index) => (
							<Button key={index} variant="outline" onClick={button.onClick}>
								{button.label}
							</Button>
						))}
					</div>
				)}
			</div>
			<div
				className={`grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 2xl:grid-cols-5  gap-3 md:gap-6`}
			>
				{Array.from({ length: productCount }).map((_, index) => (
					<Card07 key={index} />
				))}
			</div>
		</div>
	);
}
