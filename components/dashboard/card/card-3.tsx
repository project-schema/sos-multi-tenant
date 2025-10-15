import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib';
import { ShoppingCart, Star } from 'lucide-react';

interface Card3Props {
	title: string;
	image: string;
	price: string | number;
	originalPrice?: string | number;
	discountBadge?: string; // e.g. "-30%"
	rating?: number; // 0-5
	className?: string;
	buttonText?: string;
	onOrderClick?: () => void;
}

export const Card3 = ({
	title,
	image,
	price,
	originalPrice,
	discountBadge,
	rating = 0,
	className,
	buttonText = 'Order Now',
	onOrderClick,
}: Card3Props) => {
	const stars = Math.max(0, Math.min(5, Math.round(rating)));

	return (
		<Card className={cn('p-0 overflow-hidden', className)}>
			<div className="flex flex-col md:flex-row items-stretch">
				{/* Image */}
				<div className="relative md:w-2/5 w-full aspect-[16/10] md:aspect-auto bg-muted overflow-hidden">
					{discountBadge && (
						<span className="absolute top-2 left-2 z-10 text-xs font-semibold text-white bg-red-500 rounded px-2 py-1">
							{discountBadge}
						</span>
					)}
					<img src={image} alt={title} className="h-full w-full object-cover" />
				</div>

				{/* Content */}
				<CardContent className="flex-1 py-4 md:py-6">
					<div className="flex flex-col gap-3 md:gap-4">
						<h3 className="text-base md:text-lg font-semibold text-foreground">
							{title}
						</h3>

						{/* Rating */}
						<div className="flex items-center gap-1 text-yellow-400">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className={cn(
										'h-4 w-4',
										i < stars ? 'fill-yellow-400' : 'fill-transparent'
									)}
								/>
							))}
						</div>

						{/* Price */}
						<div className="flex items-center gap-2">
							<span className="text-xl md:text-2xl font-bold text-foreground">
								{price}
							</span>
							{originalPrice && (
								<span className="text-sm md:text-base text-muted-foreground line-through">
									{originalPrice}
								</span>
							)}
						</div>

						{/* CTA */}
						<button
							onClick={onOrderClick}
							className="mt-1 md:mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 transition-colors"
						>
							<ShoppingCart className="h-4 w-4" />
							<span>{buttonText}</span>
						</button>
					</div>
				</CardContent>
			</div>
		</Card>
	);
};
