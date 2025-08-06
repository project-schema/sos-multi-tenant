export type iCrmPartner = {
	id: number;
	image: string | null;
	tags: null;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
};
export type iCrmPartnerResponse = {
	status: number;
	data: iCrmPartner[];
};
