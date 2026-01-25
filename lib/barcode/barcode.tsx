'use client';

import ReactBarcode, { BarcodeProps } from 'react-barcode';

export const BarCode = ({ ...props }: BarcodeProps) => {
	return (
		<div className="w-full">
			<ReactBarcode {...props} className="w-full h-full" />
		</div>
	);
};
