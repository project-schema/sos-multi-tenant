export type iVendorColor = {
	id: number;
	name: string;
	user_id: number;
	slug: string;
	status: 'active' | 'deactive';
	code: null;
	created_at: string;
	updated_at: string;
	deleted_at: null;
	created_by: string;
	vendor_id: number;
};
export type iVendorColorResponse = {
	status: 200;
	color: iVendorColor[];
};
