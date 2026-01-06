'use client';

import { GitCompare, Heart, ShoppingCart } from 'lucide-react';

interface UtilityIconsProps {
	variant?: 'desktop' | 'mobile';
}

export function UtilityIcons({ variant = 'desktop' }: UtilityIconsProps) {
	return (
		<div
			className={`flex items-center gap-4 ${
				variant === 'mobile' ? '' : 'hidden md:flex'
			}`}
		>
			<button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors">
				<GitCompare className="w-5 h-5" />
			</button>
			<button className="relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors">
				<Heart className="w-5 h-5" />
				<span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
					2
				</span>
			</button>
			<button className="relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors">
				<ShoppingCart className="w-5 h-5" />
				<span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
					1
				</span>
			</button>
		</div>
	);
}
