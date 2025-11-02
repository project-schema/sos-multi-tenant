export type iDropShipperCart = {
	id: number;
	product_id: number;
	variant_id: number;
	name: string;
	sku: string;
	image: string;
	selling_price: number;
	discount_price?: number;
	discount_percentage?: number;
	quantity: number;
};
