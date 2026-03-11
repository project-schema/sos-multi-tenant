import { imageFormat } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iSettingsType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export const MainWebSupport = ({
	settingsData,
}: {
	settingsData: iSettingsType;
}) => {
	return (
		<section className="bg-[url('https://i.ibb.co.com/zhMNGbyk/cta-bg.png')] cta-section xl:py-[130px] md:py-[100px] py-[70px] bg-[#050510]  z-[1] bg--img">
			<div className="relative z-[1]">
				<div className="container mx-auto">
					<div className="flex justify-between items-center lg:py-[160px]">
						<div className="w-[100%] lg:w-[50%] me-auto">
							<MotionFadeIn>
								<h6 className="text-white font-bold md:text-[48px] text-[36px] md:leading-[64px] leading-[38px] mb-[16px]">
									{settingsData?.message?.count_four_title}
								</h6>
							</MotionFadeIn>
							<MotionFadeIn direction="down">
								<p className="text-[18px] leading-[26px] md:mb-[34px] mb-[58px] text-white">
									{settingsData?.message?.count_four}
								</p>
							</MotionFadeIn>

							<MotionFadeIn>
								<div className=" flex flex-wrap xl:justify-start justify-center gap-4 btn--wrap select-none">
									<Link
										href={settingsData?.message?.progres_two_value}
										className="
                    select-none 
                    px-[32px] 
                    py-[12px] 
                    text-[18px] 
                    transition 
                    duration-300 
                    btn--gradient 
                    rounded-[90px] 
                    text-white 
                    uppercase 
                    font-medium
                    flex 
                    items-center
                    gap-[10px]
                    "
									>
										{settingsData?.message?.progress_value}
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

									<Link
										href={settingsData?.message?.progres_three_value}
										className="
                    select-none 
                    px-[32px] 
                    py-[12px] 
                    text-[18px] 
                    transition 
                    duration-300 
                    bg-[#050510]
                    rounded-[90px] 
                    border
                    border-[#fff]
                    text-white 
                    uppercase 
                    font-medium
                    flex 
                    items-center
                    gap-[10px]
                    "
									>
										{settingsData?.message?.progres_three_value}
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
							</MotionFadeIn>
						</div>
					</div>
				</div>

				<div
					className="cta-thumb--wrap 
              parallax 
              static 
              overflow-hidden 
              lg:absolute 
              right-0 
              top-[50%] 
              transform
              translate-y-[-50%]
              mb-[31px] 
              lg:mb-[0px] 
              -z-[1] 
              w-[100%] 
              lg:w-[calc(50%-35px)] 
              px-[11px] 
              lg:px-[0px]
              hidden
              lg:flex
              justify-end
              "
				>
					<MotionFadeIn>
						<Image
							width={500}
							height={500}
							className="w-full"
							src={imageFormat(
								settingsData?.message?.f_feature_image_6 ?? null,
							)}
							alt="image"
						/>
					</MotionFadeIn>
				</div>
			</div>
		</section>
	);
};
