import { getApiData, imageFormat } from '@/lib';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { iFooterMedia, iSettingsType } from '@/types';
import { MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const MainWebFooter = async ({
	settings,
}: {
	settings: iSettingsType;
}) => {
	const mediaLink = await getApiData<iFooterMedia>('/footer-medias');

	return (
		<footer className="footer-section bg-[#86B8FF] pt-[58px] pb-[50px]">
			<div className="container mx-auto">
				<div className="max-w-full bg-[#041438] md:p-[60px] p-[20px] rounded-[48px]">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-[48px] pb-[96px] border-b border-[#313E3E]">
						<div className="flex flex-col gap-[40px]">
							<div className="footer-left md:block flex justify-center items-center">
								<Image
									src={imageFormat(settings?.message?.footer_image ?? null)}
									alt="footer logo"
									width={300}
									height={300}
								/>
							</div>

							<p className="text-white">
								{settings?.message?.footer_description}
							</p>
						</div>

						<div className="footer-menu--wrap flex flex-wrap justify-start gap-[71px] fade-up">
							<div className="footer--menu ">
								<h3 className="text-[24px] leading-[28px] text-white mb-[20px]">
									Services
								</h3>
								<ul className="footer-item--wrap flex flex-col gap-[19px]">
									<li className="footer-item ">
										<Link
											className="text-white text-[14px] tracking-[1.12px] uppercase pb-[2px] relative bg-[linear-gradient(transparent_calc(100%-1px),#fff_5px)]
                    bg-no-repeat 
                    bg-[length:0%_100%] 
                    transition-[background-size] 
                    duration-500 
                    hover:bg-[length:100%_100%]"
											href="/services"
										>
											Services
										</Link>
									</li>
									<li className="footer-item ">
										<Link
											className="text-white text-[14px] tracking-[1.12px] uppercase pb-[2px] relative bg-[linear-gradient(transparent_calc(100%-1px),#fff_5px)]
                    bg-no-repeat 
                    bg-[length:0%_100%] 
                    transition-[background-size] 
                    duration-500 
                    hover:bg-[length:100%_100%]"
											href="/advertise"
										>
											Advertise
										</Link>
									</li>
								</ul>
							</div>

							<div className="footer--menu">
								<h3 className="text-[24px] leading-[28px] text-white mb-[20px]">
									Links
								</h3>
								<ul className="footer-item--wrap flex flex-col gap-[19px]">
									<li className="footer-item ">
										<Link
											className="text-white text-[14px] tracking-[1.12px] uppercase pb-[2px] relative bg-[linear-gradient(transparent_calc(100%-1px),#fff_5px)]
                    bg-no-repeat 
                    bg-[length:0%_100%] 
                    transition-[background-size] 
                    duration-500 
                    hover:bg-[length:100%_100%]"
											href="/about-us"
										>
											About us
										</Link>
									</li>

									<li className="footer-item ">
										<Link
											className="text-white text-[14px] tracking-[1.12px] uppercase pb-[2px] relative bg-[linear-gradient(transparent_calc(100%-1px),#fff_5px)]
                    bg-no-repeat 
                    bg-[length:0%_100%] 
                    transition-[background-size] 
                    duration-500 
                    hover:bg-[length:100%_100%]"
											href="/pricing"
										>
											Pricing
										</Link>
									</li>
									<li className="footer-item ">
										<Link
											className="text-white text-[14px] tracking-[1.12px] uppercase pb-[2px] relative bg-[linear-gradient(transparent_calc(100%-1px),#fff_5px)]
                    bg-no-repeat 
                    bg-[length:0%_100%] 
                    transition-[background-size] 
                    duration-500 
                    hover:bg-[length:100%_100%]"
											href={''}
										>
											Terms & Register
										</Link>
									</li>
									<li className="footer-item ">
										<Link
											className="text-white text-[14px] tracking-[1.12px] uppercase pb-[2px] relative bg-[linear-gradient(transparent_calc(100%-1px),#fff_5px)]
                    bg-no-repeat 
                    bg-[length:0%_100%] 
                    transition-[background-size] 
                    duration-500 
                    hover:bg-[length:100%_100%]"
											href="/contact-us"
										>
											Contact us
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="footer-menu--wrap flex flex-wrap justify-start gap-[71px] fade-up">
							<div className="footer--menu">
								<h3 className="text-[24px] leading-[28px] text-white mb-[20px]">
									Contacts
								</h3>
								<ul className="footer-item--wrap flex flex-col gap-[19px]">
									<li className="footer-item ">
										<a
											href="#"
											className="text-white text-[14px] tracking-[1.12px] uppercase pb-[2px] relative bg-[linear-gradient(transparent_calc(100%-1px),#fff_5px)]
                    bg-no-repeat 
                    bg-[length:0%_100%] 
                    transition-[background-size] 
                    duration-500 
                    hover:bg-[length:100%_100%]
                    flex
                    items-center
                    gap-[20px]
                    "
										>
											<MapPin className="size-6" />
											{settings?.message?.footer_contact_address}
										</a>
									</li>

									<li className="footer-item ">
										<a
											href="#"
											className="text-white text-[14px] tracking-[1.12px] uppercase pb-[2px] relative bg-[linear-gradient(transparent_calc(100%-1px),#fff_5px)]
                    bg-no-repeat 
                    bg-[length:0%_100%] 
                    transition-[background-size] 
                    duration-500 
                    hover:bg-[length:100%_100%]
                      flex
                    items-center
                    gap-[20px]
                    "
										>
											<Phone className="size-6" />

											{settings?.message?.footer_contact_number}
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-[48px] pt-[29px] pb-[43px] border-b border-[#313E3E]">
						<div className="">
							<ul className="flex gap-[18px]">
								{mediaLink?.message?.map((e) => (
									<li key={e.id}>
										<Link href={e.media_link} className=" inline-block">
											<div className="w-full h-full object-cover transition-transform duration-300 ease-linear hover:scale-110">
												<DynamicIcon icon={e.icon_class} />
											</div>
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div>
							<img
								src="https://i.ibb.co.com/k6DbkhfJ/pyment-method.png"
								alt="..."
							/>
						</div>
					</div>

					<div className="copy--right flex flex-wrap justify-between pt-[20px] pb-[29px] md:gap-[20px] gap-[12px]">
						<p className="text-white text-[12px] leading-[18px] ">
							{' '}
							{settings?.message?.copywright_text} | Design & Develop By{' '}
							<Link
								href={settings?.message?.credit_link}
								target="_blank"
								className="hover:text-white text-primary underline underline-offset-[3px]"
							>
								{settings?.message?.credit_name}
							</Link>
							With lot of 🍵 & ❤️
						</p>

						<div className="flex flex-wrap justify-center gap-[12px]">
							<a
								className="hover:text-primary  relative  text-[#969696]"
								href="#"
								target="_blank"
							>
								Privacy Policy
							</a>
							<a
								className="hover:text-primary relative  text-[#969696]"
								href="#"
								target="_blank"
							>
								Terms of Service
							</a>
							<a
								className="hover:text-primary relative  text-[#969696]"
								href="#"
								target="_blank"
							>
								Cookies Settings
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
