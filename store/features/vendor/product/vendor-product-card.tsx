'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { badgeFormat, dateFormat, env, sign, textCount } from '@/lib';
import { iPagination } from '@/types';
import Link from 'next/link';
import { iVendorProduct } from './vendor-product-type';

export function VendorProductCard({
	data,
}: {
	data: iPagination<iVendorProduct>;
}) {
	const products = data.data;

	return (
		<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{products.length === 0 ? (
				<div className="col-span-full text-center py-8 text-muted-foreground">
					No items found matching your criteria
				</div>
			) : (
				products?.map((item) => (
					<Card
						key={item.id}
						className="overflow-hidden hover:shadow-lg transition-shadow gap-0 pt-0"
					>
						<CardHeader className="p-0 lg:px-0">
							<Link href={`/product/view/${item.id}`}>
								<div className="relative aspect-square overflow-hidden">
									<Avatar className="h-full w-full rounded-xl">
										<AvatarImage
											src={env.baseAPI + '/' + item.image}
											alt={item.name}
											className="object-cover rounded-xl"
										/>
										<AvatarFallback className="rounded-xl bg-sky-100 text-lg">
											{item.name.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>

									<Badge
										variant="destructive"
										className="absolute top-2 right-2"
									>
										{item.discount_price || '00'} {sign.tk}
									</Badge>
								</div>
							</Link>
						</CardHeader>
						<CardContent className="p-4">
							<div className="space-y-2">
								<Link
									className="hover:underline hover:text-blue-500 transition"
									href={`/product/view/${item.id}`}
								>
									<h3 className="font-semibold text-lg line-clamp-2">
										{textCount(item.name, 30)}
									</h3>
								</Link>
								<div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
									<span>ID: #{item.uniqid}</span>
									<span>•</span>
									<span>{dateFormat(item.created_at)}</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-4">
										<div className="flex items-center gap-3 flex-wrap">
											<div className="flex items-center flex-col gap-1">
												<span className="text-sm">Original Price</span>
												<span className="text-sm font-bold">
													{item.original_price} {sign.tk}
												</span>
											</div>
											<div className="flex items-center flex-col gap-1">
												<span className="text-sm">Selling Price</span>
												<span className="text-sm font-bold">
													{item.selling_price} {sign.tk}
												</span>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<Badge variant="outline" className="text-xs">
												Stock: {item.qty || '00'}
											</Badge>
											<Badge
												className="capitalize text-xs"
												variant={badgeFormat(item.status)}
											>
												{item.status}
											</Badge>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))
			)}
		</div>
	);
}
