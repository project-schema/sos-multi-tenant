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
import { tableSrCount, textCount } from '@/lib';

import { iPagination } from '@/types';
import { iVendorPurchasePaymentHistory } from './vendor-purchase-type';

export function VendorPurchasePaymentTable({
	data,
}: {
	data: iPagination<iVendorPurchasePaymentHistory>;
}) {
	const products = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100 w-10">Chalan no </TableHead>
					<TableHead className="bg-stone-100">Supplier Business Name</TableHead>
					<TableHead className="bg-stone-100">Payment Method </TableHead>
					<TableHead className="bg-stone-100">Amount</TableHead>
					<TableHead className="bg-stone-100">Payment Date </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={6}
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
								#{item?.chalan_no}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item?.supplier?.supplier_name, 30)}
							</TableCell>

							<TableCell className="py-2">
								{item?.payment_method?.payment_method_name}
							</TableCell>

							<TableCell className="py-2">
								<Badge variant="success">{item?.paid_amount}</Badge>
							</TableCell>

							<TableCell className="py-2">{item?.date}</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
