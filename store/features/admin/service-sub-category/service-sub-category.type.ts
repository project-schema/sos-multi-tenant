import { iServiceCategory } from '../service-category';

export type iServiceSubCategory = {
	id: number | string;
	user_id: number;
	service_category_id: number;
	name: string;
	status: 'active' | 'deactivate';
	deleted_at: null;
	created_at: string;
	updated_at: string;
	service_category: iServiceCategory;
};

export type iServiceSubCategoryResponse = {
	status: number;
	data: string;
	message: iServiceSubCategory[];
};
