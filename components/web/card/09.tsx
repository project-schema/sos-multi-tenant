import { imageFormat } from '@/lib';
import { iVendorCategory } from '@/store/features';
import Image from 'next/image';

export default function Card09({ data }: { data: iVendorCategory }) {
	return (
		<div className="flex flex-col lg:flex-row items-center  gap-4 sm:gap-6 overflow-hidden">
			<div className="w-24 h-24 sm:w-32 sm:h-32 md:w-[150px] md:h-[150px] rounded-full relative shrink-0 overflow-hidden">
				<Image
					width={500}
					height={500}
					src={imageFormat(data?.image)}
					alt={data?.name}
					className="w-full h-full object-cover object-center rounded-full bg-gray-200 hover:scale-105 transition-transform duration-300"
				/>
			</div>

			<div className="text-center lg:text-left">
				<h3 className="text-base lg:text-xl 2xl:text-2xl text-primary3 mb-2 sm:mb-3 font-medium font-montserrat line-clamp-2">
					{data?.name}
				</h3>

				{data?.description && (
					<p className="text-xs sm:text-sm lg:text-base text-gray-500 max-w-xl line-clamp-2">
						{data?.description}
					</p>
				)}
			</div>
		</div>
	);
}
