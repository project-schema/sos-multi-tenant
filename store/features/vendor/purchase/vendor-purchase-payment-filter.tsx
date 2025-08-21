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

export function VendorPurchasePaymentFilter({
	filters,
	setFilters,
	clearFilters,
}: {
	filters: {
		searchTerm: string;
		status: 'all' | 'due' | 'paid';
		fromDate: Date | undefined;
		toDate: Date | undefined;
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
			{/* From Date */}
			<Popover open={openFrom} onOpenChange={setOpenFrom}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-full h-11 justify-start text-left',
							!filters.fromDate && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{filters.fromDate
							? format(filters.fromDate, 'dd-MM-yyyy')
							: 'From Date'}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={filters.fromDate}
						onSelect={(date) =>
							setFilters((prev) => ({ ...prev, fromDate: date }))
						}
					/>
				</PopoverContent>
			</Popover>

			{/* To Date */}
			<Popover open={openTo} onOpenChange={setOpenTo}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-full h-11 justify-start text-left',
							!filters.toDate && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{filters.toDate ? format(filters.toDate, 'dd-MM-yyyy') : 'To Date'}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={filters.toDate}
						onSelect={(date) =>
							setFilters((prev) => ({ ...prev, toDate: date }))
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
					<SelectItem value="all">All Status</SelectItem>
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
