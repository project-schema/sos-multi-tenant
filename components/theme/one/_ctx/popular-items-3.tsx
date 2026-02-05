import { Button } from '@/components/ui/button';
import { Card01 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib/api';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import Link from 'next/link';

export async function PopularItems3({
	buttons,
	title,
	include,
}: {
	buttons: { label: string; value: string }[];
	title: string;
	include?: string;
}) {
	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${include || buttons?.[0]?.value || ''}`
	);
	const active = include || buttons?.[0]?.value;

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between max-w-[1320px] px-4 mx-auto ">
				{title && <h2 className="text-[40px] font-bold">{title}</h2>}
				{buttons && buttons.length > 0 && (
					<div className="flex gap-2">
						{buttons.map((button) => {
							const isActive = button.value === active;
							return (
								<Link
									href={`/shop?category_id=${button.value}`}
									key={button.value}
									scroll={false}
								>
									<Button
										variant={isActive ? 'default' : 'outline'}
										className={isActive ? 'bg-black text-white' : ''}
									>
										{button.label}
									</Button>
								</Link>
							);
						})}
					</div>
				)}
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1320px] px-4 mx-auto">
				{products?.map((product) => (
					<Card01 key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
