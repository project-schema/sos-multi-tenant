export interface iServiceType {
	id: number;
	title: string;
	user_id: number;
	image: string;
	tags: string[];
	servicerating_avg_rating: string;
	user: {
		id: number;
		name: string;
		image: null;
	};
	firstpackage: {
		id: number;
		price: number;
		vendor_service_id: number;
	};
}
