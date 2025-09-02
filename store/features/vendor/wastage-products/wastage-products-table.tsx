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
import { dateFormat, tableSrCount, textCount } from '@/lib';
import { iVendorWastageListResponse } from './wastage-products-type';

export function VendorWastageProductsTable({
	data,
}: {
	data: iVendorWastageListResponse['return_list'];
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">SL.</TableHead>
					<TableHead className="bg-stone-100 w-10">Barcode</TableHead>
					<TableHead className="bg-stone-100">Customer</TableHead>
					<TableHead className="bg-stone-100">Wastage Qty</TableHead>
					<TableHead className="bg-stone-100">Wastage Amount</TableHead>
					<TableHead className="bg-stone-100">Sale Date</TableHead>
					<TableHead className="bg-stone-100">Wastage Date</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={7}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					data?.map((item, i) => (
						<TableRow key={item.id}>
							<TableCell className="py-2 pl-4">{tableSrCount(1, i)}</TableCell>
							<TableCell className="font-medium py-4">
								{textCount(item?.barcode, 20)}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item?.customer?.customer_name, 20)}
							</TableCell>
							<TableCell className="py-2">
								<Badge className="capitalize" variant="success">
									{item?.wastage_qty}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								<Badge className="capitalize" variant="destructive">
									৳{item?.wastage_amount}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								{dateFormat(item?.sale_date)}
							</TableCell>
							<TableCell className="py-2">
								{dateFormat(item?.wastage_date)}
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
