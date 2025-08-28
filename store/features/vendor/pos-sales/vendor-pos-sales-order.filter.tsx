'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Search, XCircle } from 'lucide-react';
import { useState } from 'react';

export function VendorPosSalesOrderFilter({
	filters,
	setFilters,
	clearFilters,
}: {
	filters: {
		searchTerm: string;
		status: 'paid' | 'due' | 'all';
		start_date: Date | undefined;
		end_date: Date | undefined;
	};
	setFilters: React.Dispatch<React.SetStateAction<typeof filters>>;
	clearFilters: () => void;
}) {
	const [openFrom, setOpenFrom] = useState(false);
	const [openTo, setOpenTo] = useState(false);

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8 gap-4 mb-4">
			{/* Search Input */}
			<div className="relative w-full">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
				<Input
					placeholder="Search by invoice no..."
					value={filters.searchTerm}
					onChange={(e) =>
						setFilters((prev) => ({
							...prev,
							searchTerm: e.target.value,
						}))
					}
					className="pl-10"
				/>
			</div>
			{/* start_date */}
			<Popover open={openFrom} onOpenChange={setOpenFrom}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-full h-11 justify-start text-left',
							!filters.start_date && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{filters.start_date
							? format(filters.start_date, 'dd-MM-yyyy')
							: 'Start Date'}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={filters.start_date}
						onSelect={(date) =>
							setFilters((prev) => ({ ...prev, start_date: date }))
						}
					/>
				</PopoverContent>
			</Popover>

			{/* end_date */}
			<Popover open={openTo} onOpenChange={setOpenTo}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-full h-11 justify-start text-left',
							!filters.end_date && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{filters.end_date
							? format(filters.end_date, 'dd-MM-yyyy')
							: 'To Date'}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={filters.end_date}
						onSelect={(date) =>
							setFilters((prev) => ({ ...prev, end_date: date }))
						}
					/>
				</PopoverContent>
			</Popover>

			{/* Status Filter */}
			<Select
				value={filters.status}
				onValueChange={(value: 'all' | 'due' | 'paid') =>
					setFilters((prev) => ({ ...prev, status: value }))
				}
			>
				<SelectTrigger className="w-full h-11">
					<SelectValue placeholder="Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					<SelectItem value="due">Due</SelectItem>
					<SelectItem value="paid">Paid</SelectItem>
				</SelectContent>
			</Select>

			{/* Clear Filters Button */}
			<Button variant="outline" className="h-11" onClick={clearFilters}>
				<XCircle className="mr-2 h-4 w-4" />
				Clear Filters
			</Button>
		</div>
	);
}
