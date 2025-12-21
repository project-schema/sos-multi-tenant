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
import { badgeFormat, dateFormat, env, tableSrCount, textCount } from '@/lib';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { iPagination } from '@/types';
import { Ellipsis, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { DropshipperAcceptRequest } from './dropshipper-accept-request.active';
import { DropshipperRejectRequest } from './dropshipper.reject-modal';
export function DropshipperProductTable({ data }: { data: iPagination<any> }) {
	const products = data?.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100 w-10">ID</TableHead>
					<TableHead className="bg-stone-100">Image</TableHead>
					<TableHead className="bg-stone-100">Product Name </TableHead>
					<TableHead className="bg-stone-100">Drop Shipper Name </TableHead>
					<TableHead className="bg-stone-100">Date </TableHead>
					<TableHead className="bg-stone-100">Status </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products?.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={10}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					products?.map((item, i) => (
						<TableRow key={item.id}>
							<TableCell className="py-2 pl-4">
								{tableSrCount(data?.current_page, i)}
							</TableCell>
							<TableCell className="font-medium py-4">#{item.uniqid}</TableCell>
							<TableCell className="py-2">
								<Link
									href={`/dashboard/dropshipper-request/${item?.product?.id}`}
								>
									<Avatar className="h-12 w-12 rounded-xl">
										<AvatarImage
											src={env.baseAPI + '/' + item?.product?.image}
											alt={item?.product?.name || 'N/A'}
										/>
										<AvatarFallback className="rounded-xl bg-sky-100">
											{item?.product?.name?.charAt(0).toUpperCase() || 'N/A'}
										</AvatarFallback>
									</Avatar>
								</Link>
							</TableCell>
							<TableCell className="py-2">
								<Link
									className="hover:underline hover:text-blue-500 transition"
									href={`/dashboard/dropshipper-request/${item.id}`}
								>
									{textCount(item?.product?.name || 'N/A', 15)}
								</Link>
							</TableCell>
							<TableCell className="py-2">
								<Link
									className="hover:underline hover:text-blue-500 transition"
									href={`/admin/users/${item?.vendor?.id}`}
								>
									{textCount(item?.tenant_name, 15)}
								</Link>
							</TableCell>

							<TableCell className="py-2">
								{dateFormat(item.created_at)}
							</TableCell>
							<TableCell className="py-2">
								<Badge
									className="capitalize"
									variant={badgeFormat(item.status)}
								>
									{item.status === 1
										? 'Active'
										: item.status === 2
										? 'Pending'
										: 'Rejected'}
								</Badge>
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
												href={`/dashboard/dropshipper-request/${item.id}`}
											>
												<ExternalLink className="size-4" />
												<span>View Product</span>
											</Link>
										</DropdownMenuItem>

										{item.status !== 1 && (
											<DropshipperAcceptRequest data={item} />
										)}

										<DropdownMenuSeparator />

										{/* Delete Product  */}
										<DropshipperRejectRequest data={item} />
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
