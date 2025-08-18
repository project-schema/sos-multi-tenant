import { iPagination } from '@/types';

export type iVendorCategory = {
	id: number;
	name: string;
	slug: string;
	description: null;
	meta_title: null;
	meta_keywords: null;
	meta_description: null;
	status: 'active' | 'pending';
	image: string | null;
	tags: null;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
};
export type iVendorCategoryResponse = {
	status: number;
	categories: iPagination<iVendorCategory>;
};
