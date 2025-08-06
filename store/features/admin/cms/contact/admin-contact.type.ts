export type iContact = {
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
export type iContactResponse = {
	status: 200;
	data: 'success';
	message: iContact;
};
