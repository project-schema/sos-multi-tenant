import { Card10, NotFoundCard12 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';

export const PopularProducts = async ({
	buttons,
}: {
	buttons: { label: string; value: string }[];
}) => {
	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${buttons?.[0]?.value || ''}`,
	);
	return (
		<>
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
		</>
	);
};
