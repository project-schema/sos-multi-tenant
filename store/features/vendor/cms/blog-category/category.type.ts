import { iPagination } from '@/types';

export type iCategory = {
	id: number;
	name: string;
	slug: string;
	description: null;
	meta_title: null;
	meta_keywords: null;
	meta_description: null;
	status: 'active' | 'inactive';
	image: string | null;
	tags: null;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
};
export type iCategoryResponse = {
	status: number;
	categories: iPagination<iCategory>;
};
