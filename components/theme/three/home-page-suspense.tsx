import { Banner04 } from '@/components/web';
import { getApiDataWithSubdomain, imageFormat } from '@/lib';
import { iVendorCategory } from '@/store/features';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Image from 'next/image';
import Link from 'next/link';
import { CategorySections } from './ctx/category-sections';
import { PopularProducts } from './ctx/popular-products';
import { RecommendedProducts } from './ctx/rec';

export default async function ThemeThreeHomePageSuspense({
	searchParams,
}: {
	searchParams: {
		trend: string;
		search: string;
		feature: string;
		include: string;
	};
}) {
	const { include } = await searchParams;
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms',
	);

	const categories = await getApiDataWithSubdomain<iVendorCategory[]>(
		'/tenant-frontend/categories',
	);

	const bannerImages = [
		{
			image: settings?.cms?.two_column_banner_1 ?? null,
			link: settings?.cms?.two_column_banner_1_url ?? null,
		},
		{
			image: settings?.cms?.two_column_banner_2 ?? null,
			link: settings?.cms?.two_column_banner_2_url ?? null,
		},
		{
			image: settings?.cms?.three_column_banner_1 ?? null,
			link: settings?.cms?.three_column_banner_1_url ?? null,
		},
		{
			image: settings?.cms?.three_column_banner_2 ?? null,
			link: settings?.cms?.three_column_banner_2_url ?? null,
		},
	].filter((e) => e.image);

	return (
		<>
			<main className="bg-primary3/5 space-y-10 md:space-y-14 lg:space-y-16 2xl:space-y-24 pb-10 md:pb-14 lg:pb-16 2xl:pb-24">
				<MotionFadeIn>
					<Banner04 cms={settings?.cms} />
				</MotionFadeIn>

				{categories && categories?.length > 0 && (
					<MotionFadeIn>
						<div className="max-w-[1740px] px-5 mx-auto">
							<h2 className="fs-50 font-semibold text-center font-kalnia text-primary3  mb-8 lg:mb-14">
								Categories
							</h2>
							<MotionFadeIn>
								<CategorySections categories={categories} />
							</MotionFadeIn>
						</div>
					</MotionFadeIn>
				)}

				{settings?.cms?.populer_section_title && (
					<div className="max-w-[1740px] px-5 mx-auto">
						<MotionFadeIn>
							{settings?.cms?.populer_section_title && (
								<div className="sp-60 mb-sp">
									<h2 className="fs-50 font-semibold  font-kalnia text-primary3">
										{settings?.cms?.populer_section_title}
									</h2>
								</div>
							)}
						</MotionFadeIn>

						<MotionFadeIn>
							{settings?.populer_section_category_id_1.name &&
								settings?.populer_section_subcategory_id_1.id && (
									<PopularProducts
										buttons={[
											{
												label: settings?.populer_section_category_id_1.name,
												value:
													settings?.populer_section_subcategory_id_1.id.toString(),
											},
										]}
									/>
								)}
						</MotionFadeIn>
					</div>
				)}
				{bannerImages?.length > 0 && (
					<MotionFadeIn>
						<div className="max-w-[1740px] mx-auto px-4 sm:px-5 lg:px-6">
							<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
								{bannerImages?.map((i, index) => (
									<Link
										href={i.link ?? '#'}
										key={index}
										className="block  relative w-full overflow-hidden rounded-md aspect-[3/4] sm:aspect-[3/4] lg:aspect-[4/5]"
									>
										<Image
											src={imageFormat(i.image)}
											alt="image"
											fill
											className="object-cover hover:scale-105 transition-transform duration-300"
											sizes="
						(max-width: 640px) 50vw,
						(max-width: 1024px) 33vw,
						(max-width: 1280px) 25vw,
						25vw
					"
										/>
									</Link>
								))}
							</div>
						</div>
					</MotionFadeIn>
				)}
				{settings?.cms.best_setting_title && (
					<MotionFadeIn>
						<div className="max-w-[1740px] px-5 mx-auto">
							<div className="sp-60 mb-sp">
								<h2 className="fs-50 font-semibold  font-kalnia text-primary3 text-center">
									{settings?.cms.best_setting_title}
								</h2>
							</div>
							{settings?.best_setting_category_id_1.name &&
								settings?.best_setting_sub_category_id_1.id && (
									<PopularProducts
										buttons={[
											{
												label: settings?.best_setting_category_id_1.name,
												value:
													settings?.best_setting_sub_category_id_1.id.toString(),
											},
										]}
									/>
								)}
						</div>
					</MotionFadeIn>
				)}

				{settings?.cms?.three_column_banner_3_url && (
					<MotionFadeIn>
						<div className="max-w-[1500px] mx-auto px-4 sm:px-5 lg:px-6">
							<Link
								href={settings?.cms?.three_column_banner_3_url ?? '#'}
								className="block relative w-full overflow-hidden  aspect-[16/9] sm:aspect-[21/9] lg:max-h-[550px]"
							>
								<Image
									width={800}
									height={500}
									src={imageFormat(settings?.cms.three_column_banner_3)}
									alt="banner"
									className="w-full h-full object-contain block hover:scale-105 transition-transform duration-300"
								/>
							</Link>
						</div>
					</MotionFadeIn>
				)}

				{settings?.recomended_category_id_1.name &&
					settings?.recomended_sub_category_id_1.id && (
						<MotionFadeIn>
							<RecommendedProducts settings={settings} include={include} />
						</MotionFadeIn>
					)}
			</main>
		</>
	);
}
