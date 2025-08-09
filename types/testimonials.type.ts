export interface iTestimonialsType {
	status: 200;
	data: 'success';
	message: {
		id: number;
		description: string;
		image: string;
		name: string;
		designation: string;
		rating: string;
		deleted_at: null;
		created_at: string;
		updated_at: string;
	}[];
}
