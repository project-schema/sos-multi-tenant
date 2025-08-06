export type iCrmAdvertiseFaq = {
	id: number;
	description: string;
	heading: string;
	deleted_at: null | string;
	created_at: null | string;
	updated_at: null | string;
};
export type iCrmAdvertiseFaqResponse = {
	status: 200;
	datas: iCrmAdvertiseFaq[];
};
