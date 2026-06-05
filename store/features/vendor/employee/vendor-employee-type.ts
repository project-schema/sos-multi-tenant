export type iVendorEmployee = {
	id: number;
	name: string;
	email: string;
	number: string | null;
	status: 'active' | 'blocked' | 'pending';
	created_at: string;
	updated_at: string;
	vendor_role_id: number;
	vendor_role?: {
		id: number;
		name: string;
	} | null;
};

export type iVendorEmployeeResponse = {
	status: number;
	employees: iVendorEmployee[];
};
