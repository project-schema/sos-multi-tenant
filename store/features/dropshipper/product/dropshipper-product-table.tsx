'use client';

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	badgeFormat,
	dateFormat,
	env,
	sign,
	tableSrCount,
	textCount,
} from '@/lib';

import { iPagination } from '@/types';
import { Ellipsis, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { iDropShipperProduct } from './dropshipper-product-type';

export function DropShipperProductTable({
	data,
}: {
	data: iPagination<iDropShipperProduct>;
}) {
	const products = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100 w-10">ID</TableHead>
					<TableHead className="bg-stone-100">Image</TableHead>
					<TableHead className="bg-stone-100">Product Name </TableHead>
					<TableHead className="bg-stone-100">Original Price </TableHead>
					<TableHead className="bg-stone-100">Sale Price </TableHead>
					<TableHead className="bg-stone-100">Offer </TableHead>
					<TableHead className="bg-stone-100">Stock </TableHead>
					<TableHead className="bg-stone-100">Date </TableHead>
					<TableHead className="bg-stone-100">Status </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={11}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					products?.map((item, i) => (
						<TableRow key={`${item.id}-${i}`}>
							<TableCell className="py-2 pl-4">
								{tableSrCount(data.current_page, i)}
							</TableCell>
							<TableCell className="font-medium py-4">#{item.uniqid}</TableCell>
							<TableCell className="py-2">
								<Link
									href={`/dashboard/dropshipper-products/request/${item?.tenant_id}/${item.id}`}
								>
									<Avatar className="h-12 w-12 rounded-xl">
										<AvatarImage
											src={env.baseAPI + '/' + item.image}
											alt={item.name}
										/>
										<AvatarFallback className="rounded-xl bg-sky-100">
											{item.name.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</Link>
							</TableCell>
							<TableCell className="py-2">
								<Link
									className="hover:underline hover:text-blue-500 transition"
									href={`/dashboard/dropshipper-products/request/${item.tenant_id}/${item.id}`}
								>
									{textCount(item.name, 15)}
								</Link>
							</TableCell>
							<TableCell className="py-2">
								<Badge variant="info">
									{item.original_price} {sign.tk}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								<Badge variant="outline">
									{item.selling_price} {sign.tk}
								</Badge>
							</TableCell>
							<TableCell className="py-2">
								<Badge variant="success">{item.discount_price || '00'} </Badge>
							</TableCell>

							<TableCell className="py-2">
								<Badge variant="default">{item.qty || '00'} </Badge>
							</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.created_at)}
							</TableCell>
							<TableCell className="py-2">
								<Badge
									className="capitalize"
									variant={badgeFormat(item.status)}
								>
									{item.status}
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
												href={`/dashboard/dropshipper-products/request/${item.tenant_id}/${item.id}`}
											>
												<ExternalLink className="size-4" />
												<span>View Product</span>
											</Link>
										</DropdownMenuItem>

										{/* {item.status !== 'active' && (
											<AdminProductStatusActive data={item} />
										)} */}

										{/* <AdminProductRejectModal data={item} /> */}

										{/* <DropdownMenuSeparator /> */}

										{/* Delete Product  */}
										{/* <MerchantProductDelete data={item} /> */}
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
