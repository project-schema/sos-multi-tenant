export type iCrmContact = {
	id: number;
	title: string;
	description: string;
	phone: string;
	email: string;
	address: string;
	deleted_at: null | string;
	created_at: null | string;
	updated_at: null | string;
};
export type iCrmContactResponse = {
	status: 200;
	data: 'success';
	message: iCrmContact;
};
