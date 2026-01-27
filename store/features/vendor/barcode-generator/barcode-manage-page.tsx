'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';

import { Barcode } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useVendorBarcodeManageQuery } from './barcode-generator-api-slice';
import { VendorBarcodeManageFilter } from './barcode-manage.filter';
import { VendorBarcodeManageTable } from './barcode-manage.table';

export function VendorBarcodeManagePage({
	setPrintBarcodes,
	setSelectedBarcodes,
	selectedBarcodes,
}: {
	setSelectedBarcodes: (value: {
		variant_id: number[];
		bar_qty: number[];
	}) => void;
	setPrintBarcodes: (value: boolean) => void;
	selectedBarcodes: {
		variant_id: number[];
		bar_qty: number[];
	};
}) {
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useVendorBarcodeManageQuery({
		page,
		searchTerm,
	});

	useEffect(() => {
		setPage(1);
	}, [debouncedSearchTerm]);

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Barcode Manage</CardTitle>
							{selectedBarcodes.bar_qty.length > 0 && (
								<Button
									className="ml-auto"
									variant="outline"
									onClick={() => setPrintBarcodes(true)}
								>
									<Barcode className="h-4 w-4" />
									Generate Barcode
								</Button>
							)}
						</div>
						<VendorBarcodeManageFilter
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
					</>
				}
			>
				{data?.barcodes && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<VendorBarcodeManageTable
								data={data?.barcodes}
								setSelectedBarcodes={setSelectedBarcodes}
								selectedBarcodes={selectedBarcodes}
							/>
						</div>
					</>
				)}
			</Container1>
		</>
	);
}
