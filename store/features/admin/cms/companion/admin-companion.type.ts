export type iCompanion = {
	id: number;
	icon: string;
	title: string;
	description: string;
	deleted_at: null | string;
	created_at: null | string;
	updated_at: null | string;
};
export type iCompanionResponse = {
	status: 200;
	data: iCompanion[];
};
