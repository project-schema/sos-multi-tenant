import { iPagination } from '@/types';
export type iUserSupportResponse = {
	message: iPagination<iUserSupport>;
	status: number;
};
export type iUserSupport = {
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

export type iUserSupportCategory = {
	id: number;
	name: string;
	deleted_at: string;
	created_at: string;
	updated_at: string;
};

export type iUserSupportSubCategory = {
	id: number;
	support_box_category_id: number;
	name: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
};

export type iUserSupportSubResponse = {
	status: 200;
	data: 'success';
	message: iUserSupportCategory & { problems: iUserSupportSubCategory[] };
};
export type iUserSupportView = {
	id: number;
	user_id: number;
	support_box_category_id: number;
	support_problem_topic_id: number;
	description: string;
	file: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	subject: string;
	is_close: number;
	rating: null;
	rating_comment: null;
	ticket_no: string;
	tenant_id: null;
	status: string;
	ticketreplay: {
		id: number;
		support_box_id: number;
		description: string;
		rating: null;
		deleted_at: null;
		created_at: string;
		updated_at: string;
		user_id: number;
		read_status: string;
		status: string;
		file: { name: string };
		user: {
			id: number;
			name: string;
			email: string;
			email_verified_at: string;
			role_as: string;
			image: null;
			number: string;
			status: string;
			balance: number;
			last_seen: string;
			created_at: string;
			updated_at: string;
			deleted_at: null;
			number2: string;
			uniqid: string;
			verify_code: number;
			verify_code_at: string;
			is_employee: null;
			vendor_id: null;
		};
	}[];
};
