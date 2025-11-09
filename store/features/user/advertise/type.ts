import { iPagination } from '@/types';

export type iUserAdvertise = {
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
export type iUserAdvertiseResponse = {
	status: number;
	data: 'success';
	message: iPagination<iUserAdvertise>;
};

export type iUserAdvertiseStatistics = {
	pending: number;
	progress: number;
	delivered: number;
	cancel: number;
	all: number;
};
