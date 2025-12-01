'use client';

import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Filter, Search } from 'lucide-react';

export function DropshipperProductFilter({
	statusFilter,
	setStatusFilter,
	searchTerm,
	setSearchTerm,
}: {
	statusFilter: string;
	setStatusFilter: (value: string) => void;
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}) {
	return (
		<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pb-4">
			{/* Search */}
			<div className="relative w-full sm:w-80">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
				<Input
					placeholder="Search by id and product..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="pl-10"
				/>
			</div>

			{/* Filters */}
			<div className="flex gap-2 items-center w-full sm:w-auto">
				<Filter className="h-4 w-4 text-muted-foreground" />
				{/* Status Filter */}
				<Select value={statusFilter} onValueChange={setStatusFilter as any}>
					<SelectTrigger className="w-full sm:w-32">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Requests</SelectItem>
						<SelectItem value="active">Active Requests</SelectItem>
						<SelectItem value="pending">Pending Requests</SelectItem>
						<SelectItem value="rejected">Rejected Requests</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
