'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, env } from '@/lib';
import { iCompleteMerchantProduct } from '@/store/features/admin/merchant-product';
import Image from 'next/image';
import { ProductImages } from './product-images';
import { ProductInfo } from './product-info';
import { ProductTabs } from './product-tab';

export const ProductView = ({
	product,
}: {
	product: iCompleteMerchantProduct;
}) => {
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-5 gap-10">
				<div className="col-span-1 md:col-span-2">
					<ProductImages product={product} />
				</div>
				<div className="col-span-1 md:col-span-2">
					<ProductInfo product={product} />
				</div>
				<div className="col-span-1 md:col-span-4 2xl:col-span-1">
					<Card>
						<CardContent>
							<Card className={cn('gap-0')}>
								<CardHeader>
									<CardTitle className={cn('xl:text-lg')}>
										Merchant Info
									</CardTitle>
								</CardHeader>
								<CardContent className={cn('overflow-hidden')}>
									<div className="text-center">
										<div className="mb-4">
											<Image
												src={
													product.vendor.image
														? `${env.baseAPI}/${product.vendor.image}`
														: '/placeholder.svg'
												}
												alt={product.vendor.name}
												width={100}
												height={100}
												className="mx-auto rounded-xl"
											/>
										</div>
										<h2 className=" mb-2text-lg font-semibold">
											{product.vendor.name}
										</h2>
										<p>{product.vendor.number}</p>
										<p>{product.vendor.email}</p>
									</div>
								</CardContent>
							</Card>
						</CardContent>
					</Card>
				</div>
			</div>
			<ProductTabs product={product} />
		</div>
	);
};
