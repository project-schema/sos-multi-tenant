'use client';

import {
	VendorBarcodeManagePage,
	VendorBarcodePrintPage,
} from '@/store/features/vendor/barcode-generator';
import { useState } from 'react';

export default function PageClient() {
	const [printBarcodes, setPrintBarcodes] = useState<boolean>(false);
	const [selectedBarcodes, setSelectedBarcodes] = useState<{
		variant_id: number[];
		bar_qty: number[];
	}>({
		variant_id: [],
		bar_qty: [],
	});

	return printBarcodes ? (
		<VendorBarcodePrintPage
			setPrintBarcodes={setPrintBarcodes}
			selectedBarcodes={selectedBarcodes}
			setSelectedBarcodes={setSelectedBarcodes}
		/>
	) : (
		<VendorBarcodeManagePage
			setPrintBarcodes={setPrintBarcodes}
			setSelectedBarcodes={setSelectedBarcodes}
			selectedBarcodes={selectedBarcodes}
		/>
	);
}
