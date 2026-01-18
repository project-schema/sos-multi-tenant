'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { AdminAdvertiseFilter } from '@/store/features/admin/advertise';

import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useVendorServicesOrderQuery } from './vendor-services-api-slice';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import {
	badgeFormat,
	dateFormat,
	sign,
	tableSrCount,
	textCount,
	timeFormat,
} from '@/lib';

import Link from 'next/link';
import { VendorServicesOrderStatistics } from './vendor-services-order-statistics';
export function VendorServicesOrderPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } =
		useVendorServicesOrderQuery();

	useEffect(() => {
		setPage(1);
	}, [debouncedSearchTerm]);

	const services = data?.message;

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Services Order</CardTitle>
							<Button
								className="ml-auto"
								variant="outline"
								size="icon"
								onClick={() => setToggleFilter((e) => !e)}
							>
								<SlidersHorizontal className="h-4 w-4" />
							</Button>
						</div>
						{toggleFilter && <VendorServicesOrderStatistics />}
					</>
				}
			>
				{/* Filter */}
				{toggleFilter && (
					<AdminAdvertiseFilter
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
				)}
				{data?.message && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="bg-stone-100">Sr.</TableHead>
										<TableHead className="bg-stone-100 w-10">
											Order Id
										</TableHead>
										<TableHead className="bg-stone-100">Service </TableHead>
										<TableHead className="bg-stone-100">User Name </TableHead>
										<TableHead className="bg-stone-100">Amount </TableHead>
										<TableHead className="bg-stone-100"> Details </TableHead>
										<TableHead className="bg-stone-100">Date </TableHead>
										<TableHead className="bg-stone-100">Status </TableHead>
										<TableHead className="bg-stone-100">Action </TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{services?.data.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={10}
												className="text-center py-8 text-muted-foreground"
											>
												No items found matching your criteria
											</TableCell>
										</TableRow>
									) : (
										services?.data.map((item, i) => {
											return (
												<TableRow key={item.id}>
													<TableCell className="py-2 pl-4">
														{tableSrCount(services.current_page, i)}
													</TableCell>
													<TableCell className="font-medium py-4">
														{item.trxid ? `#${item.trxid}` : '--'}
													</TableCell>

													<TableCell className="py-2">
														{item?.servicedetails ? (
															<Link
																className="hover:underline hover:text-blue-500 transition"
																href={`/dashboard/services/order/${item.id}`}
															>
																{textCount(item?.servicedetails?.title, 20)}
															</Link>
														) : (
															'--'
														)}
													</TableCell>

													<TableCell className="py-2">
														<Link
															className="hover:underline hover:text-blue-500 transition"
															href={`/admin/users/${item.id}`}
														>
															{item?.customerdetails?.name}
														</Link>
													</TableCell>

													<TableCell className="py-2">
														<Badge className="capitalize" variant="default">
															{item?.amount || '00'} {sign.tk}
														</Badge>
													</TableCell>
													<TableCell className="py-2">
														{textCount(item?.details, 70)}
													</TableCell>
													<TableCell className="py-2">
														{dateFormat(item.created_at)} <br />
														{timeFormat(item.created_at)}
													</TableCell>
													<TableCell className="py-2 space-y-1">
														<Badge
															className="capitalize"
															variant={badgeFormat(item.status)}
														>
															{item.status}
														</Badge>
														{(item as any).is_rejected === '1' && (
															<>
																<br />
																<Badge
																	className="capitalize"
																	variant="destructive"
																>
																	Rejected
																</Badge>
															</>
														)}
													</TableCell>
													<TableCell className="py-2"></TableCell>
												</TableRow>
											);
										})
									)}
								</TableBody>
							</Table>
						</div>
						<Pagination1 pagination={data?.message} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
