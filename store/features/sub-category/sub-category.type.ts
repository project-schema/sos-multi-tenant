import { iPagination } from '@/types';
import { iCategory } from '../category';

export type iSubCategory = {
	id: number;
	category_id: number;
	name: string;
	slug: string;
	status: 'active' | 'pending';
	created_at: string;
	updated_at: string;
	deleted_at: string;
	category: iCategory;
};

export type iSubCategoryResponse = {
	status: number;
	subcategory: iPagination<iSubCategory>;
};
