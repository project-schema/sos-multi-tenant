import { iCampaignCategory } from '../campaign-category';

export type iAdFormat = {
	id: number;
	add_format: string;
	campaign_category_id: number;
	category: iCampaignCategory;
};

export type iAdFormatResponse = {
	status: 200;
	data: 'success';
	message: iAdFormat[];
};
