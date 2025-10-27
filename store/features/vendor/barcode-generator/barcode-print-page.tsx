'use client';

import { Container1 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { BarCode } from '@/lib/barcode';
import { ArrowLeft } from 'lucide-react';
import { useVendorBarcodeRegenerateQuery } from './barcode-generator-api-slice';
import { generateBarcodeData } from './type';
export function VendorBarcodePrintPage({
	setPrintBarcodes,
	selectedBarcodes,
	setSelectedBarcodes,
}: {
	selectedBarcodes: {
		variant_id: number[];
		bar_qty: number[];
	};
	setPrintBarcodes: (value: boolean) => void;
	setSelectedBarcodes: (value: {
		variant_id: number[];
		bar_qty: number[];
	}) => void;
}) {
	const {
		data: barcodeData,
		isLoading,
		isError,
		isFetching,
	} = useVendorBarcodeRegenerateQuery({
		bar_qty: selectedBarcodes.bar_qty,
		variant_id: selectedBarcodes.variant_id,
	});

	const barcodes = barcodeData?.barcodes
		? generateBarcodeData(barcodeData?.barcodes)
		: [];
	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Barcode Print</CardTitle>
							<Button variant="outline" onClick={() => setPrintBarcodes(false)}>
								<ArrowLeft className="h-4 w-4" />
								Back
							</Button>
						</div>
					</>
				}
			>
				<div>
					{barcodes?.map((barcode, index) => (
						<div key={index}>
							<div className="flex gap-2">
								<div className="text-sm font-medium">
									{' '}
									<strong>Name:</strong> {barcode.item?.name}
								</div>
								<div className="text-sm font-medium">
									{' '}
									<strong>SKU:</strong> {barcode.item?.sku}
								</div>
								<div className="text-sm font-medium">
									{' '}
									<strong>Selling Price:</strong> {barcode.item?.selling_price}
								</div>
								<div className="text-sm font-medium">
									{' '}
									<strong>Quantity:</strong> {barcode.item?.qty}
								</div>
								<div className="text-sm font-medium">
									{' '}
									<strong>Unit:</strong> {barcode.item?.unit}
								</div>
								<div className="text-sm font-medium">
									{' '}
									<strong>Variant:</strong> {barcode.item?.variant}
								</div>
								<div className="text-sm font-medium">
									{' '}
									<strong>Utility:</strong> {barcode.item?.utility}
								</div>
							</div>
							<div className="grid grid-cols-7 gap-2">
								{barcode.elements.map((element, index) => (
									<div key={index}>
										{element.barcode && <BarCode value={element.barcode} />}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</Container1>
		</>
	);
}
