import { iPagination } from '@/types';
export type iVendorSupportResponse = {
	message: iPagination<iVendorSupport>;
	status: number;
};
export type iVendorSupport = {
	id: number;
	user_id: number;
	support_box_category_id: number;
	support_problem_topic_id: number;
	status: string;
	description: string;
	file: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	subject: string;
	is_close: number;
	rating: null;
	rating_comment: null;
	ticket_no: null;
	total_admin_replay: number;
	latest_ticketreplay: {
		id: number;
		support_box_id: number;
		description: string;
		rating: null;
		deleted_at: null;
		created_at: string;
		updated_at: string;
		user_id: number;
		read_status: string;
		status: null;
	};
	category: {
		id: number;
		name: string;
	};
	problem_topic: {
		id: number;
		name: string;
	};
};

export type iVendorSupportCategory = {
	id: number;
	name: string;
	deleted_at: string;
	created_at: string;
	updated_at: string;
};

export type iVendorSupportSubCategory = {
	id: number;
	support_box_category_id: number;
	name: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
};

export type iVendorSupportSubResponse = {
	status: 200;
	data: 'success';
	message: iVendorSupportCategory & { problems: iVendorSupportSubCategory[] };
};
