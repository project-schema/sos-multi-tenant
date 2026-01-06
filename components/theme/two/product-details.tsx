'use client';
import Footer02 from '@/components/web/footer/02';
import Header02 from '@/components/web/header/02';
import { useTenantFrontendProductBySlugQuery } from '@/store/features/frontend/product/api-slice';
import { useParams } from 'next/navigation';
import { ProductDescription } from './_ctx/product-description';
import { ProductGallery } from './_ctx/product-gallery';
import { ProductInfo } from './_ctx/product-info';
import { RelatedProduct } from './_ctx/related-product';

export default function ThemeTwoProductDetailsPage() {
	const { slug } = useParams();
	const { data } = useTenantFrontendProductBySlugQuery(
		{ slug: slug?.toString() || '' },
		{ skip: !slug }
	);

	return (
		<>
			<Header02 />
			<section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Top section: Gallery + Info */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Gallery */}
					<div className="lg:col-span-6">
						{data?.product && <ProductGallery product={data?.product} />}
					</div>

					{/* Info */}
					<div className="lg:col-span-6 space-y-5">
						{data?.product && <ProductInfo product={data?.product} />}
					</div>
				</div>

				{/* Tabs-like content */}
				{data?.product && <ProductDescription product={data?.product} />}

				{/* Related products */}
				{data?.product && <RelatedProduct product={data?.related_products} />}
			</section>
			<Footer02 />
		</>
	);
}
