export type iVendorPaymentMethods = {
	id: number;
	payment_method_name: string;
	acc_no: string;
	status: 'active' | 'deactive';
};
export type iVendorPaymentMethodsResponse = {
	status: 200;
	data: iVendorPaymentMethods[];
};
