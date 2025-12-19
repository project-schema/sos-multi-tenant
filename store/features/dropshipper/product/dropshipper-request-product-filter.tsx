'use client';

import { Input } from '@/components/ui/input';

import { Search } from 'lucide-react';

export function DropshipperRequestProductFilter({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}) {
	return (
		<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pb-4">
			{/* Search */}
			<div className="relative w-full sm:w-80">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
				<Input
					placeholder="Search by id and name..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="pl-10"
				/>
			</div>
		</div>
	);
}
