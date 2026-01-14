import { iCategory } from '@/store/features/admin/category';
import { iSubCategory } from '@/store/features/admin/sub-category';
import { iService } from '@/store/features/vendor/cms/home-page';
import { iBanner } from '@/store/features/vendor/cms/home-page/banner';
import { iSystem } from '@/store/features/vendor/cms/system/type';

export type iTenantFrontend = {
	content_services: iService[];
	content_banners: iBanner[];
	cms: iSystem;

	populer_section_category_id_1: iCategory;
	populer_section_category_id_2: iCategory;
	populer_section_category_id_3: iCategory;
	populer_section_category_id_4: iCategory;
	populer_section_subcategory_id_1: iSubCategory;
	populer_section_subcategory_id_2: iSubCategory;
	populer_section_subcategory_id_3: iSubCategory;
	populer_section_subcategory_id_4: iSubCategory;

	recomended_category_id_1: iCategory;
	recomended_category_id_2: iCategory;
	recomended_category_id_3: iCategory;
	recomended_category_id_4: iCategory;
	recomended_sub_category_id_1: iSubCategory;
	recomended_sub_category_id_2: iSubCategory;
	recomended_sub_category_id_3: iSubCategory;
	recomended_sub_category_id_4: iSubCategory;

	best_setting_category_id_1: iCategory;
	best_setting_category_id_2: iCategory;
	best_setting_category_id_3: iCategory;
	best_setting_category_id_4: iCategory;
	best_setting_sub_category_id_1: iSubCategory;
	best_setting_sub_category_id_2: iSubCategory;
	best_setting_sub_category_id_3: iSubCategory;
	best_setting_sub_category_id_4: iSubCategory;

	best_category_id: iCategory;
	best_sub_category_id: iSubCategory;
};
