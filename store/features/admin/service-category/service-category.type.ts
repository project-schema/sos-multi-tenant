export type iServiceCategory = {
	id: number;
	name: string;
	slug: string;
	status: 'active' | 'deactivate';
};
export type iServiceCategoryResponse = {
	status: number;
	data: 'success';
	message: iServiceCategory[];
};
