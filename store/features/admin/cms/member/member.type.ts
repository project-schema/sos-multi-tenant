export type iCrmMember = {
	id: number;
	photo: string;
	name: string;
	designation: string;
	facebook_link: string;
	instagram_link: string;
	twitter_link: string;
	created_at: string | null;
	updated_at: string;
	deleted_at: string | null;
};
export type iCrmMemberResponse = {
	status: number;
	data: iCrmMember[];
};
