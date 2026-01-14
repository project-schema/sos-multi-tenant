import { Card07 } from '@/components/web';
import { getApiDataWithSubdomain, imageFormat } from '@/lib';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Link from 'next/link';

export async function TrendingProducts({
	settings,
	trend,
}: {
	settings: iTenantFrontend | null;
	trend: string;
}) {
	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${
			trend || settings?.cms?.populer_section_subcategory_id_1
		}`
	);
	const categoryLinks = [
		{
			label: settings?.populer_section_category_id_1?.name,
			subcategory_id: settings?.cms?.populer_section_subcategory_id_1,
		},
		{
			label: settings?.populer_section_category_id_2?.name,
			subcategory_id: settings?.cms?.populer_section_subcategory_id_2,
		},
		{
			label: settings?.populer_section_category_id_3?.name,
			subcategory_id: settings?.cms?.populer_section_subcategory_id_3,
		},
		{
			label: settings?.populer_section_category_id_4?.name,
			subcategory_id: settings?.cms?.populer_section_subcategory_id_4,
		},
	];

	return (
		<div className="max-w-[1720px] mx-auto grid grid-cols-12 gap-6 px-4 lg:px-8">
			<div className="hidden xl:block xl:col-span-3">
				<img
					src={imageFormat(settings?.cms?.populer_section_banner ?? null)}
					alt="Trending products banner"
					width={1000}
					height={1000}
					className="w-full h-full object-cover rounded-[12px]"
				/>
			</div>
			<div className="col-span-12 xl:col-span-9">
				<div className="flex items-center justify-between mb-4 flex-wrap gap-4">
					<h2 className="text-2xl font-semibold">
						{settings?.cms?.populer_section_title}
					</h2>
					<ul className="flex gap-2">
						{categoryLinks.map((link) => (
							<li key={link.subcategory_id}>
								<Link
									href={`/?trend=${link.subcategory_id}`}
									className="text-xs text-black bg-stone-100 rounded-sm px-4 py-1.5 hover:bg-orange-500 hover:text-white transition-all inline-flex"
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 2xl:grid-cols-4  gap-3 md:gap-6">
					{products?.map((product, index) => (
						<Card07 key={index} product={product} />
					))}
				</div>
			</div>
		</div>
	);
}
