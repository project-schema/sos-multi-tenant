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

import { VendorDamageProductsDetails } from './damage-products-details';
import { iVendorDamageProducts } from './damage-products-type';

export function VendorDamageProductsTable({
	data,
}: {
	data: iVendorDamageProducts[];
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">SL.</TableHead>
					<TableHead className="bg-stone-100 w-10">Product </TableHead>
					<TableHead className="bg-stone-100"> User Name </TableHead>
					<TableHead className="bg-stone-100">Qty </TableHead>
					<TableHead className="bg-stone-100">Date </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
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
								{textCount(item?.product?.name, 20)}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item?.user?.name, 20)}
							</TableCell>
							<TableCell className="py-2">
								<Badge className="capitalize" variant="success">
									{item?.qty}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								{dateFormat(item?.created_at)}
							</TableCell>

							<TableCell className="py-2">
								<VendorDamageProductsDetails editData={item} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
