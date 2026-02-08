import { Card01 } from '@/components/web';
import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import { getApiDataWithSubdomain } from '@/lib';
import {
	iVendorProduct,
	iVendorProductView,
} from '@/store/features/vendor/product/vendor-product-type';
import { Check, Home, LocationEdit, MessageCirclePlus } from 'lucide-react';
import { ProductDescription } from './_ctx/product-description';
import { ProductGallery } from './_ctx/product-gallery';
import { ProductInfo } from './_ctx/product-info';

export default async function ThemeOneProductDetailsPage({
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
			<Header01 />
			<section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Top section: Gallery + Info */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Gallery */}
					<div className="lg:col-span-4">
						{data?.product && <ProductGallery product={data?.product} />}
					</div>

					{/* Info */}
					<ProductInfo product={data?.product} />

					<div className="lg:col-span-3">
						<div className="border hidden rounded-md p-3 space-y-3">
							<div className="space-y-2 border-b border-gray-200 pb-3">
								<h2 className="text-base font-semibold">Delivery Options</h2>
								<div className="text-sm space-y-2">
									<p className="flex items-center gap-2">
										<Check className="w-4 h-4" /> Cash On Delivery Available
									</p>
									<p className="flex items-center gap-2">
										<Home className="w-4 h-4" /> Home delivery all over the
										country.
									</p>
									<p className="flex items-center gap-2">
										<LocationEdit className="w-4 h-4" /> Delivery Charge Inside
										Dhaka (70Tk) 70 TK
									</p>
									<p className="flex items-center gap-2">
										<LocationEdit className="w-4 h-4" /> Delivery Charge Outside
										Dhaka (120 Tk) 120 TK
									</p>
								</div>
							</div>
							<div className="space-y-2">
								<h2 className="text-base font-semibold">
									Have any question? Call Now.
								</h2>
								<div className="text-sm space-y-2">
									<p className="flex items-center gap-2">
										<MessageCirclePlus className="w-4 h-4" /> 013464679741
									</p>
									<p className="flex items-center gap-2">
										<MessageCirclePlus className="w-4 h-4" /> 013464679741
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{data?.product && <ProductDescription product={data?.product} />}

				{/* Related products */}
				{data?.related_products && data?.related_products?.length > 0 && (
					<div className="mt-12">
						<div className="flex items-center justify-between mb-5">
							<h2 className="text-2xl font-bold">You Might Also Like</h2>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
							{data?.related_products?.map((p) => (
								<Card01 key={p.id} product={p} />
							))}
						</div>
					</div>
				)}
			</section>
			<Footer01 />
		</>
	);
}
