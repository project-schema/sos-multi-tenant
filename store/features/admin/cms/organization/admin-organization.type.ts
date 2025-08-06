export type iOrganization = {
	id: number;
	description: string;
	deleted_at: null | string;
	created_at: null | string;
	updated_at: null | string;
};
export type iOrganizationResponse = {
	status: 200;
	data: iOrganization[];
};
