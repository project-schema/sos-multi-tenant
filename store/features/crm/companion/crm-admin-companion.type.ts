export type iCrmCompanion = {
	id: number;
	icon: string;
	title: string;
	description: string;
	deleted_at: null | string;
	created_at: null | string;
	updated_at: null | string;
};
export type iCrmCompanionResponse = {
	status: 200;
	data: iCrmCompanion[];
};
