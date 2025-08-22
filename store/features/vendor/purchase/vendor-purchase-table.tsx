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
import { badgeFormat, sign, tableSrCount, textCount } from '@/lib';

import { iPagination } from '@/types';
import { Ellipsis, ExternalLink, PackageX } from 'lucide-react';
import Link from 'next/link';
import { VendorPurchasePaymentModal } from './vendor-purchase-payment-modal';
import { VendorPurchaseStatusReceive } from './vendor-purchase-status-receive';
import { iVendorPurchase } from './vendor-purchase-type';

export function VendorPurchaseTable({
	data,
}: {
	data: iPagination<iVendorPurchase>;
}) {
	const products = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100 w-10">Invoice no </TableHead>
					<TableHead className="bg-stone-100">Supplier Business Name</TableHead>
					<TableHead className="bg-stone-100">Purchase Date </TableHead>
					<TableHead className="bg-stone-100">Purchase Qty </TableHead>
					<TableHead className="bg-stone-100">Return Qty </TableHead>
					<TableHead className="bg-stone-100">Amount </TableHead>
					<TableHead className="bg-stone-100">Payment Status </TableHead>
					<TableHead className="bg-stone-100">Purchase Status </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.length === 0 ? (
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
								{tableSrCount(data.current_page, i)}
							</TableCell>
							<TableCell className="font-medium py-4">
								#{item.chalan_no}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item.supplier.business_name, 30)}
							</TableCell>

							<TableCell className="py-2">{item.purchase_date}</TableCell>

							<TableCell className="py-2">
								<Badge variant="success">{item.total_qty}</Badge>
							</TableCell>

							<TableCell className="py-2">{item.return_qty}</TableCell>
							<TableCell className="py-2">
								<Badge className="capitalize" variant="default">
									{item.total_price} {sign.tk}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								<Badge
									className="capitalize"
									variant={badgeFormat(item.payment_status)}
								>
									{item.payment_status}
								</Badge>
								{item.payment_status === 'due' && (
									<Badge className="capitalize ml-2" variant="destructive">
										{item.due_amount} {sign.tk}
									</Badge>
								)}
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
												href={`/purchase/invoice/${item.id}`}
											>
												<ExternalLink className="size-4" />
												<span>View Invoice</span>
											</Link>
										</DropdownMenuItem>

										{item.status !== 'received' && (
											<VendorPurchaseStatusReceive data={item} />
										)}

										{item.payment_status === 'due' && (
											<VendorPurchasePaymentModal data={item} />
										)}

										{item.status === 'received' && (
											<DropdownMenuItem>
												<Link
													className="flex items-center gap-2 w-full"
													href={`/purchase/return/${item.id}`}
												>
													<PackageX className="size-4" />
													<span>Return Purchase</span>
												</Link>
											</DropdownMenuItem>
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
