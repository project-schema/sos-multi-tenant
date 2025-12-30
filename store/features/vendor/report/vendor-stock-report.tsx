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
import { sign, tableSrCount, textCount } from '@/lib';

import { format } from 'date-fns';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useVendorStockReportQuery } from './vendor-report-api-slice';
import { VendorReportFilter } from './vendor-report-filter';

export function VendorStockReportPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all' as 'all' | 'paid' | 'due',
		start_date: undefined as Date | undefined,
		end_date: undefined as Date | undefined,
	});

	const clearFilters = () => {
		setFilters({
			searchTerm: '',
			status: 'all',
			start_date: undefined,
			end_date: undefined,
		});
	};

	const [page, setPage] = useState(1);

	// Debounced version

	const { data, isLoading, isError, isFetching } = useVendorStockReportQuery({
		page: page,
		end_date: filters.end_date ? format(filters.end_date, 'dd-MM-yyyy') : '',
		start_date: filters.start_date
			? format(filters.start_date, 'dd-MM-yyyy')
			: '',
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
							<CardTitle>Stock Report</CardTitle>
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
					<VendorReportFilter
						filters={filters}
						setFilters={setFilters}
						clearFilters={clearFilters}
						select={['start_date', 'end_date']}
					/>
				)}
				{data?.stock_report && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="bg-stone-100">Sr.</TableHead>
										<TableHead className="bg-stone-100">Product Name</TableHead>
										<TableHead className="bg-stone-100">Sale Price</TableHead>
										<TableHead className="bg-stone-100">
											Purchase Price
										</TableHead>
										<TableHead className="bg-stone-100">Stock</TableHead>
										<TableHead className="bg-stone-100">
											Stock Sale Price
										</TableHead>
										<TableHead className="bg-stone-100">
											Stock Purchase Price
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data.stock_report.data.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={7}
												className="text-center py-8 text-muted-foreground"
											>
												No items found matching your criteria
											</TableCell>
										</TableRow>
									) : (
										data.stock_report.data?.map((item, i) => (
											<TableRow key={item.id}>
												<TableCell className="py-2 pl-4">
													{tableSrCount(data.stock_report.current_page, i)}
												</TableCell>
												<TableCell className="py-2">
													{textCount(item.name, 30)}
												</TableCell>
												<TableCell className="py-2">
													<Badge className="capitalize" variant="default">
														{item.selling_price} {sign.tk}
													</Badge>
												</TableCell>
												<TableCell className="py-2">
													<Badge className="capitalize" variant="secondary">
														{item.purchase_price} {sign.tk}
													</Badge>
												</TableCell>
												<TableCell className="py-2">
													<Badge
														className="capitalize"
														variant={
															parseFloat(item.stock) > 0
																? 'default'
																: 'destructive'
														}
													>
														{item.stock}
													</Badge>
												</TableCell>
												<TableCell className="py-2">
													<Badge className="capitalize" variant="outline">
														{Number(item.pos_sale_details_sum_qty) *
															Number(item.selling_price) || 0}{' '}
														{sign.tk}
													</Badge>
												</TableCell>
												<TableCell className="py-2">
													<Badge className="capitalize" variant="outline">
														{Number(item.purchase_details_sum_qty) *
															Number(item.purchase_price) || 0}{' '}
														{sign.tk}
													</Badge>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
						<Pagination1 pagination={data?.stock_report} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
