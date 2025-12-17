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
import { badgeFormat, dateFormat, tableSrCount, textCount } from '@/lib';
import { useState } from 'react';
import { useVendorProfileNoteQuery } from './vendor-profile-api-slice';

export function VendorProfileNote() {
	const [page, setPage] = useState(1);

	const { data, isLoading, isError, isFetching } = useVendorProfileNoteQuery({
		page: page as number,
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
							<TableHead className="bg-stone-100">Note </TableHead>
							<TableHead className="bg-stone-100">Status </TableHead>
							<TableHead className="bg-stone-100">Date </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.notes?.data?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className="text-center py-8 text-muted-foreground"
								>
									No users found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							data?.notes?.data?.map((item, i) => (
								<TableRow key={item.id}>
									<TableCell className="font-medium py-4">
										{tableSrCount(data.notes.current_page, i)}
									</TableCell>

									<TableCell className="py-2">
										{textCount(item.note, 100)}
									</TableCell>

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

			<Pagination1 pagination={data.notes} setPage={setPage} />
		</div>
	);
}
