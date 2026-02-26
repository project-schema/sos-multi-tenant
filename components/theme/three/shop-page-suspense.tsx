import { Pagination2 } from '@/components/dashboard/pagination';
import { Card10, NotFoundCard12 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { iPagination } from '@/types';
import { ShopSearchParams } from '@/types/web-shop-page';
import { notFound } from 'next/navigation';
import CommonShopSidebar from '../common/shop-sidebar';
import { ShopMobileFilter } from '../two/_ctx/shop-mobile-filter';

export default async function ThemeThreeShopSuspensePage({
	searchParams,
}: {
	searchParams: ShopSearchParams;
}) {
	const {
		category_id,
		min_price,
		max_price,
		color_id,
		size_id,
		page = '1',
	} = await searchParams;
	const params = new URLSearchParams();

	if (category_id) params.set('category_id', category_id);
	if (min_price) params.set('min_price', min_price);
	if (max_price) params.set('max_price', max_price);
	if (color_id) params.set('color_id', color_id);
	if (size_id) params.set('size_id', size_id);
	params.set('page', page);
	if (category_id || min_price || max_price || color_id || size_id) {
		params.delete('page');
	}
	const queryString = params.toString();
	const url = `/tenant-frontend/products${
		queryString ? `?${queryString}` : ''
	}`;
	const animationKey = `${category_id}-${min_price}-${max_price}-${color_id}-${size_id}`;
	const products =
		await getApiDataWithSubdomain<iPagination<iVendorProduct> | null>(url);

	if (!products) {
		return notFound();
	}
	return (
		<>
			<main className="bg-primary3/5">
				<section className="max-w-[1740px] px-5 mx-auto py-8">
					{/* Page Header */}
					<div className="flex items-center justify-between mb-6">
						<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
							Explore All Products
						</h1>
						{/* Mobile Filter Button */}
						<div className="lg:hidden">
							<ShopMobileFilter />
						</div>
						<div className="text-sm text-gray-500 hidden lg:block">
							<p className="text-sm text-muted-foreground">
								Showing {products?.from} to {products?.to} of {products?.total}{' '}
								items
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
						<aside className="lg:col-span-2 hidden lg:block">
							<CommonShopSidebar />
						</aside>

						{/* Products Grid */}
						<div className="lg:col-span-10">
							{/* Products Grid */}
							{products?.data?.length === 0 ? (
								<NotFoundCard12 />
							) : (
								<div
									key={animationKey}
									className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
								>
									{products?.data?.map((product, index) => (
										<MotionFadeIn key={product.id} delay={index * 0.03}>
											<Card10 key={product.id} data={product} />
										</MotionFadeIn>
									))}
								</div>
							)}

							{/* Pagination */}
							<MotionFadeIn className="mt-8">
								<Pagination2 pagination={products} />
							</MotionFadeIn>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
