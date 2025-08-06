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
		<div className="flex gap-2 items-center mb-4">
			<Filter className="h-4 w-4 text-muted-foreground" />
			<Select value={statusFilter} onValueChange={setStatusFilter as any}>
				<SelectTrigger className="w-full sm:w-52">
					<SelectValue placeholder="Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="vendor">All Merchants</SelectItem>
					<SelectItem value="affiliate">ALl Dropshippers</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
