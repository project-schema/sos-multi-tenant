import { iPagination } from '@/types';
import { iCampaignCategory } from '../campaign-category';
import { iConversionLocation } from '../conversion-location';

// 1 campaign category
export type iPerformanceGoal = {
	id: number;
	campaign_category_id: number;
	name: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	conversion_location_id: number;
	conversion_location: iConversionLocation;
	category: iCampaignCategory;
};

export type iPerformanceGoalResponse = {
	status: number;
	data: 'success';
	message: iPagination<iPerformanceGoal>;
};
