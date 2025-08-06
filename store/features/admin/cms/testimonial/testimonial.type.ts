export type iTestimonial = {
	id: number;
	description: string;
	image: string;
	name: string;
	designation: string;
	rating: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};
export type iTestimonialResponse = {
	status: number;
	data: iTestimonial[];
};
