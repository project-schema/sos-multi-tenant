export type iAdvertiseFaq = {
	id: number;
	description: string;
	heading: string;
	deleted_at: null | string;
	created_at: null | string;
	updated_at: null | string;
};
export type iAdvertiseFaqResponse = {
	status: 200;
	datas: iAdvertiseFaq[];
};
