'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import {
	badgeFormat,
	dateFormat,
	sign,
	tableSrCount,
	textCount,
	timeFormat,
} from '@/lib';

import { iPagination } from '@/types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { iUserAdvertise } from './type';
export function UserAdvertiseTable({
	data,
}: {
	data: iPagination<iUserAdvertise>;
}) {
	const advertises = data.data;
	const { data: session } = useSession();
	console.log({ session });
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100 w-10">ID</TableHead>

					<TableHead className="bg-stone-100">Campaign Name </TableHead>
					<TableHead className="bg-stone-100">Campaign Objective </TableHead>
					<TableHead className="bg-stone-100">Budget Amount </TableHead>
					<TableHead className="bg-stone-100">Start Date </TableHead>
					<TableHead className="bg-stone-100">End Date </TableHead>

					<TableHead className="bg-stone-100">Status </TableHead>
					<TableHead className="bg-stone-100">Created At</TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{advertises.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={10}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					advertises?.map((item, i) => (
						<TableRow key={item.id}>
							<TableCell className="py-2 pl-4">
								{tableSrCount(data.current_page, i)}
							</TableCell>
							<TableCell className="font-medium py-4">
								#{item.unique_id}
							</TableCell>

							<TableCell className="py-2">
								<Link
									className="hover:underline hover:text-blue-500 transition"
									href={`/user/advertise/${item.id}`}
								>
									{textCount(item.campaign_name, 20)}
								</Link>
							</TableCell>
							<TableCell className="py-2">
								{textCount(item.campaign_objective, 20)}
							</TableCell>

							<TableCell className="py-2">
								<Badge className="capitalize" variant="default">
									{sign.dollar}
									{item.budget_amount}
								</Badge>
							</TableCell>
							<TableCell className="py-2">{item.start_date}</TableCell>
							<TableCell className="py-2">{item.end_date}</TableCell>
							<TableCell className="py-2">
								<Badge
									className="capitalize"
									variant={badgeFormat(item.status)}
								>
									{item.status}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.created_at)}
								<br />
								{timeFormat(item.created_at)}
							</TableCell>
							<TableCell className="py-2">
								<Link href={`/user/advertise/${item.id}`}>
									<Button variant="outline" size="icon">
										<Eye className="size-4" />
										<span className="sr-only">View</span>
									</Button>
								</Link>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
