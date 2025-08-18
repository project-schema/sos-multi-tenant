export type iVendorUnit = {
	id: number;
	unit_name: string;
	user_id: number;
	unit_slug: string;
	status: 'active' | 'deactive';
	code: null;
	created_at: string;
	updated_at: string;
	deleted_at: null;
	created_by: string;
	vendor_id: number;
};
export type iVendorUnitResponse = {
	status: 200;
	units: iVendorUnit[];
};
