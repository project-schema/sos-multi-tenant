export type iCrmTestimonial = {
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
export type iCrmTestimonialResponse = {
	status: number;
	data: iCrmTestimonial[];
};
