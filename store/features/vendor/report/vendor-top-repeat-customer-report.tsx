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
import { tableSrCount, textCount } from '@/lib';

import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useTopRepeatCustomerQuery } from './vendor-report-api-slice';

export function VendorTopRepeatCustomerReportPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [page, setPage] = useState(1);

	const { data, isLoading, isError, isFetching } = useTopRepeatCustomerQuery({
		page: page,
	});

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Top Repeat Customer Report</CardTitle>
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
				{data?.top_customers && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="bg-stone-100">Sr.</TableHead>
										<TableHead className="bg-stone-100">Customer ID</TableHead>
										<TableHead className="bg-stone-100">
											Customer Name
										</TableHead>
										<TableHead className="bg-stone-100">Email</TableHead>
										<TableHead className="bg-stone-100">Phone</TableHead>
										<TableHead className="bg-stone-100">Order Count</TableHead>
										<TableHead className="bg-stone-100">Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data.top_customers.data.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={7}
												className="text-center py-8 text-muted-foreground"
											>
												No items found matching your criteria
											</TableCell>
										</TableRow>
									) : (
										data.top_customers.data?.map((item, i) => (
											<TableRow key={item.customer_id}>
												<TableCell className="py-2 pl-4">
													{tableSrCount(data.top_customers.current_page, i)}
												</TableCell>
												<TableCell className="py-2">
													<Badge variant="outline">
														{item.customer.customer_id}
													</Badge>
												</TableCell>
												<TableCell className="py-2">
													{textCount(item.customer.customer_name, 20)}
												</TableCell>
												<TableCell className="py-2">
													{item.customer.email || 'N/A'}
												</TableCell>
												<TableCell className="py-2">
													{item.customer.phone}
												</TableCell>
												<TableCell className="py-2">
													<Badge className="capitalize" variant="default">
														{item.order_count} Orders
													</Badge>
												</TableCell>
												<TableCell className="py-2">
													<Badge
														className="capitalize"
														variant={
															item.customer.status === 'active'
																? 'default'
																: 'secondary'
														}
													>
														{item.customer.status}
													</Badge>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
						<Pagination1 pagination={data?.top_customers} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
