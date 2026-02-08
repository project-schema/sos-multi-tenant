export type iCmsBlog = {
	id: number;
	title: string;
	short_description: string;
	long_description: string;
	image: string | null;
	status: 'active' | 'inactive';
	n_category_id: number;
	meta_title: string;
	meta_description: string;
	meta_keywords: string;
	tags: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
};

export type iCmsBlogResponse = {
	message: string;
	success: boolean;
	news: iCmsBlog[];
};
