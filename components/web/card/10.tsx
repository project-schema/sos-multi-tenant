'use client';

import { cn, imageFormat, sign } from '@/lib';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import Link from 'next/link';

export default function Card10({ data }: { data: iVendorProduct }) {
	return (
		<div className="">
			<Link
				href={`/shop/${data?.slug}`}
				className={cn('mb-3 block relative h-[480px] rounded-md')}
			>
				<img
					src={imageFormat(data?.image)}
					alt="image"
					className="object-cover w-full h-full rounded-md block"
				/>
			</Link>
			<div className="text-center">
				<Link href={`shop/${data.slug}`}>
					<h3 className="fs-20 font-montserrat font-normal text-black mb-2">
						{data?.name}
					</h3>
				</Link>
				<p className="fs-20 font-montserrat font-semibold text-black">
					{data?.selling_price} {sign.tk}
				</p>
			</div>
		</div>
	);
}
