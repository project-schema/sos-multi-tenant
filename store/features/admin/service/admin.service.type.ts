import { iPagination } from '@/types';
import { iUser } from '../user/type';

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
	status: string;
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
	user: iUser;
};

export type iAdminServiceResponse = {
	status: number;
	data: 'success';
	message: iPagination<iAdminService>;
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
