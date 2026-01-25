'use client';
import { useState } from 'react';

import { Container1 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { sign } from '@/lib';
import { BarCode } from '@/lib/barcode';
import { ArrowLeft } from 'lucide-react';
import { useVendorBarcodeRegenerateQuery } from './barcode-generator-api-slice';
import { generateBarcodeData } from './type';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
	const [visibleDetails, setVisibleDetails] = useState({
		name: false,
		sku: false,
		selling_price: false,
		quantity: false,
		unit: false,
		variant: false,
		utility: false,
	});

	const [pageSize, setPageSize] = useState('A4'); // Default page size

	const pageSizes = [
		{
			name: 'A4 Paper (210mm x 297mm)',
			value: 'A4',
			width: '210mm',
			height: '297mm',
		},
		{
			name: 'Sticker/Label (75mm x 100mm)',
			value: '75x100',
			width: '75mm',
			height: '100mm',
		},
		{
			name: 'Sticker/Label (38mm x 25mm)',
			value: '38x25',
			width: '38mm',
			height: '25mm',
		},
		{
			name: 'Sticker/Label (38mm x 15mm)',
			value: '38x15',
			width: '38mm',
			height: '15mm',
		},
	];

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

	const selectedPage = pageSizes.find((size) => size.value === pageSize);
	const handleWebPrint = () => {
		window.print();
	};

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Barcode Print</CardTitle>
							<div className="flex items-center gap-2">
								<Drawer direction="right">
									<DrawerTrigger asChild>
										<Button variant="outline">Page Setup</Button>
									</DrawerTrigger>
									<DrawerContent>
										<div className="mx-auto w-full max-w-sm">
											<DrawerHeader>
												<DrawerTitle>Page Setup</DrawerTitle>
												<DrawerDescription>
													Adjust print settings for your barcodes.
												</DrawerDescription>
											</DrawerHeader>
											<div className="p-4 pb-0">
												<h4 className="mb-2 font-medium">Page Size</h4>
												<RadioGroup
													onValueChange={setPageSize}
													defaultValue={pageSize}
													className="grid grid-cols-1 gap-4"
												>
													{pageSizes.map((size) => (
														<div
															key={size.value}
															className="flex items-center space-x-2"
														>
															<RadioGroupItem
																value={size.value}
																id={size.value}
															/>
															<Label htmlFor={size.value}>{size.name}</Label>
														</div>
													))}
												</RadioGroup>
											</div>
											<DrawerFooter>
												<DrawerClose asChild>
													<Button variant="outline">Cancel</Button>
												</DrawerClose>
											</DrawerFooter>
										</div>
									</DrawerContent>
								</Drawer>
								<Button onClick={handleWebPrint}>Print</Button>

								<Button
									variant="outline"
									onClick={() => setPrintBarcodes(false)}
								>
									<ArrowLeft className="h-4 w-4" />
									Back
								</Button>
							</div>
						</div>
					</>
				}
			>
				<div className="flex flex-wrap gap-4 mb-4 print:hidden">
					{Object.entries(visibleDetails).map(([key, value]) => (
						<div key={key} className="flex items-center space-x-2">
							<Checkbox
								id={key}
								checked={value}
								onCheckedChange={(checked) =>
									setVisibleDetails((prev) => ({ ...prev, [key]: checked }))
								}
							/>
							<Label htmlFor={key}>
								{key
									.replace(/_/g, ' ')
									.replace(/\b\w/g, (l) => l.toUpperCase())}
							</Label>
						</div>
					))}
				</div>
				<div
					className={`mx-auto ${pageSize === 'A4' ? 'A4' : ''} ${
						pageSize === '38x15' ? 'LABEL38_15' : ''
					} ${pageSize === '38x25' ? 'LABEL38_25' : ''} ${
						pageSize === '75x100' ? 'LABEL75_100' : ''
					}`}
					id="barcode-print-content"
				>
					{/* Added id for print */}
					{barcodes?.map((barcode, index) => (
						<div key={index}>
							{/* Added class for print styling */}
							<div className={pageSize === 'A4' ? 'grid grid-cols-4' : ''}>
								{barcode.elements.map((element, index) => (
									<div
										key={index}
										className="border text-sm font-medium text-black border-dashed border-black text-center"
									>
										{visibleDetails.name && (
											<p className="line-clamp-1">
												{visibleDetails.name && barcode.item?.name}
											</p>
										)}

										{visibleDetails.quantity && (
											<div>
												<strong>Qty:</strong> {barcode.item?.qty}
											</div>
										)}
										{(visibleDetails.unit ||
											visibleDetails.variant ||
											visibleDetails.utility) && (
											<div>
												{visibleDetails.unit && element.unit}{' '}
												{visibleDetails.variant && element.variant}{' '}
												{visibleDetails.utility && element.utility}
											</div>
										)}

										{visibleDetails.sku && (
											<div className="text-sm font-medium">
												<strong>SKU:</strong> {barcode.item?.sku}
											</div>
										)}
										{element.barcode && <BarCode value={element.barcode} />}
										{visibleDetails.selling_price && (
											<div className="text-sm">
												{barcode.item?.selling_price} {''}
												{sign.tk}
											</div>
										)}
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
