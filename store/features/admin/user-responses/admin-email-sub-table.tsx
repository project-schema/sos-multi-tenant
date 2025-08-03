'use client';
import { Loader5, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { CardContent, CardHeader } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ErrorAlert } from '@/lib';
import { useState } from 'react';
import { useAdminEmailSubscriberQuery } from './user-responses.api.slice';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQueryParams } from '@/hooks/useQueryParams';
import { dateFormat, tableSrCount, timeFormat } from '@/lib';
import Link from 'next/link';
export function AdminEmailSubTable() {
	const { getParam } = useQueryParams();
	const tab = getParam('tab');

	const [page, setPage] = useState(1);
	const { data, isLoading, isFetching, isError } = useAdminEmailSubscriberQuery(
		{
			page,
		}
	);
	if (isError) {
		return <ErrorAlert />;
	}
	return (
		<>
			<CardHeader className="pb-3 flex gap-3">
				<Link href={'/admin/user-responses'}>
					<Button variant={tab !== 'contact' ? 'default' : 'outline'}>
						Email Subscribers
					</Button>
				</Link>
				<Link href={'/admin/user-responses?tab=contact'}>
					<Button variant={tab === 'contact' ? 'default' : 'outline'}>
						Contact Messages
					</Button>
				</Link>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Table */}
				{isLoading ? (
					<>
						<Loader5 />
						<Loader5 />
						<Loader5 />
					</>
				) : (
					<>
						{data && (
							<>
								<div className="border rounded-lg relative">
									{isFetching && <Loader8 />}
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead className="bg-stone-100">Sr.</TableHead>
												<TableHead className="bg-stone-100">Email</TableHead>
												<TableHead className="bg-stone-100">Date</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{data?.data?.length === 0 ? (
												<TableRow>
													<TableCell
														colSpan={3}
														className="text-center py-8 text-muted-foreground"
													>
														No items found matching your criteria
													</TableCell>
												</TableRow>
											) : (
												data?.data?.map((item, i) => {
													return (
														<TableRow key={item.id}>
															<TableCell className="py-2 pl-4">
																{tableSrCount(data.current_page, i)}
															</TableCell>
															<TableCell className="py-2">
																<Badge variant="outline">{item?.email}</Badge>
															</TableCell>
															<TableCell className="py-2">
																{dateFormat(item.created_at)} <br />
																{timeFormat(item.created_at)}
															</TableCell>
														</TableRow>
													);
												})
											)}
										</TableBody>
									</Table>
								</div>
								<Pagination1 pagination={data} setPage={setPage} />
							</>
						)}
					</>
				)}
			</CardContent>
		</>
	);
}
