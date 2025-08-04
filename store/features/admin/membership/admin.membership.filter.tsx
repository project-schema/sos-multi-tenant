'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Filter } from 'lucide-react';

export function AdminMembershipFilter({
	statusFilter,
	setStatusFilter,
}: {
	statusFilter: 'vendor' | 'affiliate';
	setStatusFilter: (value: 'vendor' | 'affiliate') => void;
}) {
	return (
		<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
			{/* Filters */}
			<div className="flex gap-2 items-center">
				<Filter className="h-4 w-4 text-muted-foreground" />
				{/* Status Filter */}
				<Select value={statusFilter} onValueChange={setStatusFilter as any}>
					<SelectTrigger className="w-52">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="vendor">All Merchants</SelectItem>
						<SelectItem value="affiliate">ALl Dropshippers</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
