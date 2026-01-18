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
import { useVendorPurchaseReportQuery } from './vendor-report-api-slice';
import { VendorReportFilter } from './vendor-report-filter';

export function VendorPurchaseReportPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all' as 'answer' | 'close' | 'pending' | 'all',
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

	const { data, isLoading, isError, isFetching } = useVendorPurchaseReportQuery(
		{
			page: page,
			end_date: filters.end_date ? format(filters.end_date, 'dd-MM-yyyy') : '',
			start_date: filters.start_date
				? format(filters.start_date, 'dd-MM-yyyy')
				: '',
		}
	);

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
							<CardTitle>Purchase Report</CardTitle>
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
						filters={filters as any}
						setFilters={setFilters}
						clearFilters={clearFilters}
						select={['start_date', 'end_date']}
					/>
				)}
				{data?.purchase_report && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="bg-stone-100">Sr.</TableHead>
										<TableHead className="bg-stone-100">
											Purchase Date
										</TableHead>
										<TableHead className="bg-stone-100">Chalan No</TableHead>
										<TableHead className="bg-stone-100">Supplier</TableHead>
										<TableHead className="bg-stone-100">Total Price</TableHead>
										<TableHead className="bg-stone-100">Paid Amount</TableHead>
										<TableHead className="bg-stone-100">Due Amount</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data.purchase_report.data.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={7}
												className="text-center py-8 text-muted-foreground"
											>
												No items found matching your criteria
											</TableCell>
										</TableRow>
									) : (
										data.purchase_report.data?.map((item, i) => (
											<TableRow key={item.id}>
												<TableCell className="py-2 pl-4">
													{tableSrCount(data.purchase_report.current_page, i)}
												</TableCell>
												<TableCell className="py-2">
													{item.purchase_date}
												</TableCell>
												<TableCell className="py-2">
													<Badge variant="outline">{item.chalan_no}</Badge>
												</TableCell>
												<TableCell className="py-2">
													{textCount(item.supplier.supplier_name, 20)}
												</TableCell>
												<TableCell className="py-2">
													<Badge className="capitalize" variant="default">
														{item.total_price} {sign.tk}
													</Badge>
												</TableCell>
												<TableCell className="py-2">
													<Badge className="capitalize" variant="secondary">
														{item.paid_amount} {sign.tk}
													</Badge>
												</TableCell>
												<TableCell className="py-2">
													<Badge
														className="capitalize"
														variant={
															parseFloat(item.due_amount) > 0
																? 'destructive'
																: 'default'
														}
													>
														{item.due_amount} {sign.tk}
													</Badge>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
						<Pagination1 pagination={data?.purchase_report} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
