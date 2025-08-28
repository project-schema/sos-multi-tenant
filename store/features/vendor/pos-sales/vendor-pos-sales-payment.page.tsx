'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';

import { Pagination1 } from '@/components/dashboard/pagination';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { sign, tableSrCount, textCount } from '@/lib';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { VendorPosSalesOrderFilter } from './vendor-pos-sales-order.filter';
import { useVendorPosPaymentHistoryQuery } from './vendor-pos-sales.api-slice';

export function VendorPosSalesPaymentPage() {
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all' as 'all' | 'due' | 'paid',
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
	const searchTerm = useDebounce(filters.searchTerm, 500);

	// Fetch
	const { data, isLoading, isError, isFetching } =
		useVendorPosPaymentHistoryQuery({
			page: page,
			search: searchTerm,
			status: filters.status,
			start_date: filters.start_date
				? format(filters.start_date, 'dd-MM-yyyy')
				: '',
			end_date: filters.end_date ? format(filters.end_date, 'dd-MM-yyyy') : '',
		});

	useEffect(() => {
		setPage(1);
	}, [filters]);

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>POS Payment History</CardTitle>}
			>
				<VendorPosSalesOrderFilter
					filters={filters}
					setFilters={setFilters}
					clearFilters={clearFilters}
				/>
				{data?.payment_history && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="bg-stone-100">SL.</TableHead>
										<TableHead className="bg-stone-100 w-10">
											Invoice no{' '}
										</TableHead>
										<TableHead className="bg-stone-100">
											{' '}
											Customer Name{' '}
										</TableHead>
										<TableHead className="bg-stone-100">Sales Date </TableHead>
										<TableHead className="bg-stone-100">Return Date </TableHead>
										<TableHead className="bg-stone-100">Amount </TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data.payment_history.data.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={6}
												className="text-center py-8 text-muted-foreground"
											>
												No items found matching your criteria
											</TableCell>
										</TableRow>
									) : (
										data?.payment_history.data.map((item, i) => (
											<TableRow key={item.id}>
												<TableCell className="py-2 pl-4">
													{tableSrCount(data.payment_history.current_page, i)}
												</TableCell>
												<TableCell className="font-medium py-4">
													#{item?.invoice_no}
												</TableCell>
												<TableCell className="py-2">
													{textCount(item?.customer?.customer_name, 20)}
												</TableCell>
												<TableCell className="py-2">
													{item?.payment_method?.payment_method_name}
												</TableCell>
												<TableCell className="py-2">{item?.date}</TableCell>
												<TableCell className="py-2">
													<Badge className="capitalize" variant="success">
														{item?.paid_amount} {sign.tk}
													</Badge>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
						<Pagination1 pagination={data?.payment_history} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
