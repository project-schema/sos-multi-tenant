export type iCrmSocial = {
	id: number;
	icon_class: string;
	media_link: string;
	deleted_at: null | string;
	created_at: null | string;
	updated_at: null | string;
};
export type iCrmSocialResponse = {
	status: 200;
	data: iCrmSocial[];
};
