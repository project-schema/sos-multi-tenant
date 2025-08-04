export type iAdminBank = {
	id: number;
	name: string;
	number: string;
	account_holder_name: null | string;
	branch_name: null | string;
	created_at: null | string;
	updated_at: null | string;
};

export type iAdminBankResponse = {
	status: 200;
	message: iAdminBank[];
};
