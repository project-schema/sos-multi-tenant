'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { tableSrCount } from '@/lib';
import { iBarcodeManage } from './type';

export function VendorBarcodeManageTable({
	data,
	setSelectedBarcodes,
	selectedBarcodes,
}: {
	data: iBarcodeManage[];
	setSelectedBarcodes: (value: {
		variant_id: number[];
		bar_qty: number[];
	}) => void;
	selectedBarcodes: {
		variant_id: number[];
		bar_qty: number[];
	};
}) {
	const barcodes = data;

	const handleSelect = (variantId: number, checked: boolean) => {
		if (checked) {
			// Add variant id with default qty from the variant
			const defaultQty =
				barcodes.find((b) => b.variant_id === variantId)?.product_variant
					?.qty ?? 1;
			setSelectedBarcodes({
				variant_id: [...selectedBarcodes.variant_id, variantId],
				bar_qty: [...selectedBarcodes.bar_qty, defaultQty],
			});
		} else {
			// Remove variant id and its corresponding qty
			const index = selectedBarcodes.variant_id.indexOf(variantId);
			if (index === -1) return;
			const newVariantIds = selectedBarcodes.variant_id.filter(
				(id) => id !== variantId
			);
			const newBarQty = selectedBarcodes.bar_qty.filter((_, i) => i !== index);
			setSelectedBarcodes({ variant_id: newVariantIds, bar_qty: newBarQty });
		}
	};

	const handleQtyChange = (variantId: number, qty: number) => {
		const index = selectedBarcodes.variant_id.indexOf(variantId);
		if (index === -1) return;
		const newBarQty = [...selectedBarcodes.bar_qty];
		newBarQty[index] = qty;
		setSelectedBarcodes({
			...selectedBarcodes,
			bar_qty: newBarQty,
		});
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100 w-10">Check</TableHead>
					<TableHead className="bg-stone-100 w-10">Sr.</TableHead>
					<TableHead className="bg-stone-100">Barcode</TableHead>
					<TableHead className="bg-stone-100">Product Name</TableHead>
					<TableHead className="bg-stone-100">Variant</TableHead>
					<TableHead className="bg-stone-100">Qty</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{barcodes.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={6}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					barcodes.map((item, i) => {
						const isChecked = selectedBarcodes.variant_id.includes(
							item.variant_id
						);
						const selectedIndex = selectedBarcodes.variant_id.indexOf(
							item.variant_id
						);
						return (
							<TableRow key={item.id}>
								<TableCell className="py-2 pl-4">
									<Checkbox
										checked={isChecked}
										onCheckedChange={(checked) =>
											handleSelect(item.variant_id, checked === true)
										}
									/>
								</TableCell>
								<TableCell className="py-2 pl-4">
									{tableSrCount(barcodes.length, i)}
								</TableCell>
								<TableCell className="font-medium py-4">
									{item.barcode}
								</TableCell>
								<TableCell className="py-2">
									{item.product_variant?.product?.name}
								</TableCell>
								<TableCell className="py-2">
									{item.product_variant?.size?.name},{' '}
									{item.product_variant?.color?.name},{' '}
									{item.product_variant?.unit?.unit_name}
								</TableCell>
								<TableCell className="py-2">
									<Input
										type="number"
										className="w-32"
										value={
											isChecked
												? selectedBarcodes.bar_qty[selectedIndex] ??
												  item.product_variant?.qty ??
												  1
												: item.product_variant?.qty ?? 1
										}
										onChange={(e) => {
											const next = parseInt(e.target.value || '0', 10);
											handleQtyChange(item.variant_id, isNaN(next) ? 0 : next);
										}}
										onWheel={(e) => {
											(e.target as HTMLInputElement).blur();
										}}
										disabled={!isChecked}
									/>
								</TableCell>
							</TableRow>
						);
					})
				)}
			</TableBody>
		</Table>
	);
}
