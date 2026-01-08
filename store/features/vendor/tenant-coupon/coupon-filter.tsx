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

export function AdminCouponFilter({
	filters,
	setFilters,
	clearFilters,
}: {
	filters: {
		searchTerm: string;
		status: string;
		discountType: string;
		validFrom: Date | undefined;
		validTo: Date | undefined;
	};
	setFilters: React.Dispatch<React.SetStateAction<typeof filters>>;
	clearFilters: () => void;
}) {
	const [openFrom, setOpenFrom] = useState(false);
	const [openTo, setOpenTo] = useState(false);

	return (
		<div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 mb-4">
			{/* Search Input */}
			<div className="relative w-full">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
				<Input
					placeholder="Search by name or code..."
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

			{/* Status Filter */}
			<Select
				value={filters.status}
				onValueChange={(value) =>
					setFilters((prev) => ({ ...prev, status: value }))
				}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="All Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Status</SelectItem>
					<SelectItem value="active">Active</SelectItem>
					<SelectItem value="inactive">Inactive</SelectItem>
				</SelectContent>
			</Select>

			{/* Discount Type Filter */}
			<Select
				value={filters.discountType}
				onValueChange={(value) =>
					setFilters((prev) => ({ ...prev, discountType: value }))
				}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="All Types" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Types</SelectItem>
					<SelectItem value="flat">Flat</SelectItem>
					<SelectItem value="percentage">Percentage</SelectItem>
				</SelectContent>
			</Select>

			{/* Valid From Date */}
			<Popover open={openFrom} onOpenChange={setOpenFrom}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-full h-10 justify-start text-left',
							!filters.validFrom && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{filters.validFrom
							? format(filters.validFrom, 'dd-MM-yyyy')
							: 'Valid From'}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={filters.validFrom}
						onSelect={(date) => {
							setFilters((prev) => ({ ...prev, validFrom: date }));
							setOpenFrom(false);
						}}
					/>
				</PopoverContent>
			</Popover>

			{/* Valid To Date */}
			<Popover open={openTo} onOpenChange={setOpenTo}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-full h-10 justify-start text-left',
							!filters.validTo && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{filters.validTo
							? format(filters.validTo, 'dd-MM-yyyy')
							: 'Valid To'}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={filters.validTo}
						onSelect={(date) => {
							setFilters((prev) => ({ ...prev, validTo: date }));
							setOpenTo(false);
						}}
					/>
				</PopoverContent>
			</Popover>

			{/* Clear Filters Button */}
			<Button variant="outline" className="h-10" onClick={clearFilters}>
				<XCircle className="mr-2 h-4 w-4" />
				Clear
			</Button>
		</div>
	);
}
