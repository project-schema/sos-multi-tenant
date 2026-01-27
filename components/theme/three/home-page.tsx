import { Banner04, Card09, Footer03, Header03 } from '@/components/web';
import { env, getApiDataWithSubdomain, imageFormat } from '@/lib';
import { iVendorBrand } from '@/store/features';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Image from 'next/image';
import Link from 'next/link';
import { PopularProducts } from './ctx/popular-products';

export default async function ThemeThreeHomePage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);

	const brands = await getApiDataWithSubdomain<iVendorBrand[]>(
		'/tenant-frontend/brands'
	);

	return (
		<>
			<Header03 />
			<Banner04 banners={settings?.banners} />
			<main className="bg-[#F6F3E9]">
				{brands && brands?.length > 0 && (
					<div className="max-w-[1720px] mx-auto py-24">
						<h2 className="fs-50 font-semibold text-center font-kalnia text-primary3 mb-14">
							Brands
						</h2>
						<div className="grid grid-cols-4 gap-6">
							{brands?.map((item) => (
								<Card09 key={item.id} data={item} />
							))}
						</div>
					</div>
				)}

				{settings?.cms?.populer_section_title && (
					<div className="max-w-[1720px] mx-auto pb-24">
						{settings?.cms?.populer_section_title && (
							<div className="sp-60 mb-sp">
								<h2 className="fs-50 font-semibold  font-kalnia text-primary3">
									{settings?.cms?.populer_section_title}
								</h2>
							</div>
						)}
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
					</div>
				)}

				{settings?.cms.best_setting_title && (
					<div className="max-w-[1720px] mx-auto pb-24">
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
				)}

				{settings?.cms?.two_column_banner_1_url && (
					<div className="max-w-[1500px] mx-auto pb-24">
						<img
							src={imageFormat(settings?.cms.banner_1)}
							alt="image"
							width={1000}
							height={1000}
							className="w-full h-full object-cover block max-h-[550px]"
						/>
					</div>
				)}

				<div className="max-w-[1720px] mx-auto">
					<div className="sp-60 mb-sp flex items-center gap-2 justify-center">
						{['Women Blazer', 'Classy', 'Mad Saree', 'Kanjivaram Silk'].map(
							(item) => (
								<Link
									key={item}
									href="/shop"
									className="flex items-center gap-2 border border-primary3 rounded-full p-2 pe-4 group hover:bg-primary3 hover:text-white transition-all duration-300"
								>
									<Image
										src={env.placeholderImage}
										alt="image"
										width={50}
										height={50}
										className="w-12  rounded-full h-12 object-cover block"
									/>
									<span className="fs-22 font-medium font-kalnia text-primary3 group-hover:text-white transition-all duration-300">
										{item}
									</span>
								</Link>
							)
						)}
					</div>
					{settings?.recomended_category_id_1.name &&
						settings?.recomended_sub_category_id_1.id && (
							<PopularProducts
								buttons={[
									{
										label: settings?.recomended_category_id_1.name,
										value: settings?.recomended_sub_category_id_1.id.toString(),
									},
								]}
							/>
						)}
				</div>
			</main>
			<Footer03 />
		</>
	);
}
