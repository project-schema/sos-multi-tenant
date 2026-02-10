import {
	Card04,
	Card05,
	Category01,
	Footer01,
	Header01,
} from '@/components/web';
import Banner02 from '@/components/web/banner/02';
import { getApiDataWithSubdomain } from '@/lib';
import { FrontendPageVisit } from '@/store/features/frontend';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { PopularItems } from './_ctx/popular-items';
import { PopularItems2 } from './_ctx/popular-items-2';
import { PopularItems3 } from './_ctx/popular-items-3';

export default async function ThemeOneHomePage({
	searchParams,
}: {
	searchParams: {
		trend: string;
		search: string;
		feature: string;
		include: string;
	};
}) {
	const { trend, search, feature, include } = await searchParams;
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);

	const brands = await getApiDataWithSubdomain<
		{ name: string; image: string; id: number }[]
	>('/tenant-frontend/brands');

	let finalBrands = brands ?? [];

	while (finalBrands.length > 0 && finalBrands.length <= 5) {
		finalBrands = finalBrands.concat(brands ?? []);
	}

	return (
		<>
			<FrontendPageVisit />
			<Header01 />
			<div className="space-y-24 pb-24">
				{settings?.banners && settings?.banners?.length > 0 && (
					<Banner02 banners={settings?.banners ?? null} />
				)}

				{finalBrands && finalBrands?.length > 0 && (
					<div className="space-y-8">
						<div>
							<h2 className="text-[40px] font-bold text-center">Brands</h2>
						</div>
						<Category01 categories={finalBrands} />
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
						trend={trend}
					/>
				)}

				{settings?.cms.two_column_banner_1 &&
					settings?.cms.two_column_banner_2 && (
						<div className="max-w-[1320px] px-4 mx-auto ">
							<Card04 settings={settings} />
						</div>
					)}

				{settings?.cms.best_setting_title && (
					<PopularItems2
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
						include={include}
					/>
				)}

				{settings?.cms.three_column_banner_1 && (
					<div className="max-w-[1320px] px-4 mx-auto  ">
						<Card05 settings={settings} />
					</div>
				)}

				{settings?.cms.recomended_sub_category_id_1 && (
					<PopularItems3
						buttons={[
							{
								label: 'All Products',
								value: settings?.cms.recomended_sub_category_id_1,
							},
						]}
						title={settings?.recomended_category_id_1?.name ?? ''}
						include={include}
					/>
				)}
				{settings?.cms.recomended_sub_category_id_2 && (
					<PopularItems3
						buttons={[
							{
								label: 'All Products',
								value: settings?.cms.recomended_sub_category_id_2,
							},
						]}
						title={settings?.recomended_category_id_2?.name ?? ''}
						include={include}
					/>
				)}
				{settings?.cms.recomended_sub_category_id_3 && (
					<PopularItems3
						buttons={[
							{
								label: 'All Products',
								value: settings?.cms.recomended_sub_category_id_3,
							},
						]}
						title={settings?.recomended_category_id_3?.name ?? ''}
						include={include}
					/>
				)}
			</div>

			<Footer01 />
		</>
	);
}
