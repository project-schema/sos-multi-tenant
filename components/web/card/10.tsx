import { cn, imageFormat, sign } from '@/lib';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import Image from 'next/image';
import Link from 'next/link';

export default function Card10({ data }: { data: iVendorProduct }) {
	return (
		<div className="w-full">
			<Link
				href={`/shop/${data?.slug}`}
				className={cn(
					'mb-3 block relative w-full overflow-hidden rounded-md aspect-[3/4]',
				)}
			>
				<Image
					fill
					src={imageFormat(data?.image)}
					alt={data?.name || 'product image'}
					className="object-cover rounded-md hover:scale-105 transition-transform duration-300"
					sizes="(max-width: 640px) 100vw,
						   (max-width: 1024px) 50vw,
						   (max-width: 1280px) 33vw,
						   25vw"
				/>
			</Link>

			<div className="text-center px-2">
				<Link href={`/shop/${data.slug}`}>
					<h3 className="text-base sm:text-lg lg:text-xl font-montserrat font-normal text-black mb-2 line-clamp-2">
						{data?.name}
					</h3>
				</Link>

				<p className="text-base sm:text-lg lg:text-xl font-montserrat font-semibold text-primary3">
					{data?.discount_price || data?.selling_price} {sign.tk}
				</p>
			</div>
		</div>
	);
}
