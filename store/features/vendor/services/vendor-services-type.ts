import { iPagination } from '@/types';
import { iUser } from '../profile';

export type iVendorServices = {
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
	user: iUser;
};
export type iVendorServicesResponse = {
	status: number;
	data: 'success';
	message: iPagination<iVendorServices>;
};

export type iVendorServiceCategory = {
	id: number;
	user_id: number;
	name: string;
	slug: string;
	status: 'active' | 'pending';
	deleted_at: null;
	created_at: string;
	updated_at: string;
	servicesub_categories: iVendorServiceSubCategory[];
};
export type iVendorServiceSubCategory = {
	id: number;
	user_id: number;
	service_category_id: number;
	name: string;
	status: 'active' | 'pending';
	deleted_at: null;
	created_at: string;
	updated_at: string;
};
export type iVendorServiceCategoryAndSubCategoryResponse = {
	status: number;
	data: 'success';
	message: iVendorServiceCategory[];
};

export type iVendorServicesStatistics = {
	all: number;
	success: number;
	delivered: number;
	revision: number;
	pending: number;
	canceled: number;
	progress: number;
};
