import {
	Card04,
	Card05,
	Category01,
	Footer01,
	Header01,
} from '@/components/web';
import Banner02 from '@/components/web/banner/02';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { PopularItems } from './_ctx/popular-items';

export default async function ThemeOneHomePage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);

	const brands = await getApiDataWithSubdomain<
		{ name: string; image: string; id: number }[]
	>('/tenant-frontend/brands');
	return (
		<>
			<Header01 />
			{settings?.banners  && settings?.banners?.length > 0 && (
				<Banner02 banners={settings?.banners ?? null} />
			)}

			{brands  && brands?.length > 0 && (
				<div>
					<div className="py-10">
						<h2 className="text-[40px] font-bold text-center">Brands</h2>
					</div>
					<Category01 categories={brands} />
				</div>
			)}

			{settings?.cms.populer_section_title && (
				<PopularItems
					buttons={[
						{
							label: settings.populer_section_category_id_1.name,
							value: settings.populer_section_subcategory_id_1.id.toString(),
						},
						{
							label: settings.populer_section_category_id_2.name,
							value: settings.populer_section_subcategory_id_2.id.toString(),
						},
						{
							label: settings.populer_section_category_id_3.name,
							value: settings.populer_section_subcategory_id_3.id.toString(),
						},
						{
							label: settings.populer_section_category_id_4.name,
							value: settings.populer_section_subcategory_id_4.id.toString(),
						},
					]}
					title={settings?.cms.populer_section_title || ''}
				/>
			)}

			{settings?.cms.two_column_banner_1 &&
				settings?.cms.two_column_banner_2 && (
					<div className="max-w-[1320px] px-4 mx-auto py-8">
						<Card04 settings={settings} />
					</div>
				)}

			{settings?.cms.best_setting_title && (
				<PopularItems
					buttons={[
						{
							label: settings.best_setting_category_id_1.name,
							value: settings.best_setting_sub_category_id_1.id.toString(),
						},
						{
							label: settings.best_setting_category_id_2.name,
							value: settings.best_setting_sub_category_id_2.id.toString(),
						},
						{
							label: settings.best_setting_category_id_3.name,
							value: settings.best_setting_sub_category_id_3.id.toString(),
						},
						{
							label: settings.best_setting_category_id_4.name,
							value: settings.best_setting_sub_category_id_4.id.toString(),
						},
					]}
					title={settings?.cms.best_setting_title || ''}
				/>
			)}

			{settings?.cms.three_column_banner_1 && (
				<div className="max-w-[1320px] px-4 mx-auto py-8">
					<Card05 settings={settings} />
				</div>
			)}

			<Footer01 />
		</>
	);
}
