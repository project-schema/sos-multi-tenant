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
import {
	badgeFormat,
	dateFormat,
	sign,
	tableSrCount,
	textCount,
	timeFormat,
} from '@/lib';

import { iPagination } from '@/types';
import { Ellipsis, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { AdminServiceOrderStatus } from './admin-service-order-status';
import { AdminServiceOrderCancelReq } from './admin-sevice-order-cancel-req';
import { AdminServiceOrderStatusAccept } from './admin-sevice-order-cancel-req-accept';
import { AdminServiceOrderStatusCancel } from './admin-sevice-order-cancel-req-cancel';
import { iAdminServiceOrder } from './service-order.type';
export function AdminServiceOrderTable({
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
					<TableHead className="bg-stone-100">User Name </TableHead>
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
											href={`/admin/merchant-product/${item.id}`}
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
										href={`/admin/users/${item.id}`}
									>
										{item?.customerdetails?.name}
									</Link>
								</TableCell>
								<TableCell className="py-2">
									<Link
										className="hover:underline hover:text-blue-500 transition"
										href={`/admin/users/${item.id}`}
									>
										{item?.vendor?.name}
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
													href={`/admin/merchant-product/${item.id}`}
												>
													<ExternalLink className="size-4" />
													<span>View Product</span>
												</Link>
											</DropdownMenuItem>

											<DropdownMenuSeparator />

											{item.status !== 'revision' && (
												<AdminServiceOrderCancelReq data={item} />
											)}

											{item.is_rejected === '1' &&
												item.status !== 'canceled' && (
													<>
														<AdminServiceOrderStatusAccept data={item} />
														<AdminServiceOrderStatusCancel data={item} />
													</>
												)}

											<DropdownMenuSeparator />
											{item.status !== 'pending' && (
												<AdminServiceOrderStatus
													data={item}
													icon="Clock"
													status="pending"
													text="Pending"
												/>
											)}

											{item.status !== 'progress' && (
												<AdminServiceOrderStatus
													data={item}
													icon="Loader"
													status="progress"
													text="In Progress"
												/>
											)}

											{item.status !== 'delivered' && (
												<AdminServiceOrderStatus
													data={item}
													icon="Truck"
													status="delivered"
													text="Delivered"
												/>
											)}

											{item.status !== 'revision' && (
												<AdminServiceOrderStatus
													data={item}
													icon="RotateCcw"
													status="revision"
													text="Revision Requested"
												/>
											)}

											{item.status !== 'success' && (
												<AdminServiceOrderStatus
													data={item}
													icon="CheckCircle2"
													status="success"
													text="Service Completed Successfully"
												/>
											)}

											<DropdownMenuSeparator />

											{item.status !== 'cancel' && (
												<AdminServiceOrderStatus
													data={item}
													icon="XCircle"
													status="cancel"
													text="Service Cancelled"
													type="destructive"
												/>
											)}
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						);
					})
				)}
			</TableBody>
		</Table>
	);
}
