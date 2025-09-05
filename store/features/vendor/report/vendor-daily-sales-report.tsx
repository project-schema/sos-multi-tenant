'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { tableSrCount } from '@/lib';

import { format } from 'date-fns';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
	useGetProductIdsFromSalesDetailsQuery,
	useVendorSalesReportDailyProductWiseQuery,
} from './vendor-report-api-slice';
import { VendorReportFilter } from './vendor-report-filter';

export function VendorDailySalesReportPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all' as 'answer' | 'close' | 'pending' | 'all',
		start_date: undefined as Date | undefined,
		end_date: undefined as Date | undefined,
		product_id: '',
	});

	const clearFilters = () => {
		setFilters({
			searchTerm: '',
			status: 'all',
			start_date: undefined,
			end_date: undefined,
			product_id: '',
		});
	};

	const [page, setPage] = useState(1);

	// Get product list for dropdown
	const { data: productData } = useGetProductIdsFromSalesDetailsQuery();

	const { data, isLoading, isError, isFetching } =
		useVendorSalesReportDailyProductWiseQuery({
			page: page,
			end_date: filters.end_date ? format(filters.end_date, 'dd-MM-yyyy') : '',
			start_date: filters.start_date
				? format(filters.start_date, 'dd-MM-yyyy')
				: '',
			product_id: filters.product_id,
			status: filters.status,
		});

	useEffect(() => {
		setPage(1);
	}, [filters]);

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Daily Sales Report (Product Wise)</CardTitle>
							<Button
								className="ml-auto"
								variant="outline"
								size="icon"
								onClick={() => setToggleFilter((e) => !e)}
							>
								<SlidersHorizontal className="h-4 w-4" />
							</Button>
						</div>
					</>
				}
			>
				{/* Filter */}
				{toggleFilter && (
					<div>
						<VendorReportFilter
							filters={filters}
							setFilters={setFilters}
							clearFilters={clearFilters}
							select={['start_date', 'end_date']}
						/>

						{/* Product Selection */}
						{/* <Select
							value={filters.product_id}
							onValueChange={(value) =>
								setFilters((prev) => ({ ...prev, product_id: value }))
							}
						>
							<SelectTrigger className="w-full h-11">
								<SelectValue placeholder="Select Product" />
							</SelectTrigger>
							<SelectContent>
								{productData?.products?.map((product) => (
									<SelectItem key={product.id} value={product.id.toString()}>
										{product.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select> */}
					</div>
				)}
				{data?.variantSalesReport && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="bg-stone-100">Sr.</TableHead>
										<TableHead className="bg-stone-100">ID</TableHead>
										<TableHead className="bg-stone-100">Details</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data.variantSalesReport.data.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={3}
												className="text-center py-8 text-muted-foreground"
											>
												No items found matching your criteria
											</TableCell>
										</TableRow>
									) : (
										data.variantSalesReport.data?.map((item, i) => (
											<TableRow key={item.id}>
												<TableCell className="py-2 pl-4">
													{tableSrCount(
														data.variantSalesReport.current_page,
														i
													)}
												</TableCell>
												<TableCell className="py-2">
													<Badge variant="outline">{item.id}</Badge>
												</TableCell>
												<TableCell className="py-2">
													Daily sales data for product ID: {item.id}
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
						<Pagination1
							pagination={data?.variantSalesReport}
							setPage={setPage}
						/>
					</>
				)}
			</Container1>
		</>
	);
}
