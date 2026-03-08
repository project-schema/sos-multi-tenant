import { imageFormat } from '@/lib';
import { iSettingsType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import Feature3List from './ctx/feature3-list';
import Feature4List from './ctx/feature4-list';
import { Fb } from './icons/fb';
import { IconEle } from './icons/icon-ele';
import { Ins } from './icons/ins';
import { Ws } from './icons/ws';

export const MainWebFeature3 = ({
	settingsData,
}: {
	settingsData: iSettingsType;
}) => {
	return (
		<section className="all-courses-section bg-white xl:py-[130px] md:py-[100px] py-[70px] relative z-10 overflow-hidden">
			<div className="bg--shape-one absolute -z-1"></div>
			<div className="bg--shape-two absolute -z-1"></div>

			<div className="container mx-auto">
				<div className="max-w-full relative">
					<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px] mb-[60px]">
						<div className="content--wrap">
							<div
								className="inline-flex items-center border border-[#0000001d] rounded-[100px] py-[9px] px-[20px] mb-[20px]"
								data-aos="fade-up"
								data-aos-duration="400"
							>
								<IconEle />
								<p className="font-medium">
									{settingsData?.message?.org_one_title}
								</p>
							</div>

							<h6
								className="xl:text-[48px] md:text-[32px] text-[26px] xl:leading-[64px] md:leading-[38px] leading-[28px] font-bold mb-[15px]"
								data-aos="fade-up"
								data-aos-duration="500"
							>
								{settingsData?.message?.org_one_heading}
							</h6>
							<p
								className="text-[#969696] text-[18px] mb-[30px]"
								data-aos="fade-up"
								data-aos-duration="600"
							>
								{settingsData?.message?.org_one_video_link}
							</p>

							<Feature3List />
						</div>
						<div className="w-full">
							<Image
								width={500}
								height={500}
								className="w-full"
								src={imageFormat(settingsData?.message?.org_photo ?? null)}
								alt="image"
							/>
						</div>
					</div>

					<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px] mb-[60px]">
						<div className="w-full">
							<Image
								width={500}
								height={500}
								className="w-full"
								src={imageFormat(
									settingsData?.message?.f_feature_image_4 ?? null,
								)}
								alt="image"
							/>
						</div>
						<div className="content--wrap">
							<div
								className="inline-flex items-center border border-[#0000001d] rounded-[100px] py-[9px] px-[20px] mb-[20px]"
								data-aos="fade-up"
								data-aos-duration="400"
							>
								<IconEle />

								<p className="font-medium">
									{settingsData?.message?.service_two_title}
								</p>
							</div>

							<h6
								className="xl:text-[48px] md:text-[32px] text-[26px] xl:leading-[64px] md:leading-[38px] leading-[28px] font-bold mb-[15px]"
								data-aos="fade-up"
								data-aos-duration="500"
							>
								{settingsData?.message?.service_two_heading}
							</h6>

							<Feature4List />
						</div>
					</div>

					<div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px]">
						<div className="content--wrap">
							<div
								className="inline-flex items-center border border-[#0000001d] rounded-[100px] py-[9px] px-[20px] mb-[20px]"
								data-aos="fade-up"
								data-aos-duration="400"
							>
								<IconEle />

								<p className="font-medium">
									{settingsData?.message?.one_title}
								</p>
							</div>

							<h6
								className="xl:text-[48px] md:text-[32px] text-[26px] xl:leading-[64px] md:leading-[38px] leading-[28px] font-bold mb-[15px]"
								data-aos="fade-up"
								data-aos-duration="500"
							>
								{settingsData?.message?.count_one}
							</h6>
							<p
								className="text-[#969696] text-[18px] mb-[30px]"
								data-aos="fade-up"
								data-aos-duration="600"
							>
								{settingsData?.message?.count_two}
							</p>

							<div className="" data-aos="fade-up" data-aos-duration="700">
								<Link
									href={settingsData?.message?.count_two_title}
									className="inline-flex items-center border gap-[10px] border-[#0000001d] rounded-[100px] py-[9px] px-[20px] mb-[15px] mr-[15px]"
								>
									<Fb />
									<p className="font-medium">Facebook</p>
								</Link>
								<Link
									href={settingsData?.message?.count_three}
									className="inline-flex items-center border gap-[10px] border-[#0000001d] rounded-[100px] py-[9px] px-[20px] mb-[15px] mr-[15px]"
								>
									<Ins />
									<p className="font-medium">Instagram</p>
								</Link>
								<Link
									href={settingsData?.message?.count_three_title}
									className="inline-flex items-center border gap-[10px] border-[#0000001d] rounded-[100px] py-[9px] px-[20px] mb-[15px] mr-[15px]"
								>
									<Ws />
									<p className="font-medium">WhatsApp</p>
								</Link>
							</div>
						</div>
						<div className="w-full">
							<Image
								width={500}
								height={500}
								className="w-full"
								src={imageFormat(
									settingsData?.message?.f_feature_image_5 ?? null,
								)}
								alt="image"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
