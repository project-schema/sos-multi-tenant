import { iPagination } from '@/types';

export type iAdminAdvertise = {
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
	user_id: number;
	user: {
		id: number;
		name: string;
		email: string;
	};
};

export type iAdminAdvertiseResponse = {
	status: number;
	data: 'success';
	message: iPagination<iAdminAdvertise>;
};
export type iAdminVendorAdvertise = {
	status: 200;
	advertise: iPagination<iAdminAdvertise>;
};

export type iAdminAdvertiseStatistics = {
	status: number;
	data: 'success';
	message: {
		totaladvertise: number;
		totalprogressadvertise: number;
		totalpendingadvertise: number;
		totaldeliveredadvertise: number;
		totalcanceldadvertise: number;
	};
};
