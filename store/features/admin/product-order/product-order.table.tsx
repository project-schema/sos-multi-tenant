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
import {
	badgeFormat,
	changeOrderStatusText,
	dateFormat,
	sign,
	tableSrCount,
	textCount,
	timeFormat,
} from '@/lib';

import { ClickToCopy } from '@/hooks/use-copy';
import { iPagination } from '@/types';
import { Ellipsis, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { AdminProductOrderStatusCancel } from './admin-product-order-status-cancel';
import { AdminProductOrderStatus } from './admin-product.order-status';
import { iAdminProductOrder } from './product-order.type';
export function AdminProductOrderTable({
	data,
}: {
	data: iPagination<iAdminProductOrder>;
}) {
	const products = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100 w-10">Order Id</TableHead>
					<TableHead className="bg-stone-100">Courier</TableHead>
					<TableHead className="bg-stone-100">Product </TableHead>
					<TableHead className="bg-stone-100">Drop Shipper/Customer</TableHead>
					<TableHead className="bg-stone-100">Order Media</TableHead>
					<TableHead className="bg-stone-100"> Merchant </TableHead>
					<TableHead className="bg-stone-100">Items </TableHead>
					<TableHead className="bg-stone-100">Price </TableHead>
					<TableHead className="bg-stone-100">Commission </TableHead>
					<TableHead className="bg-stone-100">Date </TableHead>
					<TableHead className="bg-stone-100">Status </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
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
					products?.map((item, i) => {
						const qtyTotal = item?.variants?.map((e) => parseInt(e.qty));
						return (
							<TableRow key={`${item.id}-${item.order_id}`}>
								<TableCell className="py-2 pl-4">
									{tableSrCount(data.current_page, i)}
								</TableCell>
								<TableCell className="font-medium py-4">
									{item.order_id ? `#${item.order_id}` : '--'}
								</TableCell>
								<TableCell className="font-medium py-4">
									<p>{item?.consignment_id ? item?.courier_name : ''}</p>
									<p>
										{item?.consignment_id ? (
											<>{`#${item?.consignment_id}`}</>
										) : (
											'--'
										)}
										{item?.consignment_id && (
											<ClickToCopy text={item?.consignment_id} />
										)}
									</p>
								</TableCell>

								<TableCell className="py-2">
									{item?.product?.id ? (
										<Link
											className="hover:underline hover:text-blue-500 transition"
											href={`/admin/merchant-product/${item.id}`}
										>
											{textCount(item?.product?.name, 15)}
										</Link>
									) : (
										'--'
									)}
								</TableCell>
								<TableCell className="py-2">
									<Link
										className="hover:underline hover:text-blue-500 transition"
										href={`/admin/merchant-product/${item.id}`}
									>
										{item?.affiliator
											? textCount(item?.affiliator?.name)
											: textCount(item?.name)}
									</Link>
								</TableCell>
								<TableCell className="py-2">
									<Badge
										className="capitalize"
										variant={badgeFormat(item?.order_media)}
									>
										{item?.order_media === 'Direct'
											? 'Direct'
											: item.order_media === 'Woocommerce'
											? 'Woocommerce'
											: 'Drop Shipper'}
									</Badge>
								</TableCell>
								<TableCell className="py-2">
									<Link
										className="hover:underline hover:text-blue-500 transition"
										href={`/admin/users/${item?.vendor?.id}`}
									>
										{textCount(item?.vendor?.name, 15)}
									</Link>
								</TableCell>

								<TableCell className="py-2">
									<Badge className="capitalize" variant="default">
										{qtyTotal?.reduce((pre, cur) => pre + cur) || 0}
									</Badge>
								</TableCell>
								<TableCell className="py-2">
									<Badge className="capitalize" variant="outline">
										{item?.afi_amount || '00'} {sign.tk}
									</Badge>
								</TableCell>
								<TableCell className="py-2">
									<Badge className="capitalize" variant="success">
										{item?.product_amount || '00'} {sign.tk}
									</Badge>
								</TableCell>
								<TableCell className="py-2">
									{dateFormat(item.created_at)} <br />
									{timeFormat(item.created_at)}
								</TableCell>
								<TableCell className="py-2">
									<Badge
										className="capitalize"
										variant={badgeFormat(item.status)}
									>
										{changeOrderStatusText(item.status)}
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
													<span>View Product</span>
												</Link>
											</DropdownMenuItem>
											{/*
											If the order status is "pending", show the option to
											mark it as "received"
											*/}
											{item?.status === 'pending' && (
												<AdminProductOrderStatus
													data={item}
													icon="PackageCheck"
													status="received"
													text="Order Received"
												/>
											)}
											{/* If the order status is "received", show the option to
											mark it as "processing" */}
											{item?.status === 'received' && (
												<AdminProductOrderStatus
													data={item}
													icon="PackageSearch"
													status="processing"
													text="Product Processing"
												/>
											)}
											{/*If the order status is "processing", show the option to
											mark it as "ready"*/}
											{item?.status === 'processing' && (
												<AdminProductOrderStatus
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
												<AdminProductOrderStatus
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
												<AdminProductOrderStatusCancel data={item} />
											)}
											{/* If the order is "in delivery" (progress), allow marking
											as delivered or returned */}
											{item?.status === 'progress' && (
												<>
													<AdminProductOrderStatus
														data={item}
														icon="CheckCircle2"
														status="delivered"
														text="Product Delivered"
													/>
													<AdminProductOrderStatus
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
						);
					})
				)}
			</TableBody>
		</Table>
	);
}
