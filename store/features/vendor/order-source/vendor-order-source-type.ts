export type iVendorOrderSource = {
	id: number;
	name: string;
	image: string | null;
	status: 'active' | 'deactive';
};
export type iVendorOrderSourceResponse = {
	status: number;
	resource: iVendorOrderSource[];
};
