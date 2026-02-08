import { Card10 } from '@/components/web';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Image from 'next/image';
import Link from 'next/link';

export const RecommendedProducts = async ({
	settings,
	include,
}: {
	settings: iTenantFrontend;
	include: string;
}) => {
	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${
			include || settings?.recomended_sub_category_id_1.id || ''
		}`
	);
	const isActive = include || settings?.recomended_sub_category_id_1.id;
	return (
		<div className="max-w-[1720px] mx-auto">
			<div className="sp-60 mb-sp flex items-center gap-2 justify-center">
				{[
					{
						value: settings?.recomended_sub_category_id_1.id.toString(),
						label: settings?.recomended_category_id_1.name,
					},
					{
						value: settings?.recomended_sub_category_id_2.id.toString(),
						label: settings?.recomended_category_id_2.name,
					},
					{
						value: settings?.recomended_sub_category_id_3.id.toString(),
						label: settings?.recomended_category_id_3.name,
					},
					{
						value: settings?.recomended_sub_category_id_4.id.toString(),
						label: settings?.recomended_category_id_4.name,
					},
				].map((item) => {
					const activeItem = item.value === isActive;
					return (
						<Link
							key={item.value}
							href={`?include=${item.value}`}
							scroll={false}
							className={`flex items-center gap-2 border border-primary3 rounded-full p-2 pe-4 group hover:bg-primary3 hover:text-white transition-all duration-300 ${
								activeItem ? 'bg-primary3 text-white' : ''
							}`}
						>
							<Image
								src={env.placeholderImage}
								alt="image"
								width={50}
								height={50}
								className="w-12  rounded-full h-12 object-cover block"
							/>
							<span
								className={`fs-22 font-medium font-kalnia group-hover:text-white transition-all duration-300 ${
									activeItem ? 'text-white' : 'text-primary3'
								}`}
							>
								{item.label}
							</span>
						</Link>
					);
				})}
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products?.map((e) => (
					<Card10 key={e.id} data={e} />
				))}
			</div>
		</div>
	);
};
