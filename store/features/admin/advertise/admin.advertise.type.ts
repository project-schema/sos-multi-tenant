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
export type iAdminAdvertiseDetail = {
	id: number;
	unique_id: string;
	campaign_objective: string;
	user_id: number;
	campaign_name: string;
	conversion_location: string;
	performance_goal: string;
	platforms: null;
	budget: string;
	budget_amount: string;
	start_date: string;
	end_date: string;
	age: string;
	gender: string;
	detail_targeting: string;
	country: string;
	city: string[];
	device: string[];
	platform: string[];
	inventory: string;
	format: string;
	ad_creative: {
		postid: string;
		primary_text: string;
		call_to_action: string;
		description: string;
		heading: string;
		media: string;
	}[];
	destination: null;
	tracking: null;
	url_perimeter: null;
	number: null;
	last_description: null;
	status: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	is_paid: number;
	trxid: string;
	placements: {
		[key: string]: string[];
	}[];
	reason: string;
	audience: string;
	ageto: string;
	advertise_audience_file: { file: string }[];
	advertise_placement: never[];
	advertise_location_files: { file: string }[];
	files: never[];
	user: {
		id: number;
		name: string;
		email: string;
		number: string;
		uniqid: string;
	};
};
