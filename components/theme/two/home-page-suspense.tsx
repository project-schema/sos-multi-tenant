import { Loader9 } from '@/components/dashboard';
import { Banner03, Card06 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { Suspense } from 'react';
import { BestSellingGrid } from './_ctx/best-selling-grid';
import { BrandLogos } from './_ctx/brand-logos';
import { ImageGrid } from './_ctx/image-grid';
import { ProductSection } from './_ctx/product-section';
import { ProductSection2 } from './_ctx/product-section2';
import { PromoBanner } from './_ctx/promo-banner';
import { TrendingProducts } from './_ctx/trending-products';

export default async function ThemeTwoHomePageSuspense({
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
		'/tenant-frontend/cms',
	);

	const brands = await getApiDataWithSubdomain<
		{ name: string; image: string; id: number }[]
	>('/tenant-frontend/brands');

	return (
		<>
			<div className="space-y-10 lg:space-y-14 2xl:space-y-20 mt-10">
				{(settings?.cms?.banner_1 ||
					settings?.cms?.banner_2 ||
					settings?.cms?.banner_3) && (
					<MotionFadeIn>
						<Banner03 settings={settings ?? null} />
					</MotionFadeIn>
				)}

				{settings?.content_services &&
					settings?.content_services?.length > 0 && (
						<MotionFadeIn>
							<Card06 services={settings?.content_services ?? []} />
						</MotionFadeIn>
					)}

				{(settings?.cms?.populer_section_title ||
					settings?.cms?.populer_section_subcategory_id_1 ||
					settings?.cms?.populer_section_subcategory_id_2 ||
					settings?.cms?.populer_section_subcategory_id_3 ||
					settings?.cms?.populer_section_subcategory_id_4) && (
					<Suspense fallback={<Loader9 />}>
						<TrendingProducts settings={settings ?? null} trend={trend} />
					</Suspense>
				)}

				{(settings?.cms?.three_column_banner_1 ||
					settings?.cms?.three_column_banner_2 ||
					settings?.cms?.three_column_banner_3) && (
					<ImageGrid settings={settings} />
				)}

				{(settings?.recomended_category_id_1 ||
					settings?.recomended_category_id_2 ||
					settings?.recomended_category_id_3 ||
					settings?.recomended_category_id_4) && (
					<MotionFadeIn>
						<Suspense fallback={<Loader9 />}>
							<BestSellingGrid settings={settings} />
						</Suspense>
					</MotionFadeIn>
				)}

				{brands && brands?.length > 0 && (
					<MotionFadeIn>
						<BrandLogos brands={brands} />
					</MotionFadeIn>
				)}

				{settings?.cms?.best_setting_title && (
					<MotionFadeIn>
						<Suspense fallback={<Loader9 />}>
							<ProductSection2
								include={include}
								title={settings?.cms?.best_setting_title ?? ''}
								buttons={[
									{
										label: settings?.best_setting_category_id_1?.name ?? '',
										value: settings?.cms?.best_setting_sub_category_id_1 ?? '',
									},
									{
										label: settings?.best_setting_category_id_2?.name ?? '',
										value: settings?.cms?.best_setting_sub_category_id_2 ?? '',
									},
									{
										label: settings?.best_setting_category_id_3?.name ?? '',
										value: settings?.cms?.best_setting_sub_category_id_3 ?? '',
									},
									{
										label: settings?.best_setting_category_id_4?.name ?? '',
										value: settings?.cms?.best_setting_sub_category_id_4 ?? '',
									},
								]}
							/>
						</Suspense>
					</MotionFadeIn>
				)}

				{(settings?.cms?.two_column_banner_1 ||
					settings?.cms?.two_column_banner_2) && (
					<MotionFadeIn>
						<PromoBanner settings={settings} />
					</MotionFadeIn>
				)}

				{settings?.cms?.best_section_title && (
					<MotionFadeIn>
						<Suspense fallback={<Loader9 />}>
							<ProductSection
								title={settings?.cms?.best_section_title ?? ''}
								feature={feature}
								buttons={[
									{
										label: settings?.cms?.best_category_id ?? '',
										value: settings?.cms?.best_setting_sub_category_id_1 ?? '',
									},
								]}
							/>
						</Suspense>
					</MotionFadeIn>
				)}
			</div>
		</>
	);
}
