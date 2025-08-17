import { iPagination } from '@/types';

export type iVendorBrand = {
	id: number;
	user_id: number;
	name: string;
	slug: string;
	description: string;
	meta_title: string;
	meta_keyword: string;
	meta_description: string;
	image: string;
	created_at: string;
	updated_at: string;
	deleted_at: string;
	created_by: string;
	status: 'active' | 'pending';
};
export type iVendorBrandResponse = {
	status: 200;
	data: 'success';
	brands: iPagination<iVendorBrand>;
};
