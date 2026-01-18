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
import React, { useState } from 'react';

export function VendorReportFilter({
	filters,
	setFilters,
	clearFilters,
	select,
	products,
}: {
	filters: {
		searchTerm: string;
		status: any;
		start_date: Date | undefined;
		end_date: Date | undefined;
		product_id?: string;
	};
	setFilters: any;
	clearFilters: () => void;
	select: ('searchTerm' | 'start_date' | 'end_date' | 'status' | 'products')[];
	products?: { id: number; name: string }[];
}) {
	const [openFrom, setOpenFrom] = useState(false);
	const [openTo, setOpenTo] = useState(false);

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8 gap-4 mb-4">
			{select.map((item) => (
				<React.Fragment key={item}>
					{/* Search Input */}
					{item === 'searchTerm' && (
						<div className="relative w-full">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Input
								placeholder="Search by id..."
								value={filters.searchTerm}
								onChange={(e) =>
									setFilters((prev: any) => ({
										...prev,
										searchTerm: e.target.value,
									}))
								}
								className="pl-10"
							/>
						</div>
					)}
					{item === 'start_date' && (
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
										setFilters((prev: any) => ({ ...prev, start_date: date }))
									}
								/>
							</PopoverContent>
						</Popover>
					)}
					{item === 'end_date' && (
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
										: 'End Date'}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={filters.end_date}
									onSelect={(date) =>
										setFilters((prev: any) => ({ ...prev, end_date: date }))
									}
								/>
							</PopoverContent>
						</Popover>
					)}
					{item === 'status' && (
						<Select
							value={filters.status}
							onValueChange={(value: 'all' | 'paid' | 'due' | 'all') =>
								setFilters((prev: any) => ({ ...prev, status: value }))
							}
						>
							<SelectTrigger className="w-full h-11">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All</SelectItem>
								<SelectItem value="paid">Paid</SelectItem>
								<SelectItem value="due">Due</SelectItem>
							</SelectContent>
						</Select>
					)}
					{item === 'products' && (
						<Select
							value={filters.product_id}
							onValueChange={(value: string) =>
								setFilters((prev: any) => ({ ...prev, product_id: value }))
							}
						>
							<SelectTrigger className="w-full h-11">
								<SelectValue placeholder="Select Product" />
							</SelectTrigger>
							<SelectContent>
								{products?.map((product) => (
									<SelectItem key={product.id} value={product.id.toString()}>
										{product.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				</React.Fragment>
			))}

			{/* Clear Filters Button */}
			<Button variant="outline" className="h-11" onClick={clearFilters}>
				<XCircle className="mr-2 h-4 w-4" />
				Clear Filters
			</Button>
		</div>
	);
}
