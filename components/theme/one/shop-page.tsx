import { Pagination1 } from '@/components/dashboard/pagination';
import { Card01 } from '@/components/web';
import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { iPagination } from '@/types';
import CommonShopSidebar from '../common/shop-sidebar';

export default function ThemeOneShopPage({
	data,
}: {
	data: iPagination<iVendorProduct>;
}) {
	return (
		<>
			<Header01 />
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Page Header */}
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
						Explore All Products
					</h1>
					<div className="text-sm text-gray-500">
						Showing 1–12 of 129 results
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					{/* Sidebar Filters */}
					<CommonShopSidebar />

					{/* Products Grid */}
					<div className="lg:col-span-9">
						<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
							{data?.data?.map((p) => (
								<Card01 key={p.id} />
							))}
						</div>

						{/* Pagination */}
						<div className="mt-8">
							<Pagination1 pagination={data} setPage={() => {}} />
						</div>
					</div>
				</div>
			</section>
			<Footer01 />
		</>
	);
}
