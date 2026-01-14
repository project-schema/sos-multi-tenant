export type iHomeOffer = {
	id: number;
	title: string;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
};

export type iHomeOfferResponse = {
	success: boolean;
	data: iHomeOffer[];
};
