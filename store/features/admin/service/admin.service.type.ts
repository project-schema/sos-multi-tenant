import { iPagination } from '@/types';

export type iAdminService = {
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
	status: 'active' | 'pending' | 'rejected';
	commission: number;
	commission_type: string;
	image: string;
	created_at: string;
	updated_at: string;
	deleted_at: null | string;
	reason: null | string;
	servicepackages: {
		id: number;
		vendor_service_id: number;
		time: string;
		package_title: string;
		package_description: string;
		price: number;
		revision_max_time: number;
		deleted_at: null | string;
		created_at: string;
		updated_at: string;
	}[];

	serviceimages: {
		id: number;
		vendor_service_id: number;
		images: string;
		deleted_at: null | string;
		created_at: string;
		updated_at: string;
	}[];
	tenant: {
		id: string;
		company_name: string;
		email: string;
		owner_name: string;
		phone: string;
		address: string;
		created_at: string;
		updated_at: string;
		data: null;
		deleted_at: null;
		type: string;
		balance: string;
		tenancy_db_name: string;
		name: string;
		number: string;
		number2: null;
	};
};

export type iAdminServiceResponse = {
	status: number;
	data: 'success';
	message: iPagination<iAdminService>;
};

export type iAdminServiceOrder = {
	id: number;
	trxid: string;
	details: string;
	status: string;
	created_at: string;
	amount: string;
	customerdetails: {
		id: number;
		name: string;
		email: string;
	};
	servicedetails: {
		id: number;
		title: string;
	};
};
export type iAdminServiceOrderResponse = {
	status: 200;
	serviceOrder: iPagination<iAdminServiceOrder>;
};

export type iAdminServiceStatistics = {
	status: number;
	data: 'success';
	message: {
		totalservice: number;
		totalactiveservice: number;
		totalpendingservice: number;
		totalrejectedservice: number;
	};
};
