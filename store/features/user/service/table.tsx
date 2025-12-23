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

import { Button } from '@/components/ui/button';
import { iPagination } from '@/types';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { iAdminServiceOrder } from '../../admin/service';
export function UserServiceTable({
	data,
}: {
	data: iPagination<iAdminServiceOrder>;
}) {
	const services = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100 w-10">Order Id</TableHead>
					<TableHead className="bg-stone-100">Service </TableHead>
					<TableHead className="bg-stone-100">Seller Name </TableHead>
					<TableHead className="bg-stone-100">Amount </TableHead>
					<TableHead className="bg-stone-100"> Details </TableHead>
					<TableHead className="bg-stone-100">Date </TableHead>
					<TableHead className="bg-stone-100">Status </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{services.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={10}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					services?.map((item, i) => {
						return (
							<TableRow key={item.id}>
								<TableCell className="py-2 pl-4">
									{tableSrCount(data.current_page, i)}
								</TableCell>
								<TableCell className="font-medium py-4">
									{item.trxid ? `#${item.trxid}` : '--'}
								</TableCell>

								<TableCell className="py-2">
									{item?.servicedetails ? (
										<Link
											className="hover:underline hover:text-blue-500 transition"
											href={`/user/order/${item.id}`}
										>
											{textCount(item?.servicedetails?.title, 20)}
										</Link>
									) : (
										'--'
									)}
								</TableCell>
								<TableCell className="py-2">
									<Link
										className="hover:underline hover:text-blue-500 transition"
										href={`/user/order/${item.id}`}
									>
										{item?.customerdetails?.name}
									</Link>
								</TableCell>

								<TableCell className="py-2">
									<Badge className="capitalize" variant="default">
										{item?.amount || '00'} {sign.tk}
									</Badge>
								</TableCell>
								<TableCell className="py-2">
									{textCount(item?.details, 70)}
								</TableCell>
								<TableCell className="py-2">
									{dateFormat(item.created_at)} <br />
									{timeFormat(item.created_at)}
								</TableCell>
								<TableCell className="py-2 space-y-1">
									<Badge
										className="capitalize"
										variant={badgeFormat(item.status)}
									>
										{item.status}
									</Badge>
									{item.is_rejected === '1' && (
										<>
											<br />
											<Badge className="capitalize" variant="destructive">
												Rejected
											</Badge>
										</>
									)}
								</TableCell>
								<TableCell className="py-2">
									<Link href={`/user/order/${item.id}`}>
										<Button variant="outline" size="icon">
											<Eye className="size-4" />
										</Button>
									</Link>
								</TableCell>
							</TableRow>
						);
					})
				)}
			</TableBody>
		</Table>
	);
}
