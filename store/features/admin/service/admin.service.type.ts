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
	tenant_id: string;
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

const files = [
	{
		id: 60,
		name: 'uploads/support/694abae9bef9e1.jpg',
		filetable_type: 'App\\Models\\ServiceOrder',
		filetable_id: 48,
		deleted_at: null,
		created_at: '2025-12-23T15:53:13.000000Z',
		updated_at: '2025-12-23T15:53:13.000000Z',
	},
];
const data = {
	id: 7,
	user_id: 725,
	vendor_service_id: 19,
	rating: 4,
	deleted_at: null,
	created_at: '2025-12-24T12:10:55.000000Z',
	updated_at: '2025-12-24T12:10:55.000000Z',
	service_order_id: 48,
	comment: '123456',
	tenant_id: null,
};
export type iAdminServiceOrder = {
	id: number;
	trxid: string;
	details: string;
	status: string;
	created_at: string;
	amount: string;
	servicerating: {
		id: number;
		user_id: number;
		vendor_service_id: number;
		rating: number;
		deleted_at: null;
		created_at: string;
		updated_at: string;
		service_order_id: number;
		comment: string;
	};
	files: {
		id: number;
		name: string;
		filetable_type: string;
		filetable_id: number;
		deleted_at: null;
		created_at: string;
		updated_at: string;
	}[];
	customerdetails: {
		id: number;
		name: string;
		email: string;
		number: string;
		uniqid: string;
		role_as: string;
		status: string;
		image: string;
		created_at: string;
		updated_at: string;
		deleted_at: string;
		number2: null;
	};
	servicedetails: {
		id: number;
		title: string;
	};
	orderdelivery: {
		id: number;
		vendor_id: number;
		customer_id: number;
		service_order_id: number;
		description: string;
		status: string;
		type: string;
		deleted_at: null;
		created_at: string;
		updated_at: string;
		deliveryfiles: {
			id: number;
			order_delivery_id: number;
			files: string;
			deleted_at: null;
			created_at: string;
			updated_at: string;
			name: string;
		}[];
	}[];
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
