import { Card07, NotFoundCard12 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib/api';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import Link from 'next/link';

interface ProductSectionProps {
	title: string;
	buttons?: { label: string; value: string }[];
	include?: string;
}

export async function ProductSection2({
	title,
	buttons,
	include,
}: ProductSectionProps) {
	const activeFeature = include || buttons?.[0]?.value;
	if (!activeFeature) return null;
	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${include || buttons?.[0]?.value}`,
	);

	return (
		<div className="max-w-[1720px] mx-auto px-4 lg:px-8">
			<div className="flex items-center flex-wrap gap-4 justify-between mb-6">
				<h2 className="text-2xl font-semibold">{title}</h2>
				{buttons && buttons.length > 0 && (
					<div className="flex gap-2 overflow-x-auto">
						{buttons.map((button, index) => {
							if (!button.value) return null;
							const isActive = button.value === activeFeature;

							return (
								<Link
									scroll={false}
									href={`/?include=${button.value}`}
									key={index}
									className={`text-xs rounded-sm px-4 py-1.5 transition-all inline-flex
										${
											isActive
												? 'bg-orange-500 text-white'
												: 'text-black bg-stone-100 hover:bg-orange-500 hover:text-white'
										}
									`}
								>
									{button.label}
								</Link>
							);
						})}
					</div>
				)}
			</div>
			{products?.length === 0 ? (
				<NotFoundCard12
					title={buttons?.find((b) => b.value === activeFeature)?.label}
				/>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
					{products?.map((product, index) => (
						<MotionFadeIn key={product.id} delay={index * 0.03}>
							<Card07 product={product} />
						</MotionFadeIn>
					))}
				</div>
			)}
		</div>
	);
}
