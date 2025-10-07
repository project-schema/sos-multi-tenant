import { iPagination } from '@/types';

export type iVendorServices = {};
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
