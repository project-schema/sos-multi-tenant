export interface iFrontendApplyCoupon {
	coupon: string;
}

export interface iFrontendBuySubscriptionPay {
	id: string;
}
const data = {
	id: 1,
	subscription_user_type: 'vendor',
	subscription_package_type: 'monthly',
	card_symbol_icon: 'FaIcon',
	subscription_amount: '0',
	card_time: '2',
	card_heading: 'freely',
	card_feature_title: 'card_feature_title',
	card_facilities_title: [
		{
			id: 4,
			key: 'yes',
			value: 'Product collaboration : 10',
		},
		{
			id: 5,
			key: 'yes',
			value: 'Dropshipper Approve : 20',
		},
		{
			id: 6,
			key: 'no',
			value: 'Service Create',
		},
		{
			id: 7,
			key: 'yes',
			value: 'Product inventory - Unlimited',
		},
		{
			id: 8,
			key: 'no',
			value: 'POS  System - Unlimited',
		},
		{
			id: 9,
			key: 'no',
			value: 'Live Chat with Dropshipper',
		},
		{
			id: 10,
			key: 'no',
			value: 'Employee Access',
		},
		{
			id: 11,
			key: 'no',
			value: 'Website',
		},
	],
	deleted_at: null,
	created_at: '2023-09-23T04:07:44.000000Z',
	updated_at: '2024-06-22T07:23:48.000000Z',
	service_qty: 0,
	product_qty: 10,
	affiliate_request: 20,
	product_request: null,
	product_approve: null,
	service_create: null,
	plan_type: 'freemium',
	suggest: null,
	chat_access: null,
	pos_sale_qty: 0,
	employee_create: null,
};
