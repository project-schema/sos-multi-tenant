'use client';

import { cn, env } from '@/lib';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	image?: string;
	title?: string;
	description?: string;
	className?: string;
}
export default function Card10({
	image,
	title,
	description,
	className,
}: Props) {
	return (
		<div className="">
			<Link
				href="/shop/product-details"
				className={cn('mb-3 block relative h-[480px] rounded-md', className)}
			>
				<Image
					src={image || env.placeholderImage}
					alt="image"
					fill
					className="object-cover w-full h-full rounded-md block"
				/>
			</Link>
			<div className="text-center">
				<Link href="/shop/product-details">
					<h3 className="fs-20 font-montserrat font-normal text-black mb-2">
						Bengali Bridal Saree
					</h3>
				</Link>
				<p className="fs-20 font-montserrat font-semibold text-black">1000৳</p>
			</div>
		</div>
	);
}
