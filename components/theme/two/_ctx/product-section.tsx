import { Button } from '@/components/ui/button';
import { Card07 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib/api';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import Link from 'next/link';

interface ProductSectionProps {
	title: string;
	buttons?: { label: string; value: string }[];
	feature?: string;
}

export async function ProductSection({
	title,
	buttons,
	feature,
}: ProductSectionProps) {
	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${feature || buttons?.[0]?.value}`,
	);

	return (
		<div className="max-w-[1720px] mx-auto px-4 lg:px-8">
			<div className="flex items-center flex-wrap gap-4 justify-between mb-6">
				<h2 className="text-2xl font-semibold">{title}</h2>
				{buttons && buttons.length > 0 && (
					<div className="flex gap-2 overflow-x-auto">
						{buttons.map((button, index) => {
							if (!button.value) return null;
							return (
								<Link href={`/?feature=${button.value}`} key={index}>
									<Button variant="outline">{button.label}</Button>
								</Link>
							);
						})}
					</div>
				)}
			</div>
			<div
				className={`grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 2xl:grid-cols-5  gap-3 md:gap-6`}
			>
				{products?.map((product, index) => (
					<Card07 key={index} product={product} />
				))}
			</div>
		</div>
	);
}
