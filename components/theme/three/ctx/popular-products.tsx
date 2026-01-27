import { Card10 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';

export const PopularProducts = async ({
	buttons,
}: {
	buttons: { label: string; value: string }[];
}) => {
	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${buttons?.[0]?.value || ''}`
	);
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{products?.map((e) => (
				<Card10 key={e.id} data={e} />
			))}
		</div>
	);
};
