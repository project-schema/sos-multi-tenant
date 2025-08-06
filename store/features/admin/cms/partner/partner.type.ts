export type iPartner = {
	id: number;
	image: string | null;
	tags: null;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
};
export type iPartnerResponse = {
	status: number;
	data: iPartner[];
};
