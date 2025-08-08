'use client';
import { Button } from '@/components/ui/button';
import { iCompleteMerchantProduct } from '@/store/features/admin/merchant-product';
import { Facebook, Heart, Instagram, Minus, Plus, Twitter } from 'lucide-react';
import { useState } from 'react';

export const ProductActions = ({
	quantity,
	onIncrement,
	onDecrement,
	product,
}: {
	quantity: number;
	onIncrement: () => void;
	onDecrement: () => void;
	product: iCompleteMerchantProduct;
}) => {
	const [isFavorite, setIsFavorite] = useState(false);

	return (
		<>
			<div className="flex items-center gap-4">
				<div className="flex items-center border rounded-full">
					<Button
						variant="ghost"
						size="icon"
						onClick={onDecrement}
						className="rounded-l-full"
					>
						<Minus className="w-4 h-4" />
					</Button>
					<span className="w-12 text-center">{quantity}</span>
					<Button
						variant="ghost"
						size="icon"
						onClick={onIncrement}
						className="rounded-r-full"
					>
						<Plus className="w-4 h-4" />
					</Button>
				</div>
				<Button className="flex-grow bg-black text-white hover:bg-gray-900 py-6 text-lg font-medium">
					Add to Cart
				</Button>
				<Button
					variant="outline"
					className="p-3"
					onClick={() => setIsFavorite(!isFavorite)}
				>
					<Heart
						className={`w-6 h-6 ${
							isFavorite ? 'fill-red-500 text-red-500' : ''
						}`}
					/>
				</Button>
			</div>

			<div className="flex items-center space-x-4">
				<span className="text-sm font-medium">Share:</span>
				<Button variant="ghost" size="icon">
					<Facebook className="w-5 h-5" />
				</Button>
				<Button variant="ghost" size="icon">
					<Twitter className="w-5 h-5" />
				</Button>
				<Button variant="ghost" size="icon">
					<Instagram className="w-5 h-5" />
				</Button>
			</div>
		</>
	);
};
