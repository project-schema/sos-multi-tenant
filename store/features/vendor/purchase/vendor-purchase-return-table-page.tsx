'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
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
import { useDebounce } from '@/hooks/use-debounce';
import { sign, tableSrCount, textCount } from '@/lib';
import { format } from 'date-fns';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useVendorPurchaseReturnListQuery } from './vendor-purchase-api-slice';
import { VendorPurchaseReturnFilter } from './vendor-purchase-return-filter';

export function VendorPurchaseReturnTablePage() {
	const [filters, setFilters] = useState({
		searchTerm: '',
		fromDate: undefined as Date | undefined,
		toDate: undefined as Date | undefined,
	});

	const clearFilters = () => {
		setFilters({
			searchTerm: '',
			fromDate: undefined,
			toDate: undefined,
		});
	};

	const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);
	const { data, isLoading, isError, isFetching } =
		useVendorPurchaseReturnListQuery({
			search: debouncedSearchTerm,
			start_date: filters.fromDate
				? format(filters.fromDate, 'dd-MM-yyyy')
				: '',
			end_date: filters.toDate ? format(filters.toDate, 'dd-MM-yyyy') : '',
		});

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<>
					<div className="pb-2 lg:pb-3 flex items-center justify-between">
						<CardTitle>Purchase Return</CardTitle>
					</div>
				</>
			}
		>
			<VendorPurchaseReturnFilter
				filters={filters}
				setFilters={setFilters}
				clearFilters={clearFilters}
			/>
			{data?.status && (
				<>
					<div className="border rounded-lg relative">
						{isFetching && <Loader8 />}

						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="bg-stone-100">Sr.</TableHead>
									<TableHead className="bg-stone-100 w-10">
										Invoice no
									</TableHead>
									<TableHead className="bg-stone-100">
										Supplier Business Name
									</TableHead>
									<TableHead className="bg-stone-100">Purchase Date </TableHead>
									<TableHead className="bg-stone-100">
										Last Return Date
									</TableHead>
									<TableHead className="bg-stone-100">Return Qty </TableHead>
									<TableHead className="bg-stone-100">Amount </TableHead>
									<TableHead className="bg-stone-100">Action </TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.return_list.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={8}
											className="text-center py-8 text-muted-foreground"
										>
											No items found matching your criteria
										</TableCell>
									</TableRow>
								) : (
									data?.return_list?.map((item, i) => (
										<TableRow key={item.id}>
											<TableCell className="py-2 pl-4">
												{tableSrCount(1, i)}
											</TableCell>
											<TableCell className="font-medium py-4">
												#{item.chalan_no}
											</TableCell>
											<TableCell className="py-2">
												{textCount(item.supplier.supplier_name, 30)}
											</TableCell>

											<TableCell className="py-2">
												{item.purchase_date}
											</TableCell>

											<TableCell className="py-2">{item.return_date}</TableCell>

											<TableCell className="py-2">
												<Badge variant="default">{item.return_qty}</Badge>
											</TableCell>
											<TableCell className="py-2">
												<Badge className="capitalize" variant="default">
													{item.return_amount} {sign.tk}
												</Badge>
											</TableCell>

											<TableCell className="py-2">
												<Button variant="outline" size="icon">
													<Link href={`/purchase/return/view/${item.id}`}>
														<EyeIcon className="size-4" />
														<span className="sr-only">View</span>
													</Link>
												</Button>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</>
			)}
		</Container1>
	);
}
