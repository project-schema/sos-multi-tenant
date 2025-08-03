import { iPagination } from '@/types';

// 1 campaign category
export type iCampaignCategory = {
	id: number;
	name: string;
	icon: string;
	deleted_at: null | string;
	created_at: string;
	updated_at: string;
};
export type iCampaignCategoryResponse = {
	status: number;
	data: 'success';
	message: iPagination<iCampaignCategory>;
};
