export type iSupportCategory = {
	id: number;
	name: string;
	deleted_at: null | string;
	created_at: string;
	updated_at: string;
};
export type iSupportCategoryResponse = {
	status: 200;
	data: 'success';
	message: iSupportCategory[];
};
