import { iAdminRole } from '../role-permission/role-permission-type';

export type iAdminManager = {
	id: number;
	name: string;
	email: string;
	email_verified_at: null;
	role_as: string;
	image: null;
	number: string;
	status: string;
	balance: number;
	last_seen: null;
	created_at: string;
	updated_at: string;
	deleted_at: string;
	number2: null;
	uniqid: null;
	verify_code: null;
	verify_code_at: null;
	is_employee: null;
	vendor_id: null;
	roles: iAdminRole[];
};
