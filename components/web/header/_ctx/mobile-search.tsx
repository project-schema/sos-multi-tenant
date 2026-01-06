'use client';

import { Search } from 'lucide-react';

interface MobileSearchProps {
	onToggle: () => void;
}

export function MobileSearch({ onToggle }: MobileSearchProps) {
	return (
		<button
			onClick={onToggle}
			className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors"
		>
			<Search className="w-5 h-5" />
		</button>
	);
}
