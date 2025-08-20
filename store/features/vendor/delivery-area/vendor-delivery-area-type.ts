export type iVendorPickAndDeliveryAddress = {
	id: number;
	address: string;
	type: string;
	status: 'active' | 'deactive';
};
export type iVendorPickAndDeliveryAddressResponse = {
	status: 200;
	deliveryAndPickupAddress: iVendorPickAndDeliveryAddress[];
};
