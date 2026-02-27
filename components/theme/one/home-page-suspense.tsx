import { Card04, Card05, Category01 } from '@/components/web';
import Banner02 from '@/components/web/banner/02';
import { getApiDataWithSubdomain } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { PopularItems } from './_ctx/popular-items';

export default async function ThemeOneHomePageSuspense() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms',
	);

	const brands = await getApiDataWithSubdomain<
		{ name: string; image: string; id: number }[]
	>('/tenant-frontend/categories');

	let finalBrands = brands ?? [];

	while (finalBrands.length > 0 && finalBrands.length <= 5) {
		finalBrands = finalBrands.concat(brands ?? []);
	}

	return (
		<>
			<div className=" space-y-12 sm:space-y-16 lg:space-y-20 2xl:space-y-24 pb-24">
				{settings?.banners && settings?.banners?.length > 0 && (
					<MotionFadeIn>
						<Banner02 banners={settings?.banners ?? null} />
					</MotionFadeIn>
				)}

				{finalBrands && finalBrands?.length > 0 && (
					<MotionFadeIn>
						<div className="space-y-4 lg:space-y-8">
							<div>
								<h2 className="text-lg sm:text-xl lg:text-2xl 2xl:text-[40px] font-bold text-center">
									Trending Categories
								</h2>
							</div>
							<Category01 categories={finalBrands} />
						</div>
					</MotionFadeIn>
				)}

				{settings?.cms.populer_section_title && (
					<MotionFadeIn>
						<PopularItems
							buttons={[
								{
									label:
										settings?.populer_section_category_id_1?.id?.toString(),
									value:
										settings?.populer_section_subcategory_id_1?.id?.toString(),
								},
							]}
							title={settings?.cms.populer_section_title || ''}
						/>
					</MotionFadeIn>
				)}

				{settings?.cms.two_column_banner_1 &&
					settings?.cms.two_column_banner_2 && (
						<MotionFadeIn>
							<div className="max-w-[1320px] px-4 mx-auto ">
								<Card04 settings={settings} />
							</div>
						</MotionFadeIn>
					)}

				{settings?.cms.best_setting_title && (
					<MotionFadeIn>
						<PopularItems
							buttons={[
								{
									label: settings?.best_setting_category_id_1?.id?.toString(),
									value:
										settings?.best_setting_sub_category_id_1?.id?.toString(),
								},
							]}
							title={settings?.cms.best_setting_title || ''}
						/>
					</MotionFadeIn>
				)}

				{settings?.cms.three_column_banner_1 && (
					<MotionFadeIn>
						<div className="max-w-[1320px] px-4 mx-auto  ">
							<Card05 settings={settings} />
						</div>
					</MotionFadeIn>
				)}

				{settings?.cms.best_section_title && (
					<MotionFadeIn>
						<PopularItems
							buttons={[
								{
									label: settings?.best_setting_category_id_1?.id?.toString(),
									value:
										settings?.best_setting_sub_category_id_1?.id?.toString(),
								},
							]}
							title={settings?.cms.best_section_title || ''}
						/>
					</MotionFadeIn>
				)}

				{settings?.cms.extra_section_tittle_4 && (
					<MotionFadeIn>
						<PopularItems
							buttons={[
								{
									label: settings?.recomended_category_id_1?.id?.toString(),
									value: settings?.recomended_sub_category_id_1?.id?.toString(),
								},
							]}
							title={settings?.cms.extra_section_tittle_4 || ''}
						/>
					</MotionFadeIn>
				)}

				{settings?.cms.extra_section_tittle_5 && (
					<MotionFadeIn>
						<PopularItems
							buttons={[
								{
									label: settings?.recomended_category_id_2?.id?.toString(),
									value: settings?.recomended_sub_category_id_2?.id?.toString(),
								},
							]}
							title={settings?.cms.extra_section_tittle_5 || ''}
						/>
					</MotionFadeIn>
				)}

				{settings?.cms.extra_section_tittle_6 && (
					<MotionFadeIn>
						<PopularItems
							buttons={[
								{
									label: settings?.recomended_category_id_3?.id?.toString(),
									value: settings?.recomended_sub_category_id_3?.id?.toString(),
								},
							]}
							title={settings?.cms.extra_section_tittle_6 || ''}
						/>
					</MotionFadeIn>
				)}
			</div>
		</>
	);
}
