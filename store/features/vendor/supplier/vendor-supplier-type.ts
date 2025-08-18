export type iVendorSupplier = {
	id: number;
	user_id: number;
	supplier_name: string;
	supplier_slug: string;
	supplier_id: string;
	business_name: string;
	phone: string;
	email: string;
	address: string;
	description: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	vendor_id: number;
	status: 'active' | 'deactive';
};
export type iVendorSupplierResponse = {
	status: 200;
	supplies: iVendorSupplier[];
};
