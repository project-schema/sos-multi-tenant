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
import { useAdminVendorAdvertiseQuery } from '../advertise';

export function AdminUserServiceAdvertisement() {
	const params = useParams();
	const [page, setPage] = useState(1);

	const { data, isLoading, isError, isFetching } = useAdminVendorAdvertiseQuery(
		{
			id: params.id as string,
			page,
		}
	);

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
							<TableHead className="bg-stone-100">Campaign name </TableHead>
							<TableHead className="bg-stone-100">Campaign objective</TableHead>
							<TableHead className="bg-stone-100">Budget amount </TableHead>
							<TableHead className="bg-stone-100">Start date </TableHead>
							<TableHead className="bg-stone-100">End date </TableHead>
							<TableHead className="bg-stone-100">Status </TableHead>
							<TableHead className="bg-stone-100">Date </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.advertise?.data?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={8}
									className="text-center py-8 text-muted-foreground"
								>
									No users found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							data?.advertise?.data?.map((item) => (
								<TableRow key={item.id}>
									<TableCell className="font-medium py-4">
										#{item.unique_id}
									</TableCell>
									<TableCell className="font-medium py-4">
										{textCount(item.campaign_name, 20)}
									</TableCell>
									<TableCell className="font-medium py-4">
										{textCount(item.campaign_objective, 20)}
									</TableCell>
									<TableCell className="font-medium py-4">
										{textCount(item.campaign_objective, 20)}
									</TableCell>
									<TableCell className="py-2">
										<Badge variant="outline">{item.budget_amount}</Badge>
									</TableCell>
									<TableCell className="py-2">{item.start_date}</TableCell>
									<TableCell className="py-2">{item.end_date}</TableCell>
									<TableCell className="py-2">
										<Badge variant={badgeFormat(item.status)}>
											{item.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2">
										{dateFormat(item.created_at)}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<Pagination1 pagination={data.advertise} setPage={setPage} />
		</div>
	);
}
