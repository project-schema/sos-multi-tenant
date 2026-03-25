'use client';

import { imageFormat } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iSettingsType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export const MainWebHero = ({ settings }: { settings: iSettingsType }) => {
	const words = settings.message?.home_banner_heading.split(' ') ?? [];

	return (
		<section className="hero-section  flex items-center relative">
			<div className="absolute top-0 xl:h-[1218px] h-full w-full">
				<img
					className="w-full h-full"
					src="https://i.ibb.co.com/HpnZWWD1/hero.png"
					alt=".."
				/>
			</div>

			<div className="container mx-auto z-10">
				<div className="mx-auto text-center relative max-w-5xl flex-1 flex flex-col items-center md:mb-[95px]">
					<div className="pb-[25px] md:pb-[39px] flex flex-col justify-center items-center ">
						<MotionFadeIn>
							<span className="text-primary font-hind text-center flex items-center gap-[8px] text-[16px] leading-[18px] mb-[22px] section-heading">
								<Image
									alt="group image"
									src={imageFormat(
										settings.message?.f_banner_group_title_image ?? null,
									)}
									width={30}
									height={30}
								/>
								{/* <img
									src="https://i.ibb.co.com/pBvMQhR3/hero-grp-img.png"
									alt="..."
								/> */}
								{settings.message?.newsletter_title}
							</span>
						</MotionFadeIn>

						{words.length > 0 && (
							<MotionFadeIn>
								<h1
									className="text-[44px] 
               xl:text-[72px]
               md:text-[60px] 
               xl:leading-[80px]
               leading-[54px]
               mb-[12px] 
               font-hind 
               first-span
               text-center
               font-bold
               lg:mb-[30px]"
								>
									{words[0]} <span className="text-gradient">{words[1]}</span>{' '}
									{words.slice(2).join(' ')}
								</h1>
							</MotionFadeIn>
						)}

						<MotionFadeIn direction="down">
							{settings.message?.home_banner_description && (
								<p className="max-w-2xl md:mb-[50px] mb-[20px]">
									{settings.message?.home_banner_description}
								</p>
							)}
						</MotionFadeIn>

						<MotionFadeIn>
							<div className=" flex flex-wrap justify-center gap-4 btn--wrap select-none">
								<Link
									href={settings.message?.subscription_heading || '#'}
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
										/>
									</svg>
									{settings.message?.newsletter_description}
								</Link>

								<Link
									href={settings.message?.chose_description || '#'}
									className="
                    select-none 
                    px-[32px] 
                    py-[12px] 
                    text-[18px] 
                    transition 
                    duration-300 
                    bg-white
                    rounded-[90px] 
                    text-secondary 
                    uppercase 
                    font-medium
                    flex 
                    items-center
                    gap-[10px]
                    "
								>
									<svg
										width="16"
										height="21"
										viewBox="0 0 16 21"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M0.396 1.29638C0.423007 1.06932 0.50261 0.851695 0.628482 0.660798C0.754355 0.469901 0.923025 0.311001 1.12108 0.196728C1.31914 0.0824561 1.54113 0.0159634 1.76939 0.00253664C1.99766 -0.0108901 2.22591 0.0291191 2.436 0.119384C3.498 0.573384 5.878 1.65238 8.898 3.39538C11.919 5.13938 14.044 6.66238 14.967 7.35338C15.755 7.94438 15.757 9.11638 14.968 9.70938C14.054 10.3964 11.955 11.8994 8.898 13.6654C5.838 15.4314 3.486 16.4974 2.434 16.9454C1.528 17.3324 0.514 16.7454 0.396 15.7684C0.258 14.6264 0 12.0334 0 8.53138C0 5.03138 0.257 2.43938 0.396 1.29638Z"
											fill="black"
										/>
									</svg>
									{settings.message?.subscription_title}
								</Link>
							</div>
						</MotionFadeIn>
					</div>
				</div>

				<div className="mx-auto flex flex-col items-center relative">
					<div className="xl:w-[70%]">
						<MotionFadeIn direction="up">
							<Image
								alt="group image 1"
								src={imageFormat(settings.message?.f_banner_image_1 ?? null)}
								width={1000}
								height={1000}
								priority
							/>
							{/* <img src="https://i.ibb.co.com/qLGTwtP5/hero-img.png" alt="" /> */}
						</MotionFadeIn>
					</div>

					<div className="absolute hidden xl:flex bottom-[10%] right-[-0px] 2xl:right-[50px] 2xl:w-auto xl:right-[110px] xl:w-[200px]">
						<MotionFadeIn direction="right">
							{/* <img src="https://i.ibb.co.com/24ffkpM/hero-img1.png" alt="" /> */}
							<Image
								alt="group image 2"
								src={imageFormat(settings.message?.f_banner_image_2 ?? null)}
								width={500}
								height={500}
								priority
							/>
						</MotionFadeIn>
					</div>
					<div className="absolute hidden xl:flex top-[35%] left-[0x] 2xl:left-[50px] 2xl:w-auto xl:left-[110px] xl:w-[200px]">
						<MotionFadeIn direction="left">
							<Image
								alt="group image 3"
								src={imageFormat(settings.message?.f_banner_image_3 ?? null)}
								width={500}
								height={500}
								priority
							/>
							{/* <img src="https://i.ibb.co.com/KpMKVwjV/hero-img2.png" alt="" /> */}
						</MotionFadeIn>
					</div>
				</div>
			</div>
		</section>
	);
};
