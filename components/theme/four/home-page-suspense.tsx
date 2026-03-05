import { Banner05 } from '@/components/web';
import { Category02 } from '@/components/web/category/02';
import { getApiDataWithSubdomain, imageFormat } from '@/lib';
import { iCategory } from '@/store/features/admin/category';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { ChevronDown, Text } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PopularItems } from './_ctx/popular-items';
import { PopularItems2 } from './_ctx/popular-items-2';
import { PopularItems3 } from './_ctx/popular-items-3';

export default async function ThemeFourHomePageSuspense({
	include,
}: {
	include?: string;
}) {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms',
	);

	const brands = await getApiDataWithSubdomain<iCategory[]>(
		'/tenant-frontend/categories',
	);

	let finalBrands = brands ?? [];

	while (finalBrands.length > 0 && finalBrands.length <= 5) {
		finalBrands = finalBrands.concat(brands ?? []);
	}

	return (
		<>
			<div className=" space-y-12 sm:space-y-16 lg:space-y-20 2xl:space-y-24 pb-24">
				<div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
					{/* Desktop Navigation and Categories Section */}
					<div className="hidden lg:flex items-center gap-10">
						<button className="bg-black flex justify-between items-center text-white w-[300px] h-[60px] px-3">
							<span className="flex items-center gap-2">
								<Text />
								<span>All Categories</span>
							</span>

							<ChevronDown />
						</button>

						<div>
							{/* Navigation Links - Desktop */}
							<nav className="hidden md:flex items-center gap-6">
								<Link
									href="/"
									className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
								>
									Home
								</Link>
								<Link
									href="/shop"
									className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
								>
									Shop
								</Link>
								<Link
									href="/blog"
									className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
								>
									Blog
								</Link>
								<Link
									href="/contact"
									className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
								>
									Contact
								</Link>
							</nav>
						</div>
					</div>

					{/* Categories Sidebar and Banner Section */}
					<MotionFadeIn>
						<div className="flex ">
							<ul className="hidden lg:block w-full max-w-[300px] border border-gray-300 max-h-[300px] xl:max-h-[545px] overflow-y-auto rounded-b">
								{brands?.map((e) => (
									<li
										key={e.id}
										className="not-last:border-b border-gray-200 px-3 py-2 hover:bg-primary/5 transition-colors cursor-pointer"
									>
										<Link
											href={`/shop?category_id=${e.id}`}
											className="flex items-center gap-3 text-sm line-clamp-1"
										>
											<Image
												src={imageFormat(e.image)}
												width={200}
												height={200}
												alt={e.name}
												className="w-12 h-12 object-cover object-center rounded "
											/>
											{e.name}
										</Link>
									</li>
								))}
							</ul>
							<div className="lg:px-5 xl:pt-2 w-full max-w-full lg:max-w-[calc(100%-300px)]">
								<Banner05 cms={settings ?? null} />
							</div>
						</div>
					</MotionFadeIn>
				</div>

				{/* Shop by Category Section - Already wrapped in MotionFadeIn */}
				{finalBrands && finalBrands?.length > 0 && (
					<div className="space-y-4 lg:space-y-8 max-w-[1340px] px-5 mx-auto">
						<MotionFadeIn>
							<h2 className="text-lg capitalize sm:text-xl lg:text-2xl 2xl:text-[40px] font-bold text-center">
								shop by category
							</h2>
						</MotionFadeIn>
						<MotionFadeIn>
							<Category02 categories={finalBrands} />
						</MotionFadeIn>
					</div>
				)}

				{/* Popular Items Section - Already wrapped */}
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

				{/* Banner Grid Section */}
				<div className="max-w-[1340px] px-5 mx-auto space-y-4 ">
					<MotionFadeIn>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{settings?.cms.two_column_banner_1 && (
								<Link
									href={settings?.cms.two_column_banner_1_url ?? '#'}
									className="block overflow-hidden"
								>
									<div className="relative w-full aspect-[4/3] sm:aspect-[16/9]">
										<Image
											src={imageFormat(
												settings?.cms.two_column_banner_1 ?? null,
											)}
											alt="image"
											fill
											sizes="(max-width: 640px) 100vw, 50vw"
											className="object-cover transition-transform duration-300 hover:scale-105"
										/>
									</div>
								</Link>
							)}

							{settings?.cms.two_column_banner_2 && (
								<Link
									href={settings?.cms.two_column_banner_2_url ?? '#'}
									className="block overflow-hidden"
								>
									<div className="relative w-full aspect-[4/3] sm:aspect-[16/9]">
										<Image
											src={imageFormat(
												settings?.cms.two_column_banner_2 ?? null,
											)}
											alt="image"
											fill
											sizes="(max-width: 640px) 100vw, 50vw"
											className="object-cover transition-transform duration-300 hover:scale-105"
										/>
									</div>
								</Link>
							)}
						</div>
					</MotionFadeIn>
					<MotionFadeIn>
						<div className="overflow-hidden">
							{settings?.cms.three_column_banner_2 && (
								<Link
									href={settings?.cms.three_column_banner_2_url ?? '#'}
									className="block overflow-hidden"
								>
									<div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[3/2]">
										<Image
											src={imageFormat(
												settings?.cms.three_column_banner_2 ?? null,
											)}
											alt="image"
											fill
											sizes="(max-width: 640px) 100vw,
             (max-width: 1024px) 50vw,
             33vw"
											className="object-cover transition-transform duration-300 hover:scale-105"
										/>
									</div>
								</Link>
							)}
						</div>
					</MotionFadeIn>
				</div>

				{/* Popular Items 2 Section */}
				<MotionFadeIn>
					<PopularItems2
						title={settings?.cms.best_setting_title || ''}
						description={settings?.cms.banner_description || ''}
						buttons={[
							{
								label: settings?.recomended_category_id_1?.name || '',
								value:
									settings?.cms?.recomended_sub_category_id_1?.toString() || '',
							},
							{
								label: settings?.recomended_category_id_2?.name || '',
								value:
									settings?.cms?.recomended_sub_category_id_2?.toString() || '',
							},
							{
								label: settings?.recomended_category_id_3?.name || '',
								value:
									settings?.cms?.recomended_sub_category_id_3?.toString() || '',
							},
						]}
						include={include}
					/>
				</MotionFadeIn>

				{/* Large Banner Section */}
				{settings?.cms.three_column_banner_2 && (
					<MotionFadeIn>
						<Link
							href={settings?.cms.three_column_banner_2_url ?? '#'}
							className="overflow-hidden block relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px]"
						>
							<Image
								src={imageFormat(settings?.cms?.three_column_banner_2 ?? null)}
								alt="image"
								fill
								className="object-cover"
								sizes="(max-width: 640px) 100vw,
           (max-width: 1024px) 100vw,
           100vw"
							/>
						</Link>
					</MotionFadeIn>
				)}

				{/* Popular Items 3 Section */}
				{settings?.cms.best_section_title &&
					settings?.cms.best_sub_category_id && (
						<MotionFadeIn>
							<PopularItems3
								button_label="Check All"
								category_id={
									settings?.cms.best_sub_category_id?.toString() || ''
								}
								title={settings?.cms.best_section_title || ''}
							/>
						</MotionFadeIn>
					)}
			</div>
		</>
	);
}
