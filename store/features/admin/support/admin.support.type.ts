import { iPagination } from '@/types';
import { iUser } from '../user/type';

export type iAdminSupport = {
	id: number;
	user_id: number;
	support_box_category_id: number;
	support_problem_topic_id: number;
	status: string;
	description: string;
	file: null;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	subject: string;
	is_close: number;
	rating: null;
	rating_comment: null;
	ticket_no: string;
	total_admin_replay: number;
	user: iUser;
	latest_ticketreplay: null;
	category: {
		id: number;
		name: string;
	};
	problem_topic: {
		id: number;
		name: string;
	};
};

export type iAdminSupportResponse = {
	status: 200;
	message: iPagination<iAdminSupport>;
};
