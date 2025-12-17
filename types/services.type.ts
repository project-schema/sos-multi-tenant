export interface iServiceType {
	id: number;
	title: string;
	user_id: number;
	image: string;
	tags: string[];
	servicerating_avg_rating: string;
	tenant: {
		id: string;
		company_name: string;
		owner_name: string;
		data: null;
		type: null;
	};
	firstpackage: {
		id: number;
		price: number;
		vendor_service_id: number;
	};
}
