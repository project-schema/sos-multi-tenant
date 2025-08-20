export type iVendorDeliveryCharge = {
	id: number;
	area: string;
	charge: string;
	status: 'active' | 'deactive';
};
export type iVendorDeliveryChargeResponse = {
	status: 200;
	deliveryCharge: iVendorDeliveryCharge[];
};
