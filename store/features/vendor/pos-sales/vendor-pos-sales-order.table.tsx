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
import { badgeFormat, sign, tableSrCount, textCount } from '@/lib';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { iPagination } from '@/types';
import { Ellipsis, ExternalLink, LoaderCircle, PackageX } from 'lucide-react';

import Link from 'next/link';
import { useVendorPosSalesAddPaymentMutation } from './vendor-pos-sales.api-slice';
import { iVendorPosSalesOrder } from './vendor-pos-sales.type';
import { VendorPosSellPaymentModal } from './vendor-pos-sell-payment-modal';

export function VendorPosSalesOrderTable({
	data,
}: {
	data: iPagination<iVendorPosSalesOrder>;
}) {
	const advertises = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">SL.</TableHead>
					<TableHead className="bg-stone-100 w-10">Invoice no </TableHead>
					<TableHead className="bg-stone-100"> Customer Name </TableHead>
					<TableHead className="bg-stone-100">Order Source </TableHead>
					<TableHead className="bg-stone-100">Sales Date </TableHead>
					<TableHead className="bg-stone-100">Payment Status </TableHead>
					<TableHead className="bg-stone-100">Amount </TableHead>
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
								#{item.barcode}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item?.customer?.customer_name, 20)}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item?.source.name, 15)}
							</TableCell>
							<TableCell className="py-2">{item?.sale_date}</TableCell>

							<TableCell className="py-2">
								<Badge
									className="capitalize"
									variant={badgeFormat(item.payment_status)}
								>
									{item.payment_status}{' '}
									{item?.payment_status === 'due' &&
										`(${item?.due_amount} ${sign.tk})`}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								<Badge className="capitalize" variant="success">
									{item?.total_price} {sign.tk}
								</Badge>
							</TableCell>

							<TableCell className="py-2">
								<DropDownAction item={item} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
const DropDownAction = ({ item }: { item: iVendorPosSalesOrder }) => {
	const [, { isLoading }] = useVendorPosSalesAddPaymentMutation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
					size="icon"
					disabled={isLoading}
				>
					{isLoading ? (
						<LoaderCircle className="size-4 animate-spin text-destructive" />
					) : (
						<Ellipsis />
					)}
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuItem>
					<Link
						className="flex items-center gap-2 w-full"
						href={`/pos-sales/${item.id}/invoice`}
					>
						<ExternalLink className="size-4" />
						<span>View Invoice </span>
					</Link>
				</DropdownMenuItem>
				{item?.payment_status !== 'paid' && (
					<VendorPosSellPaymentModal data={item} />
				)}
				<DropdownMenuItem>
					<Link
						className="flex items-center gap-2 w-full"
						href={`/pos-sales/${item.id}/return`}
					>
						<PackageX className="size-4" />
						<span>Sell Return </span>
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
