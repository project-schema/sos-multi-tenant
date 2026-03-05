import { Button } from '@/components/ui/button';
import { Card01, NotFoundCard12 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib/api';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import Link from 'next/link';

export async function PopularItems({
	buttons,
	title,
}: {
	buttons: { label: string; value: string }[];
	title: string;
}) {
	if (!buttons?.[0]?.value) {
		return null;
	}

	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${buttons?.[0]?.value || ''}`,
	);

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between max-w-[1320px] px-4 mx-auto ">
				{title && (
					<h2 className="text-lg sm:text-xl lg:text-2xl 2xl:text-[40px] font-bold">
						{title}
					</h2>
				)}
				{buttons && buttons.length > 0 && (
					<div className="flex gap-2">
						{buttons.map((button) => {
							return (
								<Link
									href={`/shop?category_id=${button.label}`}
									key={button.value}
								>
									<Button className="bg-primary3 hover:bg-white hover:text-primary3 border-primary3 border text-white hover:border-primary3">
										Check All
									</Button>
								</Link>
							);
						})}
					</div>
				)}
			</div>

			{products?.length === 0 ? (
				<div className="max-w-[1320px] px-4 mx-auto">
					<NotFoundCard12 title={title} />
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 max-w-[1320px] px-4 mx-auto">
					{products?.map((product, index) => (
						<MotionFadeIn key={product.id} delay={index * 0.03}>
							<Card01 key={product.id} product={product} />
						</MotionFadeIn>
					))}
				</div>
			)}
		</div>
	);
}
