'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { CardContent, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { dateFormat, sign, tableSrCount, timeFormat } from '@/lib';
import { useGetAllCartsQuery } from '@/store/features/dropshipper/cart';
import { ShoppingCartIcon, X } from 'lucide-react';
import Link from 'next/link';

export default function CartPageClient() {
	const { data, isLoading, isError, isFetching } = useGetAllCartsQuery();

	return (
		<Container1
			isLoading={isLoading}
			isError={isError}
			header={<CardTitle>Cart List</CardTitle>}
		>
			<CardContent className="space-y-4">
				<div className="border rounded-lg relative">
					{isFetching && <Loader8 />}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="bg-stone-100">Sr. </TableHead>
								<TableHead className="bg-stone-100">Product </TableHead>
								<TableHead className="bg-stone-100">Price </TableHead>
								<TableHead className="bg-stone-100">Per Commission </TableHead>
								<TableHead className="bg-stone-100">Qty</TableHead>
								<TableHead className="bg-stone-100">Income </TableHead>
								<TableHead className="bg-stone-100">Date</TableHead>
								<TableHead className="bg-stone-100 w-10">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.products?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={11}
										className="text-center py-8 text-muted-foreground"
									>
										No users found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.products?.map((product, i) => (
									<TableRow key={product.id}>
										<TableCell className="font-medium py-4">
											{tableSrCount(1, i)}
										</TableCell>
										<TableCell className="font-medium py-4">
											{product.name}
										</TableCell>
										<TableCell className="py-2">
											{product.selling_price}
											{sign.tk}
										</TableCell>
										<TableCell className="py-2">
											{product.advance_payment || 0}
											{sign.tk}
										</TableCell>
										<TableCell className="py-2">{product.qty}</TableCell>
										<TableCell className="py-2">{product.alert_qty}</TableCell>
										<TableCell className="py-2">
											{dateFormat(product.created_at)} <br />
											{timeFormat(product.created_at)}
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<Button variant="outline">
												<X className="size-4 text-destructive" />
												<span className="sr-only">Remove</span>
											</Button>
											<Link href={`/dashboard/cart/${product.cart_id}`}>
												<Button variant="outline">
													<ShoppingCartIcon className="size-4" />
													<span>Checkout</span>
												</Button>
											</Link>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Container1>
	);
}
