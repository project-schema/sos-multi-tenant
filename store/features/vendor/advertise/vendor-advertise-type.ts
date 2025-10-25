import { iPagination } from '@/types';

export type iVendorAdvertise = {
	id: number;
	campaign_name: string;
	campaign_objective: string;
	budget_amount: string;
	start_date: string;
	end_date: string;
	is_paid: number;
	created_at: string;
	status: string;
	unique_id: string;
};
export type iVendorAdvertiseResponse = {
	status: number;
	data: 'success';
	message: iPagination<iVendorAdvertise>;
};
