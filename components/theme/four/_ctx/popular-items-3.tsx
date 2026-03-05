import { Button } from '@/components/ui/button';
import { Card01, NotFoundCard12 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib/api';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import Link from 'next/link';

export async function PopularItems3({
	category_id,
	button_label,
	title,
}: {
	button_label: string;
	category_id: string;
	title: string;
}) {
	if (!category_id) {
		return null;
	}
	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${category_id}`,
	);

	return (
		<div className="space-y-8">
			<div className="text-center">
				{title && (
					<h2 className="text-lg capitalize sm:text-xl lg:text-2xl 2xl:text-[40px] font-bold text-center">
						{title}
					</h2>
				)}
			</div>

			{products?.length === 0 ? (
				<div className="max-w-[1320px] px-4 mx-auto">
					<NotFoundCard12 title={title} />
				</div>
			) : (
				<>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 max-w-[1320px] px-4 mx-auto">
						{products?.map((product, index) => (
							<MotionFadeIn key={product.id} delay={index * 0.03}>
								<Card01 key={product.id} product={product} />
							</MotionFadeIn>
						))}
					</div>
					<div className="text-center">
						<Link href={`/shop?category_id=${category_id}`} scroll={false}>
							<Button className="bg-primary3 hover:bg-primary3/80">
								{button_label}
							</Button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
}
