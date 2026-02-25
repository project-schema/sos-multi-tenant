import { Loader8 } from '@/components/dashboard';
import Footer02 from '@/components/web/footer/02';
import Header02 from '@/components/web/header/02';
import { getApiDataWithSubdomain, MotionShow } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import {
	iVendorProduct,
	iVendorProductView,
} from '@/store/features/vendor/product/vendor-product-type';
import { Suspense } from 'react';
import { ProductDescription } from './_ctx/product-description';
import { ProductGallery } from './_ctx/product-gallery';
import { ProductInfo } from './_ctx/product-info';
import { RelatedProduct } from './_ctx/related-product';

export default async function ThemeTwoProductDetailsSuspense({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = await params;
	const data = await getApiDataWithSubdomain<{
		product: iVendorProductView;
		related_products: iVendorProduct[];
	}>(`/tenant-frontend/product/${slug}`);

	return (
		<>
			<Header02 />
			<Suspense fallback={<Loader8 />}>
				<section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{/* Top section: Gallery + Info */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
						{/* Gallery */}
						<div className="lg:col-span-6">
							{data && (
								<MotionShow>
									<ProductGallery product={data?.product ?? null} />
								</MotionShow>
							)}
						</div>

						{/* Info */}
						<div className="lg:col-span-6 space-y-5">
							{data && (
								<MotionFadeIn>
									<ProductInfo product={data?.product ?? null} />
								</MotionFadeIn>
							)}
						</div>
					</div>

					{/* Tabs-like content */}
					{data && (
						<MotionFadeIn>
							<ProductDescription product={data?.product ?? null} />
						</MotionFadeIn>
					)}

					{/* Related products */}
					{data?.related_products && data?.related_products?.length > 0 && (
						<MotionFadeIn>
							<RelatedProduct product={data?.related_products ?? null} />
						</MotionFadeIn>
					)}
				</section>
			</Suspense>
			<Footer02 />
		</>
	);
}
