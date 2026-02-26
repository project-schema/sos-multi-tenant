import { Card10, NotFoundCard12 } from '@/components/web';
import { getApiDataWithSubdomain, imageFormat } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
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
		}`,
	);
	const isActive = include || settings?.recomended_sub_category_id_1.id;
	return (
		<div className="max-w-[1740px] px-5 mx-auto">
			<div className="sp-60 mb-sp flex items-center gap-2 justify-center flex-wrap">
				{[
					{
						value: settings?.recomended_sub_category_id_1.id.toString(),
						label: settings?.recomended_category_id_1.name,
						image: settings?.recomended_category_id_1.image,
					},
					{
						value: settings?.recomended_sub_category_id_2.id.toString(),
						label: settings?.recomended_category_id_2.name,
						image: settings?.recomended_category_id_2.image,
					},
					{
						value: settings?.recomended_sub_category_id_3.id.toString(),
						label: settings?.recomended_category_id_3.name,
						image: settings?.recomended_category_id_3.image,
					},
					{
						value: settings?.recomended_sub_category_id_4.id.toString(),
						label: settings?.recomended_category_id_4.name,
						image: settings?.recomended_category_id_4.image,
					},
				].map((item) => {
					const activeItem = item.value.toString() === isActive.toString();
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
								src={imageFormat(item.image)}
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
			{products?.length === 0 ? (
				<NotFoundCard12 />
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{products?.map((e, index) => (
						<MotionFadeIn key={e.id} delay={index * 0.03}>
							<Card10 key={e.id} data={e} />
						</MotionFadeIn>
					))}
				</div>
			)}
		</div>
	);
};
