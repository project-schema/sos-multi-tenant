import { iPagination } from '@/types';

export type iAdminServiceOrder = {
	id: number;
	user_id: number;
	vendor_service_id: number;
	service_package_id: number;
	vendor_id: number;
	status: string;
	timer: string;
	details: string;
	amount: number;
	commission_type: string;
	commission_amount: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	trxid: string;
	is_paid: number;
	is_rejected: string;
	reason: null;
	rejected_user_id: null;
	customerdetails: {
		id: number;
		name: string;
		email: string;
		email_verified_at: null;
		role_as: string;
		image: null;
		number: string;
		status: string;
		balance: number;
		last_seen: string;
		created_at: string;
		updated_at: string;
		deleted_at: string;
		number2: null;
		uniqid: string;
		verify_code: null;
		verify_code_at: null;
		is_employee: null;
		vendor_id: null;
	};
	vendor: {
		id: number;
		name: string;
		email: string;
		email_verified_at: null;
		role_as: string;
		image: null;
		number: string;
		status: string;
		balance: number;
		last_seen: string;
		created_at: string;
		updated_at: string;
		deleted_at: string;
		number2: null;
		uniqid: string;
		verify_code: null;
		verify_code_at: null;
		is_employee: null;
		vendor_id: null;
	};
	servicedetails: null | {
		id: number;
		title: string;
	};
};

export type iAdminServiceOrderResponse = {
	status: number;
	data: 'success';
	message: iPagination<iAdminServiceOrder>;
};

export type iAdminServiceOrderStatistics = {
	status: number;
	data: string;
	message: {
		totalserviceorder: number;
		totalpendingservice: number;
		totalprogressservice: number;
		totalrevisionservice: number;
		totaldeliveredservice: number;
		totalsuccessservice: number;
		totalcanceledservice: number;
	};
};
