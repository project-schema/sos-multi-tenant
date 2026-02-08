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
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { badgeFormat, dateFormat, sign, tableSrCount, timeFormat } from '@/lib';

import { iPagination } from '@/types';
import { Ellipsis, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { VendorProductOrderStatus } from './vendor-product-order-status';
import { VendorProductOrderStatusCancel } from './vendor-product-order-status-cancel';
import { iVendorProductOrder } from './vendor-product-order-type';

export function VendorProductOrderTable({
	data,
}: {
	data: iPagination<iVendorProductOrder>;
}) {
	const products = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100">Order ID</TableHead>
					<TableHead className="bg-stone-100">Courier</TableHead>
					<TableHead className="bg-stone-100">Product</TableHead>
					<TableHead className="bg-stone-100">
						Drop Shipper / Customer
					</TableHead>
					<TableHead className="bg-stone-100">Order Media</TableHead>
					<TableHead className="bg-stone-100">Items</TableHead>
					<TableHead className="bg-stone-100">Price</TableHead>
					<TableHead className="bg-stone-100">Commission</TableHead>
					<TableHead className="bg-stone-100">Date</TableHead>
					<TableHead className="bg-stone-100">Status</TableHead>
					<TableHead className="bg-stone-100">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={13}
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
								#{item.order_id}
							</TableCell>
							<TableCell className="py-2">{item.courier_name || '-'}</TableCell>
							<TableCell className="py-2">#{item.product_id}</TableCell>
							<TableCell className="py-2">{item.name || '-'}</TableCell>
							<TableCell className="py-2">{item.order_media || '-'}</TableCell>
							<TableCell className="py-2">
								<Badge variant="default">{item.qty || 0}</Badge>
							</TableCell>
							<TableCell className="py-2">
								<Badge variant="info">
									{item.product_amount} {sign.tk}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								<Badge variant="outline">
									{Number((item as any).afi_amount) || 0} {sign.tk}
								</Badge>
							</TableCell>
							<TableCell className="py-0">
								{dateFormat(item.created_at)} <br />
								{timeFormat(item.created_at)}
							</TableCell>
							<TableCell className="py-2">
								<Badge
									className="capitalize"
									variant={badgeFormat(item.status)}
								>
									{item.status}
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
												href={`/admin/merchant-product/${item.id}`}
											>
												<ExternalLink className="size-4" />
												<span>View Product {item.status}</span>
											</Link>
										</DropdownMenuItem>
										{/*
											If the order status is "hold", show the option to
											mark it as "received"
											*/}
										{item?.status === 'hold' && (
											<VendorProductOrderStatus
												data={item}
												icon="Clock"
												status="pending"
												text="Order Pending"
											/>
										)}
										{/*
											If the order status is "pending", show the option to
											mark it as "received"
											*/}
										{item?.status === 'pending' && (
											<VendorProductOrderStatus
												data={item}
												icon="PackageCheck"
												status="received"
												text="Order Received"
											/>
										)}
										{/* If the order status is "received", show the option to
											mark it as "processing" */}
										{item?.status === 'received' && (
											<VendorProductOrderStatus
												data={item}
												icon="PackageSearch"
												status="processing"
												text="Product Processing"
											/>
										)}
										{/*If the order status is "processing", show the option to
											mark it as "ready"*/}
										{item?.status === 'processing' && (
											<VendorProductOrderStatus
												data={item}
												icon="Box"
												status="ready"
												text="Product Ready"
											/>
										)}
										{/* If the order status is NOT one of these (hold, pending,
											progress, cancel, delivered), // then show the option to
											mark it as "in delivery" (progress) */}
										{![
											'hold',
											'pending',
											'progress',
											'cancel',
											'delivered',
										].includes(item?.status) && (
											<VendorProductOrderStatus
												data={item}
												icon="Truck"
												status="progress"
												text="Delivery Processing"
											/>
										)}
										{/* If the status is one of the "in-process" states, allow
											the admin to cancel the order */}
										{[
											'ready',
											'processing',
											'received',
											'pending',
											'hold',
										].includes(item?.status) && (
											<VendorProductOrderStatusCancel data={item} />
										)}
										{/* If the order is "in delivery" (progress), allow marking
											as delivered or returned */}
										{item?.status === 'progress' && (
											<>
												<VendorProductOrderStatus
													data={item}
													icon="CheckCircle2"
													status="delivered"
													text="Product Delivered"
												/>
												<VendorProductOrderStatus
													data={item}
													icon="RotateCcw"
													status="return"
													text="Product Return"
												/>
											</>
										)}
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
