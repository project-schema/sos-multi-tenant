import { iPagination } from '@/types';

export type iAdminContactMessages = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	number: string;
	message: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
};

export type iAdminEmailSubRes = iPagination<EmailSub>;

type EmailSub = {
	id: number;
	email: string;
	deleted_at: null | string;
	created_at: string;
	updated_at: string;
};
