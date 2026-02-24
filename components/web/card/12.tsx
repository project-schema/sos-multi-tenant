import { PackageSearch } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import Link from 'next/link';

const NotFoundCard12 = ({
	size = 'lg',
	title,
}: {
	size?: 'sm' | 'md' | 'lg';
	title?: string;
}) => {
	const getPadding = () => {
		switch (size) {
			case 'sm':
				return 'py-4';

			case 'md':
				return 'py-8';

			case 'lg':
				return 'py-16';
		}
	};

	return (
		<MotionFadeIn>
			<Card
				className={`col-span-full flex flex-col items-center justify-center ${getPadding()} text-center`}
			>
				<CardContent className="flex flex-col items-center space-y-4">
					<PackageSearch
						className={`text-muted-foreground ${size === 'lg' ? 'h-12 w-12 ' : 'w-8 h-8'}`}
					/>
					<div className="space-y-2">
						<h3
							className={` ${size === 'lg' ? 'font-semibold text-lg md:text-xl' : 'font-medium'} `}
						>
							No {title && <span className="text-orange-500">{title}</span>}{' '}
							Products Found
						</h3>
						{size === 'lg' && (
							<p className="text-sm text-muted-foreground max-w-sm">
								We could not find any products matching your criteria. Try
								adjusting your filters or browse all products.
							</p>
						)}
					</div>
					{(size === 'lg' || size === 'md') && (
						<Button asChild className="bg-orange-500 hover:bg-orange-500/80">
							<Link href="/shop">Browse Others Products</Link>
						</Button>
					)}
				</CardContent>
			</Card>
		</MotionFadeIn>
	);
};

export { NotFoundCard12 };
