'use client';

import { Button } from '@/components/ui/button';
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { badgeFormat, dateFormat, sign, tableSrCount, textCount } from '@/lib';

import { iPagination } from '@/types';
import { Ellipsis, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { AdminAdvertiseDelete } from './admin.advertise.delete';
import { iAdminAdvertise } from './admin.advertise.type';
export function AdminAdvertiseTable({
	data,
}: {
	data: iPagination<iAdminAdvertise>;
}) {
	const advertises = data.data;
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
									href={`/admin/advertise/${item.id}`}
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
							</TableCell>
							<TableCell className="py-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
											size="icon"
										>
											<Ellipsis />
											<span className="sr-only">Open menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="w-56">
										<DropdownMenuItem>
											<Link
												className="flex items-center gap-2 w-full"
												href={`/admin/service/${item.id}`}
											>
												<ExternalLink className="size-4" />
												<span>View Advertise</span>
											</Link>
										</DropdownMenuItem>

										<DropdownMenuSeparator />

										{/* Delete Product  */}
										<AdminAdvertiseDelete data={item} />
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
