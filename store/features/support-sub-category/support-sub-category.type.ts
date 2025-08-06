export type iSupportSubCategory = {
	id: number;
	support_box_category_id: number;
	name: string;
	deleted_at: null;
	created_at: string;
	updated_at: string;
	support_category_name: string;
};

export type iSupportSubCategoryResponse = {
	data: 'success';
	message: iSupportSubCategory[];
};
