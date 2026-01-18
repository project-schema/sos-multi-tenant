import { Pagination1 } from '@/components/dashboard/pagination';
import { Card07, Footer02 } from '@/components/web';
import Header02 from '@/components/web/header/02';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { iPagination } from '@/types';
import CommonShopSidebar from '../common/shop-sidebar';

export default function ThemeTwoShopPage({
	data,
}: {
	data: iPagination<iVendorProduct>;
}) {
	return (
		<>
			<Header02 />
			<section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					{/* Sidebar Filters */}
					<div className="lg:col-span-2">
						<CommonShopSidebar />
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

						<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
							{data?.data?.map((p) => (
								<Card07 key={p.id} product={p} />
							))}
						</div>

						{/* Pagination */}
						<div className="mt-8  ">
							<Pagination1 pagination={data} setPage={() => {}} />
						</div>
					</div>
				</div>
			</section>
			<Footer02 />
		</>
	);
}
