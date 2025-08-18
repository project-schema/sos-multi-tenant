export type iVendorWarehouse = {
	id: number;
	user_id: number;
	name: string;
	slug: string;
	description: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	vendor_id: number;
	status: 'active' | 'deactive';
};
export type iVendorWarehouseResponse = {
	status: 200;
	warehouses: iVendorWarehouse[];
};
