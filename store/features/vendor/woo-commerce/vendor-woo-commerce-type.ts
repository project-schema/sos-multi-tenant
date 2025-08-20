export type iVendorWooCommerce = {
	id: number;
	vendor_id: number;
	wc_key: string;
	wc_secret: string;
	wc_url: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
};
export type iVendorWooCommerceResponse = {
	status: 200;
	data: iVendorWooCommerce[];
};
