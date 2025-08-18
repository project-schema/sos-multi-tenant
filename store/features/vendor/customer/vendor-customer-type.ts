export type iVendorCustomer = {
	id: number;
	user_id: number;
	customer_name: string;
	customer_slug: string;
	customer_id: string;
	customer_type: null;
	phone: string;
	email: null;
	address: null;
	description: null;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	vendor_id: number;
	status: 'active' | 'deactive';
};
export type iVendorCustomerResponse = {
	status: 200;
	customers: iVendorCustomer[];
};
