import { iPagination } from '@/types';

export type iAdminWithdrawal = {
	id: number;
	user_id: string;
	amount: string;
	bank_name: string;
	ac_or_number: string;
	holder_name: string;
	branch_name: string;
	admin_transition_id: string;
	admin_screenshot: string;
	admin_bank_name: string;
	created_at: string;
	updated_at: string;
	status: string;
	role: string;
	reason: null;
	uniqid: string;
	text: string;
	charge: string;
	user: {
		id: number;
		name: string;
	};
};

export type iAdminWithdrawalResponse = {
	status: 200;
	message: iPagination<iAdminWithdrawal>;
};
