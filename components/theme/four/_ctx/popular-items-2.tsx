import { Button } from '@/components/ui/button';
import { Card01, NotFoundCard12 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib/api';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import Link from 'next/link';

export async function PopularItems2({
	buttons,
	title,
	include,
	description,
}: {
	buttons: { label: string; value: string }[];
	title: string;
	include?: string;
	description: string;
}) {
	const active = include || buttons?.[0]?.value;
	if (!active) {
		return null;
	}
	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${include || buttons?.[0]?.value || ''}`,
	);

	return (
		<div className="space-y-8">
			<div className="space-y-4 flex flex-col items-center text-center max-w-[1320px] px-4 mx-auto ">
				<div className="max-w-3xl mx-auto">
					{title && (
						<h2 className="text-lg capitalize sm:text-xl lg:text-2xl 2xl:text-[40px] font-bold text-center">
							{title}
						</h2>
					)}
					{description && (
						<p className="text-base line-clamp-2">{description}</p>
					)}
				</div>
				{buttons && buttons.length > 0 && (
					<div className="flex gap-2 flex-wrap justify-center">
						{buttons.map((button) => {
							const isActive = button.value === active;
							return (
								<Link
									href={`?include=${button.value}`}
									key={button.value}
									scroll={false}
								>
									<Button
										variant={isActive ? 'default' : 'outline'}
										className={
											isActive
												? 'bg-primary3 hover:bg-primary3/80 text-white'
												: ''
										}
									>
										{button.label}
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
