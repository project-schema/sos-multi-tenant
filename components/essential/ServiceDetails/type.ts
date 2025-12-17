export type iServiceRatingType = {
	id: number;
	user_id: number;
	vendor_service_id: number;
	rating: number;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	service_order_id: number;
	comment: string;
	tenant_id: string;
	user: {
		id: number;
		name: string;
		image: string;
	};
	tenant: {
		id: string;
		company_name: string;
		owner_name: string;
		data: null;
		type: null;
	};
};
