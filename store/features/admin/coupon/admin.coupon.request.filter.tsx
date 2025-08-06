'use client';

import { Input } from '@/components/ui/input';

import { Search } from 'lucide-react';

export function AdminCouponRequestFilter({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}) {
	return (
		<div className="relative w-full sm:w-80 mb-4">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
			<Input
				placeholder="Search by email..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="pl-10"
			/>
		</div>
	);
}
