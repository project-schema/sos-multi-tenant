'use client';

import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib';
import { Filter, Search } from 'lucide-react';
import { useServiceCategoryQuery } from './api-slice';

export function ServicesPurchaseFilter({
	statusFilter,
	setStatusFilter,
	serviceCategoryFilter,
	setServiceCategoryFilter,
	searchTerm,
	setSearchTerm,
}: {
	statusFilter: string;
	setStatusFilter: Function;
	serviceCategoryFilter: string;
	setServiceCategoryFilter: Function;
	searchTerm: string;
	setSearchTerm: Function;
}) {
	const { data: serviceCategory } = useServiceCategoryQuery();
	return (
		<div className="pb-4 flex flex-col lg:flex-row gap-2 lg:gap-4 items-start xl:items-center flex-1">
			{/* Search */}
			<div className="relative w-full lg:w-80">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
				<Input
					placeholder="Search by id and email..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className={cn('pl-10 h-9')}
				/>
			</div>

			{/* Filters */}
			<div className="flex gap-2 flex-wrap sm:flex-nowrap items-center justify-between flex-1">
				<div className="flex flex-1 gap-2 items-center">
					<Filter className="h-4 w-4 text-muted-foreground" />
					{/* Status Filter */}
					<Select value={statusFilter} onValueChange={setStatusFilter as any}>
						<SelectTrigger
							className={cn('data-[size=default]:h-9 w-full sm:w-32')}
						>
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="latest">Latest</SelectItem>
							<SelectItem value="avg_rating">Avg Rating</SelectItem>
							<SelectItem value="best_selling">Best Selling</SelectItem>
						</SelectContent>
					</Select>

					{/* Service Category Filter */}
					<Select
						value={serviceCategoryFilter}
						onValueChange={setServiceCategoryFilter as any}
					>
						<SelectTrigger
							className={cn('data-[size=default]:h-9 w-full sm:w-32')}
						>
							<SelectValue placeholder="Service Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							{serviceCategory?.message?.map((category) => (
								<SelectItem key={category.id} value={category.id.toString()}>
									{category.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
