export type iCrmOrganizationTwo = {
	id: number;
	icon: string;
	title: string;
	description: string;
	deleted_at: null | string;
	created_at: null | string;
	updated_at: null | string;
};
export type iCrmOrganizationTwoResponse = {
	status: 200;
	data: iCrmOrganizationTwo[];
};
