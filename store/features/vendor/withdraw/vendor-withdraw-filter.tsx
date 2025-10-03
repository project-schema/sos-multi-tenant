'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Filter } from 'lucide-react';

export function VendorWithdrawFilter({
	statusFilter,
	setStatusFilter,
}: {
	statusFilter: string;
	setStatusFilter: (value: string) => void;
}) {
	return (
		<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pb-4">
			{/* Filters */}
			<div className="flex gap-2 items-center w-full sm:w-auto">
				<Filter className="h-4 w-4 text-muted-foreground" />
				{/* Status Filter */}
				<Select value={statusFilter} onValueChange={setStatusFilter as any}>
					<SelectTrigger className="w-full sm:w-52">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Withdraw</SelectItem>
						<SelectItem value="success">Success Withdraw</SelectItem>
						<SelectItem value="pending">Pending Withdraw</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
