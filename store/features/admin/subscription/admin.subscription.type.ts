export type iAdminSubscription = {
	id: number;
	subscription_user_type: 'vendor' | 'affiliate';
	subscription_package_type: 'yearly' | 'monthly' | 'half_yearly';
	card_symbol_icon: string;
	subscription_amount: string;
	card_time: string;
	card_heading: string;
	card_feature_title: string;
	card_facilities_title: {
		id: number;
		key: 'yes' | 'no';
		value: string;
	}[];
	deleted_at: null;
	created_at: string;
	updated_at: string;
	service_qty: number;
	product_qty: number;
	affiliate_request: number;
	product_request: null | number;
	product_approve: null;
	service_create: null;
	plan_type: string;
	suggest: null | string;
	chat_access: null;
	pos_sale_qty: number;
	employee_create: null;
};

/*
affiliate_request 200"
chat_access null
employee_create null
pos_sale_qty "23"
product_qty 10
service_qty "23"
subscription_id "1"

/admin/subscription/requirement/1
*/
