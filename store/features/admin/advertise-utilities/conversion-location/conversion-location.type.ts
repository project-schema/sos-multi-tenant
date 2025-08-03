import { iPagination } from '@/types';
import { iCampaignCategory } from '../campaign-category';

// 1 campaign category
export type iConversionLocation = {
	id: number;
	campaign_category_id: number;
	name: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	category: iCampaignCategory;
};

export type iConversionLocationResponse = {
	status: number;
	data: 'success';
	message: iPagination<iConversionLocation>;
};

export type iConversionLocationRequest = {
	locations: iConversionLocation[];
	status: 200;
};
