'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Loader6, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { badgeFormat, dateFormat, textCount } from '@/lib';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useAdminVendorServiceOrderQuery } from '../service';

export function AdminUserService() {
	const params = useParams();
	const [page, setPage] = useState(1);

	const { data, isLoading, isError, isFetching } =
		useAdminVendorServiceOrderQuery({
			id: params.id as string,
			page,
		});

	if (isLoading) {
		return (
			<div className="space-y-4">
				<Loader6 />
				<Loader6 />
			</div>
		);
	}

	if (isError || !data) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Some thing went wrong</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-destructive">
						Please try again later. or contact to support
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="w-full ">
			{/* Table */}
			<div className="border rounded-lg relative">
				{isFetching && <Loader8 />}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="bg-stone-100">ID </TableHead>
							<TableHead className="bg-stone-100">Service</TableHead>
							<TableHead className="bg-stone-100">Seller Name</TableHead>
							<TableHead className="bg-stone-100">Amount</TableHead>
							<TableHead className="bg-stone-100">Details</TableHead>
							<TableHead className="bg-stone-100">Date</TableHead>
							<TableHead className="bg-stone-100">Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.serviceOrder?.data?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className="text-center py-8 text-muted-foreground"
								>
									No users found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							data?.serviceOrder?.data?.map((item) => (
								<TableRow key={item.id}>
									<TableCell className="font-medium py-4">
										#{item.trxid}
									</TableCell>
									<TableCell className="py-2">
										{textCount(item?.customerdetails?.name, 20)}
									</TableCell>
									<TableCell className="py-2">{item?.amount}</TableCell>
									<TableCell className="py-2">
										{textCount(item?.details, 20)}
									</TableCell>
									<TableCell className="py-2">
										{textCount(item?.servicedetails?.title, 20)}
									</TableCell>

									<TableCell className="py-2">
										{dateFormat(item.created_at)}
									</TableCell>
									<TableCell className="py-2">
										<Badge variant={badgeFormat(item?.status)}>
											{item?.status}
										</Badge>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<Pagination1 pagination={data.serviceOrder} setPage={setPage} />
		</div>
	);
}
