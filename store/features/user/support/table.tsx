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

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { dateFormat, tableSrCount, timeFormat } from '@/lib';

import { iPagination } from '@/types';
import { Ellipsis, ExternalLink, Pencil } from 'lucide-react';
import Link from 'next/link';
import { iUserSupport } from './type';

export function UserSupportTable({
	data,
}: {
	data: iPagination<iUserSupport>;
}) {
	const products = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100">Ticket ID </TableHead>
					<TableHead className="bg-stone-100">Subject</TableHead>
					<TableHead className="bg-stone-100">Description</TableHead>
					<TableHead className="bg-stone-100">Category</TableHead>
					<TableHead className="bg-stone-100">Problem Topic </TableHead>
					<TableHead className="bg-stone-100">rating</TableHead>
					<TableHead className="bg-stone-100">Status</TableHead>
					<TableHead className="bg-stone-100">Date</TableHead>
					<TableHead className="bg-stone-100">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={11}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					products?.map((item, i) => (
						<TableRow key={item.id}>
							<TableCell className="py-2 pl-4">
								{tableSrCount(data.current_page, i)}
							</TableCell>
							<TableCell className="font-medium py-4">
								#{item.ticket_no}
							</TableCell>
							<TableCell className="py-2">{item.subject || '-'}</TableCell>
							<TableCell className="py-2">{item.description || '-'}</TableCell>
							<TableCell className="py-2">
								{item?.category?.name || '-'}
							</TableCell>
							<TableCell className="py-2">
								{item?.problem_topic?.name || '-'}
							</TableCell>
							<TableCell className="py-2">{item.rating || '-'}</TableCell>
							<TableCell className="py-2">{item.status || '-'}</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.created_at)}
								<br />
								{timeFormat(item.created_at)}
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
												href={`/support/${item.id}`}
											>
												<ExternalLink className="size-4" />
												<span>View Support</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Link
												className="flex items-center gap-2 w-full"
												href={`/support/${item.id}/edit`}
											>
												<Pencil className="size-4" />
												<span>Edit Support</span>
											</Link>
										</DropdownMenuItem>
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
