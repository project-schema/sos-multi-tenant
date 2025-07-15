export interface iSubscriptionsType {
	status: 200;
	data: {
		id: number;
		subscription_user_type: string;
		subscription_package_type: string;
		card_symbol_icon: string;
		subscription_amount: string;
		card_time: string;
		card_heading: string;
		card_feature_title: string;
		card_facilities_title: {
			id: number;
			key: string;
			value: string;
		}[];
		deleted_at: string;
		created_at: string;
		updated_at: string;
		service_qty: number;
		product_qty: number;
		affiliate_request: number;
		product_request: string;
		product_approve: string;
		service_create: string;
		plan_type: string;
		suggest: string;
		chat_access: string;
		pos_sale_qty: number;
		employee_create: string;
	}[];
}
