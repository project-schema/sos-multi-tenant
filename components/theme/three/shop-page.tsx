import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Card10, Footer03, Header03 } from '@/components/web';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { iPagination } from '@/types';

const dummyProducts = Array.from({ length: 12 }).map((_, idx) => ({
	id: idx + 1,
}));

export default function ThemeThreeShopPage({
	data,
}: {
	data: iPagination<iVendorProduct>;
}) {
	return (
		<>
			<Header03 />
			<div className="bg-[#F6F3E9]">
				<section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
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
						<aside className="lg:col-span-2 space-y-6">
							<div className="border rounded-md p-4">
								<h3 className="font-semibold mb-3">Category</h3>
								<ul className="space-y-2 text-sm">
									<li className="flex items-center justify-between">
										<span>Men’s Fashion</span>
										<span className="text-gray-500">110</span>
									</li>
									<li className="flex items-center justify-between">
										<span>Women Fashion</span>
										<span className="text-gray-500">125</span>
									</li>
								</ul>
							</div>

							<div className="border rounded-md p-4">
								<h3 className="font-semibold mb-3">Price</h3>
								<div className="grid grid-cols-2 gap-3">
									<input
										className="border rounded p-2 text-sm"
										placeholder="From"
									/>
									<input
										className="border rounded p-2 text-sm"
										placeholder="To"
									/>
								</div>
							</div>

							<div className="border rounded-md p-4">
								<h3 className="font-semibold mb-3">Size</h3>
								<div className="flex flex-wrap gap-2">
									{['S', 'M', 'L', 'XL'].map((s) => (
										<button
											key={s}
											className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
										>
											{s}
										</button>
									))}
								</div>
							</div>

							<div className="border rounded-md p-4">
								<h3 className="font-semibold mb-3">Color</h3>
								<div className="flex items-center gap-3">
									{['#111827', '#DC2626', '#2563EB', '#10B981', '#F59E0B'].map(
										(c) => (
											<button
												key={c}
												className="w-6 h-6 rounded-full border"
												style={{ background: c }}
												aria-label={c}
											/>
										),
									)}
								</div>
							</div>
						</aside>

						{/* Products Grid */}
						<div className="lg:col-span-10">
							<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
								{data?.data?.map((p) => (
									<Card10 key={p.id} data={p} />
								))}
							</div>

							{/* Pagination */}
							<div className="mt-10">
								<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious href="#" />
										</PaginationItem>
										{[1, 2, 3, 4, 5, 6].map((n) => (
											<PaginationItem key={n}>
												<PaginationLink href="#" isActive={n === 2}>
													{n}
												</PaginationLink>
											</PaginationItem>
										))}
										<PaginationItem>
											<PaginationEllipsis />
										</PaginationItem>
										<PaginationItem>
											<PaginationNext href="#" />
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</div>
						</div>
					</div>
				</section>
			</div>
			<Footer03 />
		</>
	);
}
