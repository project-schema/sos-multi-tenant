import { Card07 } from '@/components/web';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';

export function RelatedProduct({ product }: { product: iVendorProduct[] }) {
	return (
		<div className="mt-12">
			<div className="flex items-center justify-between mb-5">
				<h2 className="text-2xl font-bold">You Might Also Like</h2>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
				{product?.slice(0, 5)?.map((p) => (
					<Card07 key={p.id} product={p} />
				))}
			</div>
		</div>
	);
}
