export type iVendorCourierCompany = {
	id: number;
	vendor_id: number;
	courier_name: 'pathao' | 'redx' | 'steadfast';
	api_key: string;
	secret_key: string;
	client_email: string;
	client_password: string;
	store_id: string;
	default: string;
	created_at: string;
	updated_at: string;
	status: 'active' | 'deactive';
};
export type iVendorCourierCompanyResponse = {
	status: 200;
	data: iVendorCourierCompany[];
	message: 'success';
};
