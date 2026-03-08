import { imageFormat } from '@/lib';
import { iSettingsType } from '@/types';
import Link from 'next/link';

export const MainWebCTA = ({ settings }: { settings: iSettingsType }) => {
	return (
		<section
			className={`callout--section bg--img min-h-[1000px]`}
			style={{
				backgroundImage: imageFormat(
					settings?.message?.f_feature_image_6 ?? null,
				),
			}}
		>
			<div className="container mx-auto">
				<div className="flex flex-col justify-between items-center py-[160px]">
					<h6
						className="text-secondary font-semibold md:text-[64px] text-[28px] md:leading-[68px] leading-[32px] mb-[24px] text-center"
						data-aos="fade-up"
						data-aos-duration="400"
					>
						{settings?.message?.chose_us_title}
					</h6>
					<p
						className="text-[18px] leading-[26px] md:mb-[34px] mb-[24px] text-secondary text-center"
						data-aos="fade-up"
						data-aos-duration="500"
					>
						{settings?.message?.chose_us_heading}
					</p>
					<Link
						href={settings?.message?.progres_three_title}
						className="
                  select-none 
                  px-[32px] 
                  py-[12px] 
                  text-[18px] 
                  transition 
                  duration-300 
                  bg-[#050510]
                  rounded-[90px] 
                  text-white 
                  uppercase 
                  font-medium
                  flex 
                  items-center
                  gap-[10px]
                  "
						data-aos="fade-up"
						data-aos-duration="600"
					>
						{settings?.message?.progres_four_title}
						<svg
							width="18"
							height="16"
							viewBox="0 0 18 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 8H17M17 8L10 1M17 8L10 15"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					</Link>
				</div>
			</div>
		</section>
	);
};
