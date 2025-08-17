export type iVendorVariation = {
	id: number;
	name: string;
	user_id: number;
	slug: string;
	status: string;
	created_at: string;
	updated_at: string;
	deleted_at: null;
	created_by: string;
	vendor_id: number;
};
export type iVendorVariationResponse = {
	status: 200;
	size: iVendorVariation[];
};
