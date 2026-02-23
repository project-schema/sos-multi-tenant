import { Pagination1 } from '@/components/dashboard/pagination';
import { Card07 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { iPagination } from '@/types';
import { ShopSearchParams } from '@/types/web-shop-page';
import { notFound } from 'next/navigation';
import CommonShopSidebar from '../common/shop-sidebar';

export default async function ThemeTwoShopPageSuspense({
	searchParams,
}: {
	searchParams: ShopSearchParams;
}) {
	const { category_id, min_price, max_price, color_id, size_id } =
		await searchParams;
	const params = new URLSearchParams();

	if (category_id) params.set('category_id', category_id);
	if (min_price) params.set('min_price', min_price);
	if (max_price) params.set('max_price', max_price);
	if (color_id) params.set('color_id', color_id);
	if (size_id) params.set('size_id', size_id);

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
			<section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					{/* Sidebar Filters */}
					<div className="lg:col-span-2">
						<MotionFadeIn>
							<CommonShopSidebar />
						</MotionFadeIn>
					</div>

					{/* Products Grid */}
					<div className="lg:col-span-10">
						{/* Page Header */}
						<div className="flex items-center justify-between mb-4">
							<h1 className="text-2xl font-semibold">Explore All Products</h1>
							{/* <div className="text-sm text-gray-500">
								Showing 1–12 of 129 results
							</div> */}
						</div>

						<div
							key={animationKey}
							className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4"
						>
							{products?.data?.map((product, index) => (
								<MotionFadeIn key={product.id} delay={index * 0.03}>
									<Card07 product={product} />
								</MotionFadeIn>
							))}
						</div>

						{/* Pagination */}
						<MotionFadeIn>
							<div className="mt-8  ">
								<Pagination1 pagination={products} />
							</div>
						</MotionFadeIn>
					</div>
				</div>
			</section>
		</>
	);
}
