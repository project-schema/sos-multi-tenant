export type iBarcodeResponse = {
	barcodes: {
		barcode: string;
		product_variant: {
			id: number;
			variant_id: number;
			qty: number;
			product: {
				name: string;
				sku: string;
				selling_price: number;
			};
			color: {
				name: string;
				color_code: string;
			};
			size: {
				name: string;
				size_code: string;
			};
			unit: {
				unit_name: string;
				unit_code: string;
			};
		};
	}[];
	message: string;
	status: number;
};

export interface iBarcodeItem {
	barcode: string;
	name: string;
	sku: string;
	selling_price: number;
	qty: number;
	unit: string;
	variant: string;
	utility: string;
	variant_id: number;
}

export interface iGroupedBarcode {
	item: iBarcodeItem;
	elements: iBarcodeItem[];
}

export interface iBarcodeManage {
	id: number;
	variant_id: number;
	barcode: string;
	vendor_id: number;
	product_variant: {
		id: number;
		product_id: number;
		unit_id: number;
		size_id: number;
		color_id: number;
		qty: number;
		product: {
			id: number;
			name: string;
			sku: string;
			selling_price: number;
		};
		color: {
			id: number;
			name: string;
		} | null;
		size: {
			id: number;
			name: string;
		};
		unit: {
			id: number;
			unit_name: string;
		};
	};
}

export interface iBarcodeManageResponse {
	status: number;
	barcodes: iBarcodeManage[];
}

export const generateBarcodeData = (
	barcodes: iBarcodeResponse['barcodes']
): iGroupedBarcode[] => {
	const data: iBarcodeItem[] = barcodes.map((e) => ({
		barcode: e?.barcode,
		name: e?.product_variant?.product?.name,
		sku: e?.product_variant?.product?.sku,
		selling_price: e?.product_variant?.product?.selling_price,
		qty: e?.product_variant?.qty,
		unit: e?.product_variant?.unit?.unit_name,
		variant: e?.product_variant?.size?.name,
		utility: e?.product_variant?.color?.name,
		variant_id: e?.product_variant.id,
	}));

	const convertedData = data.reduce<Record<number, iGroupedBarcode>>(
		(acc, item) => {
			const variantId = item.variant_id;
			if (!acc[variantId]) {
				acc[variantId] = {
					item,
					elements: [],
				};
			}
			acc[variantId].elements.push(item);
			return acc;
		},
		{}
	);

	const result = Object.values(convertedData);
	return result;
};
