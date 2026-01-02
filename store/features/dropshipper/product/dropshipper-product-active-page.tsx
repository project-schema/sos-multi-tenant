'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import {
	badgeFormat,
	dateFormat,
	env,
	productPrice,
	sign,
	tableSrCount,
	textCount,
} from '@/lib';
import { Ellipsis, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DropshipperCustomPrice } from './dropshipper-custom-price';
import { useAllRequestProductQuery } from './dropshipper-product-api-slice';
import { DropshipperRequestProductFilter } from './dropshipper-request-product-filter';

// Local storage key for view preference
const VIEW_PREFERENCE_KEY = 'vendor-product-view-preference';

export default function DropshipperProductActivePage({
	status,
}: {
	status: string;
}) {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);
	const [viewMode, setViewMode] = useState<'list' | 'card'>(() => {
		const savedViewMode = localStorage.getItem(VIEW_PREFERENCE_KEY);
		return savedViewMode === 'card' || savedViewMode === 'list'
			? savedViewMode
			: 'list';
	});

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useAllRequestProductQuery({
		page: page,
		search: debouncedSearchTerm,
		status: status,
	});

	useEffect(() => {
		localStorage.setItem(VIEW_PREFERENCE_KEY, viewMode);
	}, [viewMode]);

	useEffect(() => {
		setPage(1);
	}, [debouncedSearchTerm]);

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<>
					<div className="pb-2  flex items-center justify-between">
						<CardTitle>Active Products</CardTitle>
					</div>
				</>
			}
		>
			{toggleFilter && (
				<DropshipperRequestProductFilter
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			)}
			{data?.products && (
				<>
					<div className="relative overflow-hidden">
						{isFetching && <Loader8 />}

						<div className="border rounded-lg ">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="bg-stone-100">Sr.</TableHead>
										<TableHead className="bg-stone-100 w-10">ID</TableHead>
										<TableHead className="bg-stone-100">Image</TableHead>
										<TableHead className="bg-stone-100">Product Name</TableHead>

										<TableHead className="bg-stone-100">
											Merchant Price
										</TableHead>
										<TableHead className="bg-stone-100">
											Selling Price
										</TableHead>
										<TableHead className="bg-stone-100">Date </TableHead>
										<TableHead className="bg-stone-100">Status </TableHead>
										<TableHead className="bg-stone-100">Action </TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.products?.data?.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={10}
												className="text-center py-8 text-muted-foreground"
											>
												No items found matching your criteria
											</TableCell>
										</TableRow>
									) : (
										data?.products?.data?.map((item, i) => (
											<TableRow key={item.id}>
												<TableCell className="py-2 pl-4">
													{tableSrCount(data?.products?.current_page, i)}
												</TableCell>
												<TableCell className="font-medium py-4 relative">
													<span>#{item.uniqid}</span>
												</TableCell>
												<TableCell className="py-2">
													<Link
														href={`/dashboard/dropshipper-products/active/${item.tenant_id}/${item?.product?.id}`}
													>
														<Avatar className="h-12 w-12 rounded-xl">
															<AvatarImage
																src={env.baseAPI + '/' + item?.product?.image}
																alt={item?.product?.name}
																className="object-cover"
															/>
															<AvatarFallback className="rounded-xl bg-sky-100">
																{item?.product?.name?.charAt(0).toUpperCase()}
															</AvatarFallback>
														</Avatar>
													</Link>
												</TableCell>
												<TableCell className="py-2">
													<Link
														className="hover:underline hover:text-blue-500 transition"
														href={`/dashboard/dropshipper-products/active/${item.tenant_id}/${item?.product?.id}`}
													>
														{textCount(item?.product?.name, 15)}
													</Link>
												</TableCell>

												<TableCell className="py-2">
													<Badge variant="outline">
														{productPrice({
															selling_price: item?.product?.selling_price,
															discount_price: item?.product?.discount_price,
														})}{' '}
														{sign.tk}
													</Badge>
												</TableCell>

												<TableCell className="py-2">
													<Badge variant="outline">
														{productPrice({
															selling_price: item?.product?.selling_price,
															discount_price: item?.product?.discount_price,
														}) + Number(item?.profit_amount)}{' '}
														{sign.tk}
													</Badge>
												</TableCell>

												<TableCell className="py-2">
													{dateFormat(item.created_at)}
												</TableCell>
												<TableCell className="py-2">
													<Badge
														className="capitalize"
														variant={badgeFormat(Number(item.status))}
													>
														{item.status === 1
															? 'Active'
															: item.status === 2
															? 'Pending'
															: 'Rejected'}
													</Badge>
												</TableCell>
												<TableCell className="py-2">
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="outline"
																className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
																size="icon"
															>
																<Ellipsis />
																<span className="sr-only">Open menu</span>
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align="end" className="w-56">
															<DropdownMenuItem>
																<Link
																	className="flex items-center gap-2 w-full"
																	href={`/dashboard/dropshipper-products/active/${item.tenant_id}/${item?.product?.id}`}
																>
																	<ExternalLink className="size-4" />
																	<span>View Product</span>
																</Link>
															</DropdownMenuItem>
															<DropshipperCustomPrice data={item} />
														</DropdownMenuContent>
													</DropdownMenu>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
					</div>
					<Pagination1 pagination={data?.products} setPage={setPage} />
				</>
			)}
		</Container1>
	);
}
