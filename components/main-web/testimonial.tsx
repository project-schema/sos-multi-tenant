import { iSettingsType } from '@/types';
import TitleStart from './icons/title-start';

export const MainWebTestimonial = ({
	settings,
}: {
	settings: iSettingsType;
}) => {
	return (
		<section className="texttimonial--section xl:py-[130px] md:py-[100px] py-[70px] relative z-10 overflow-hidden">
			<div className="bg--shape-one absolute -z-1"></div>
			<div className="bg--shape-two absolute -z-1"></div>

			<div className="container mx-auto">
				<div className="max-w-full flex flex-col justify-center items-center relative px-[0px] 2xl:px-[0px] md:px-[35px]">
					<div className="flex flex-col justify-center max-w-3xl items-center xl:mb-[60px] mb-[40px]">
						<span
							className="text-primary font-hind text-center flex items-center gap-[8px] text-[16px] leading-[18px] mb-[22px] section-heading"
							data-aos="fade-up"
							data-aos-duration="400"
						>
							<TitleStart />
							{settings?.message?.partner_title}
						</span>
						<h2
							className="section--title font-hind text-center font-semibold xl:text-[48px] lg:text-[40px] text-[36px] uppercase lg:leading-[64px] leading-[40px] text-secondary section-title"
							data-aos="fade-up"
							data-aos-duration="500"
						>
							{settings?.message?.partner_heading}
						</h2>
					</div>
				</div>
			</div>

			<div className="marque---wrap">
				<div className="marque--slider left-marq xl:mb-[30px]">
					<div className="marquee--item two testimonial--card xl:p-[60px] p-[30px] border border-[#0000001d] rounded-[12px] xl:max-w-[615px] max-w-[450px] bg-white">
						<div className="content--wrap flex flex-col gap-[30px]">
							<ul className="star--wrap flex items-center gap-[8px]">
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
							</ul>

							<p className="text-black">
								“Milestone{' '}
								<span className="text-[#969696]">
									helps me keep a clean, organized ledger that I can access
									anywhere.
								</span>{' '}
								The UI is so intuitive that anyone can use it, without any
								knowledge on the system. I also love the financial reports!
							</p>

							<div className="flex justify-between items-center">
								<div>
									<h6 className="font-bold text-[15px]">Wade Warren</h6>
									<p>Founder & CEO, Thunder</p>
								</div>
								<div>
									<img
										src="https://i.ibb.co.com/0VFdYpXM/t-thumb.png"
										alt="..."
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="marquee--item two testimonial--card xl:p-[60px] p-[30px] border border-[#0000001d] rounded-[12px] xl:max-w-[615px] max-w-[450px] bg-white">
						<div className="content--wrap flex flex-col gap-[30px]">
							<ul className="star--wrap flex items-center gap-[8px]">
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
							</ul>

							<p className="text-black">
								“Milestone{' '}
								<span className="text-[#969696]">
									helps me keep a clean, organized ledger that I can access
									anywhere.
								</span>{' '}
								The UI is so intuitive that anyone can use it, without any
								knowledge on the system. I also love the financial reports!
							</p>

							<div className="flex justify-between items-center">
								<div>
									<h6 className="font-bold text-[15px]">Wade Warren</h6>
									<p>Founder & CEO, Thunder</p>
								</div>
								<div>
									<img
										src="https://i.ibb.co.com/0VFdYpXM/t-thumb.png"
										alt="..."
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="marquee--item two testimonial--card xl:p-[60px] p-[30px] border border-[#0000001d] rounded-[12px] xl:max-w-[615px] max-w-[450px] bg-white">
						<div className="content--wrap flex flex-col gap-[30px]">
							<ul className="star--wrap flex items-center gap-[8px]">
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
							</ul>

							<p className="text-black">
								“Milestone{' '}
								<span className="text-[#969696]">
									helps me keep a clean, organized ledger that I can access
									anywhere.
								</span>{' '}
								The UI is so intuitive that anyone can use it, without any
								knowledge on the system. I also love the financial reports!
							</p>

							<div className="flex justify-between items-center">
								<div>
									<h6 className="font-bold text-[15px]">Wade Warren</h6>
									<p>Founder & CEO, Thunder</p>
								</div>
								<div>
									<img
										src="https://i.ibb.co.com/0VFdYpXM/t-thumb.png"
										alt="..."
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="marquee--item two testimonial--card xl:p-[60px] p-[30px] border border-[#0000001d] rounded-[12px] xl:max-w-[615px] max-w-[450px] bg-white">
						<div className="content--wrap flex flex-col gap-[30px]">
							<ul className="star--wrap flex items-center gap-[8px]">
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
							</ul>

							<p className="text-black">
								“Milestone{' '}
								<span className="text-[#969696]">
									helps me keep a clean, organized ledger that I can access
									anywhere.
								</span>{' '}
								The UI is so intuitive that anyone can use it, without any
								knowledge on the system. I also love the financial reports!
							</p>

							<div className="flex justify-between items-center">
								<div>
									<h6 className="font-bold text-[15px]">Wade Warren</h6>
									<p>Founder & CEO, Thunder</p>
								</div>
								<div>
									<img
										src="https://i.ibb.co.com/0VFdYpXM/t-thumb.png"
										alt="..."
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="marque--slider right-marq">
					<div className="marquee--item testimonial--card  xl:p-[60px] p-[30px] border border-[#0000001d] rounded-[12px] xl:max-w-[615px] max-w-[450px] bg-white">
						<div className="content--wrap flex flex-col gap-[30px]">
							<ul className="star--wrap flex items-center gap-[8px]">
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
							</ul>

							<p className="text-black">
								“Milestone{' '}
								<span className="text-[#969696]">
									helps me keep a clean, organized ledger that I can access
									anywhere.
								</span>{' '}
								The UI is so intuitive that anyone can use it, without any
								knowledge on the system. I also love the financial reports!
							</p>

							<div className="flex justify-between items-center">
								<div>
									<h6 className="font-bold text-[15px]">Wade Warren</h6>
									<p>Founder & CEO, Thunder</p>
								</div>
								<div>
									<img
										src="https://i.ibb.co.com/0VFdYpXM/t-thumb.png"
										alt="..."
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="marquee--item testimonial--card  xl:p-[60px] p-[30px] border border-[#0000001d] rounded-[12px] xl:max-w-[615px] max-w-[450px] bg-white">
						<div className="content--wrap flex flex-col gap-[30px]">
							<ul className="star--wrap flex items-center gap-[8px]">
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
							</ul>

							<p className="text-black">
								“Milestone{' '}
								<span className="text-[#969696]">
									helps me keep a clean, organized ledger that I can access
									anywhere.
								</span>{' '}
								The UI is so intuitive that anyone can use it, without any
								knowledge on the system. I also love the financial reports!
							</p>

							<div className="flex justify-between items-center">
								<div>
									<h6 className="font-bold text-[15px]">Wade Warren</h6>
									<p>Founder & CEO, Thunder</p>
								</div>
								<div>
									<img
										src="https://i.ibb.co.com/0VFdYpXM/t-thumb.png"
										alt="..."
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="marquee--item testimonial--card  xl:p-[60px] p-[30px] border border-[#0000001d] rounded-[12px] xl:max-w-[615px] max-w-[450px] bg-white">
						<div className="content--wrap flex flex-col gap-[30px]">
							<ul className="star--wrap flex items-center gap-[8px]">
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
							</ul>

							<p className="text-black">
								“Milestone{' '}
								<span className="text-[#969696]">
									helps me keep a clean, organized ledger that I can access
									anywhere.
								</span>{' '}
								The UI is so intuitive that anyone can use it, without any
								knowledge on the system. I also love the financial reports!
							</p>

							<div className="flex justify-between items-center">
								<div>
									<h6 className="font-bold text-[15px]">Wade Warren</h6>
									<p>Founder & CEO, Thunder</p>
								</div>
								<div>
									<img
										src="https://i.ibb.co.com/0VFdYpXM/t-thumb.png"
										alt="..."
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="marquee--item testimonial--card  xl:p-[60px] p-[30px] border border-[#0000001d] rounded-[12px] xl:max-w-[615px] max-w-[450px] bg-white">
						<div className="content--wrap flex flex-col gap-[30px]">
							<ul className="star--wrap flex items-center gap-[8px]">
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
							</ul>

							<p className="text-black">
								“Milestone{' '}
								<span className="text-[#969696]">
									helps me keep a clean, organized ledger that I can access
									anywhere.
								</span>{' '}
								The UI is so intuitive that anyone can use it, without any
								knowledge on the system. I also love the financial reports!
							</p>

							<div className="flex justify-between items-center">
								<div>
									<h6 className="font-bold text-[15px]">Wade Warren</h6>
									<p>Founder & CEO, Thunder</p>
								</div>
								<div>
									<img
										src="https://i.ibb.co.com/0VFdYpXM/t-thumb.png"
										alt="..."
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="marquee--item testimonial--card  xl:p-[60px] p-[30px] border border-[#0000001d] rounded-[12px] xl:max-w-[615px] max-w-[450px] bg-white">
						<div className="content--wrap flex flex-col gap-[30px]">
							<ul className="star--wrap flex items-center gap-[8px]">
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
								<li>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_1_1790)">
											<g clipPath="url(#clip1_1_1790)">
												<path
													d="M9.99912 15.217L4.12161 18.507L5.43411 11.9003L0.488281 7.32699L7.17744 6.53366L9.99912 0.416992L12.8208 6.53366L19.5099 7.32699L14.5641 11.9003L15.8766 18.507L9.99912 15.217Z"
													fill="#FF9345"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
											<clipPath id="clip1_1_1790">
												<rect width="20" height="20" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</li>
							</ul>
							<p className="text-black">
								“Milestone{' '}
								<span className="text-[#969696]">
									helps me keep a clean, organized ledger that I can access
									anywhere.
								</span>{' '}
								The UI is so intuitive that anyone can use it, without any
								knowledge on the system. I also love the financial reports!
							</p>
							<div className="flex justify-between items-center">
								<div>
									<h6 className="font-bold text-[15px]">Wade Warren</h6>
									<p>Founder & CEO, Thunder</p>
								</div>
								<div>
									<img
										src="https://i.ibb.co.com/0VFdYpXM/t-thumb.png"
										alt="..."
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
