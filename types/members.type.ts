export interface iMembersType {
	status: 200;
	data: 'success';
	message: {
		id: number;
		photo: string;
		name: string;
		designation: string;
		facebook_link: string;
		instagram_link: string;
		twitter_link: string;
		deleted_at: null;
		created_at: null;
		updated_at: string;
	}[];
}
