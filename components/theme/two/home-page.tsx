import { Banner03, Card06, Footer02, Header02 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { BestSellingGrid } from './_ctx/best-selling-grid';
import { BrandLogos } from './_ctx/brand-logos';
import { ImageGrid } from './_ctx/image-grid';
import { ProductSection } from './_ctx/product-section';
import { ProductSection2 } from './_ctx/product-section2';
import { PromoBanner } from './_ctx/promo-banner';
import { TrendingProducts } from './_ctx/trending-products';

export default async function ThemeTwoHomePage({
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

	return (
		<>
			<Header02 />
			<div className="space-y-10 mt-10">
				{(settings?.cms?.banner_1 ||
					settings?.cms?.banner_2 ||
					settings?.cms?.banner_3) && <Banner03 settings={settings ?? null} />}

				{settings?.content_services &&
					settings?.content_services?.length > 0 && (
						<Card06 services={settings?.content_services ?? []} />
					)}

				{(settings?.cms?.populer_section_title ||
					settings?.cms?.populer_section_subcategory_id_1 ||
					settings?.cms?.populer_section_subcategory_id_2 ||
					settings?.cms?.populer_section_subcategory_id_3 ||
					settings?.cms?.populer_section_subcategory_id_4) && (
					<TrendingProducts settings={settings ?? null} trend={trend} />
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
					<BestSellingGrid settings={settings} />
				)}

				{brands && brands?.length > 0 && <BrandLogos brands={brands} />}

				{settings?.cms?.best_section_title && (
					<ProductSection2
						include={include}
						title={settings?.cms?.best_section_title ?? ''}
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
				)}

				{(settings?.cms?.two_column_banner_1 ||
					settings?.cms?.two_column_banner_2) && (
					<PromoBanner settings={settings} />
				)}

				{settings?.cms?.best_section_title && (
					<ProductSection
						title={settings?.cms?.best_section_title ?? ''}
						feature={feature}
						buttons={[
							{
								label: settings?.best_setting_category_id_1?.name ?? '',
								value: settings?.cms?.best_setting_sub_category_id_1 ?? '',
							},
						]}
					/>
				)}
			</div>

			<Footer02 />
		</>
	);
}
