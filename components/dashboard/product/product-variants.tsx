'use client';
import { iCompleteMerchantProduct } from '@/store/features/admin/merchant-product';
import { useState } from 'react';

export const ProductVariants = ({
	product,
}: {
	product: iCompleteMerchantProduct;
}) => {
	// These would ideally come from your product data or API
	const sizes = ['500ml', '750ml', '1L'];
	const colors = [
		{ name: 'Matte Black', value: 'black' },
		{ name: 'Pearl White', value: 'white' },
		{ name: 'Brushed Silver', value: 'silver' },
		{ name: 'Rose Gold', value: 'gold' },
	];

	const [selectedSize, setSelectedSize] = useState(sizes[1]); // Default to '750ml'
	const [selectedColor, setSelectedColor] = useState(colors[0].value); // Default to first color

	return (
		<>
			{/* Size Selection */}
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Size</h2>
				<div className="flex flex-wrap gap-3">
					{sizes.map((size) => (
						<button
							key={size}
							onClick={() => setSelectedSize(size)}
							className={`px-4 py-2 rounded-full flex items-center justify-center border-2 text-sm font-medium transition-all
                ${
									selectedSize === size
										? 'border-black bg-black text-white'
										: 'border-gray-200 hover:border-gray-300'
								}`}
						>
							{size}
						</button>
					))}
				</div>
			</div>

			{/* Color Selection */}
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Color</h2>
				<div className="flex flex-wrap gap-4">
					{colors.map((color) => (
						<button
							key={color.value}
							onClick={() => setSelectedColor(color.value)}
							className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center
                ${
									selectedColor === color.value
										? 'ring-2 ring-offset-2 ring-black'
										: 'hover:ring-1 hover:ring-gray-200'
								}`}
							style={{ backgroundColor: color.value }}
							aria-label={color.name}
						>
							{selectedColor === color.value && (
								<svg
									className="w-6 h-6 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							)}
						</button>
					))}
				</div>
			</div>
		</>
	);
};
/*
	const [quantity, setQuantity] = useState(1);

	const incrementQuantity = () => setQuantity((prev) => prev + 1);
	const decrementQuantity = () =>
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

*/
