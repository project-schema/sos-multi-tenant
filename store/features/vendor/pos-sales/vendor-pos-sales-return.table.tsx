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
import { sign, tableSrCount, textCount } from '@/lib';

import { iVendorPosSalesAllReturnResponse } from './vendor-pos-sales.type';

export function VendorPosSalesReturnTable({
	data,
}: {
	data: iVendorPosSalesAllReturnResponse['return_list'][];
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">SL.</TableHead>
					<TableHead className="bg-stone-100 w-10">Invoice no </TableHead>
					<TableHead className="bg-stone-100"> Customer Name </TableHead>
					<TableHead className="bg-stone-100">Sales Date </TableHead>
					<TableHead className="bg-stone-100">Return Date </TableHead>
					<TableHead className="bg-stone-100">Amount </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={6}
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
								#{item.barcode}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item?.customer?.customer_name, 20)}
							</TableCell>
							<TableCell className="py-2">{item?.sale_date}</TableCell>
							<TableCell className="py-2">{item?.return_date}</TableCell>
							<TableCell className="py-2">
								<Badge className="capitalize" variant="success">
									{item?.return_amount} {sign.tk}
								</Badge>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
