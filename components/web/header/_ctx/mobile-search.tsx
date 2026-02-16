'use client';

import { iSystem } from '@/store/features/vendor/cms/system/type';
import { Search } from 'lucide-react';

interface MobileSearchProps {
	onToggle: () => void;
	cms: iSystem | null;
}

export function MobileSearch({ onToggle, cms }: MobileSearchProps) {
	return (
		<button
			onClick={onToggle}
			className={`md:hidden w-10 h-10 flex items-center justify-center text-gray-700 transition-colors  hover:text-${cms?.color_secondary}`}
		>
			<Search className="w-5 h-5" />
		</button>
	);
}
