export interface iServiceType {
	id: number;
	uniqueid: string;
	user_id: number;
	service_category_id: number;
	service_sub_category_id: number;
	rating: number;
	title: string;
	description: string;
	tags: string[];
	contract: string;
	status:
		| 'progress'
		| 'pending'
		| 'success'
		| 'hold'
		| 'expire'
		| 'delivered'
		| 'revision'
		| 'canceled'
		| 'cancel_request'
		| 'active'
		| 'rejected';
	commission: number;
	commission_type: string;
	image: string;
	created_at: string;
	updated_at: string;
	deleted_at: null;
	reason: null | string;
	tenant_id: string;
	servicerating_avg_rating: string;
	servicepackages: iServicePackageType[];

	serviceimages: {
		id: number;
		vendor_service_id: number;
		images: string;
		deleted_at: null;
		created_at: string;
		updated_at: string;
	}[];

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

export interface iServicePackageType {
	id: number;
	vendor_service_id: number;
	time: string;
	package_title: string;
	package_description: string;
	price: number;
	revision_max_time: number;
	deleted_at: null;
	created_at: string;
	updated_at: string;
}
