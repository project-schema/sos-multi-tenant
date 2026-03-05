'use client';
import { imageFormat } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Banner05({ cms }: { cms?: iTenantFrontend | null }) {
	return (
		<Swiper
			pagination={{
				clickable: true,
			}}
			modules={[Pagination]}
			className="mySwiper"
			loop
		>
			{cms?.banners?.map((banner, index) => (
				<SwiperSlide key={index}>
					<Image
						src={imageFormat(banner?.image ?? null)}
						alt="banner"
						width={1000}
						height={1000}
						priority
						className="h-[300px] xl:h-[535px] w-full object-cover rounded-md"
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
