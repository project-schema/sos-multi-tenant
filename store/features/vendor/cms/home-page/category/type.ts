import { iPagination } from '@/types';

export type iHomePageCategory = {
	id: number;
	category_id: number;
	category: {
		id: number;
		name: string;
		slug: string;
		image: string | null;
		status: 'active' | 'pending';
	};
	status: 'active' | 'inactive';
	order: number;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
};

export type iHomePageCategoryResponse = {
	status: number;
	categories: iPagination<iHomePageCategory>;
};

export type iHomePageCategorySingleResponse = {
	status: number;
	category: iHomePageCategory;
};