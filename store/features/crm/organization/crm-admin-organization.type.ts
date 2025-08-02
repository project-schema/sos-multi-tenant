export type iCrmOrganization = {
	id: number;
	description: string;
	deleted_at: null | string;
	created_at: null | string;
	updated_at: null | string;
};
export type iCrmOrganizationResponse = {
	status: 200;
	data: iCrmOrganization[];
};
