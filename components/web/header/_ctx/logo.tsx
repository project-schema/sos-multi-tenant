'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
	return (
		<Link
			href="/"
			className="flex items-center space-x-2 flex-shrink-0"
		>
			<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
				<ShoppingCart className="w-6 h-6 text-white" />
			</div>
			<span className="text-xl font-bold text-black hidden sm:inline">
				SOSComrz
			</span>
		</Link>
	);
}
