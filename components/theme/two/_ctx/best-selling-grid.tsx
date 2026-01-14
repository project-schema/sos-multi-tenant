import { iTenantFrontend } from '@/types/tenant-frontend';
import { BestSellingProducts } from './best-selling-products';

export function BestSellingGrid({
	settings,
}: {
	settings: iTenantFrontend | null;
}) {
	return (
		<div
			className={`grid  grid-cols-2  2xl:grid-cols-4 gap-3 lg:gap-6 max-w-[1720px] mx-auto px-4 lg:px-8`}
		>
			<BestSellingProducts
				title={settings?.recomended_category_id_1?.name ?? ''}
				id={settings?.cms.recomended_sub_category_id_1}
			/>
			<BestSellingProducts
				title={settings?.recomended_category_id_2?.name ?? ''}
				id={settings?.cms.recomended_sub_category_id_2}
			/>
			<BestSellingProducts
				title={settings?.recomended_category_id_3?.name ?? ''}
				id={settings?.cms.recomended_sub_category_id_3}
			/>
			<BestSellingProducts
				title={settings?.recomended_category_id_4?.name ?? ''}
				id={settings?.cms.recomended_sub_category_id_4}
			/>
		</div>
	);
}
