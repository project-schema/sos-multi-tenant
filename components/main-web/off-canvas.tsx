export const MainWebOffCanvas = () => {
	return (
		<div
			id="sidebar"
			className="fixed top-[92px] left-[-100%] px-[10px] pb-30 z-999 w-[100%] overflow-y-scroll h-full bg-secondary shadow-lg transition-all duration-300"
		>
			<nav className="pt-[44px] pb-[30px]  flex flex-col space-y-3">
				<ul className="flex flex-col">
					<li className="pb-[15px] border-b flex justify-between items-center border-b-[#313E3E] group">
						<a
							href="#"
							className="hover:text-primary text-[26px] text-white leading-[36px]"
						>
							Home
						</a>
					</li>

					<li className="py-[15px] border-b flex justify-between items-center border-b-[#313E3E] group">
						<a
							href="#"
							className="hover:text-primary text-[26px] text-white leading-[36px]"
						>
							About Us
						</a>
					</li>

					<li className="py-[15px] flex justify-between items-center ">
						<div className="outer w-full">
							<ul id="ul" className="tree-view">
								<li className=" ">
									<div className="caret caret-down flex justify-between items-center pb-[15px] border-b border-b-[#313E3E]">
										<a
											href="#"
											className="hover:text-primary text-[26px] text-white leading-[36px]"
										>
											Services
										</a>
										<div className="icon transition-transform duration-300">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="12"
												height="7"
												viewBox="0 0 12 7"
												fill="none"
											>
												<path
													d="M11 1.14453L6 6.14453L1 1.14453"
													stroke="#fff"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
									</div>
									<ul className="nested tree-view flex-col ps-[30px] ">
										<li className="">
											<div className="caret flex justify-between items-center pt-[16px] pb-[16px] border-b border-[#313E3E]">
												<a
													href="#"
													className="text-white text-[22px] leading-[30px]"
												>
													Who We Are
												</a>
											</div>
										</li>
										<li className="">
											<div className="caret flex justify-between items-center pt-[16px] pb-[16px] border-b border-[#313E3E]">
												<a
													href="#"
													className="text-white text-[22px] leading-[30px]"
												>
													Our Team
												</a>
											</div>
										</li>
										<li className="">
											<div className="caret flex justify-between items-center pt-[16px] pb-[16px] border-b border-[#313E3E]">
												<a
													href="#"
													className="text-white text-[22px] leading-[30px]"
												>
													Our Shalas
												</a>
											</div>
										</li>
										<li className="">
											<div className="caret flex justify-between items-center pt-[16px] pb-[16px] border-b border-[#313E3E]">
												<a
													href="#"
													className="text-white text-[22px] leading-[30px]"
												>
													Testimonials
												</a>
											</div>
										</li>
										<li className="">
											<div className="caret flex justify-between items-center pt-[16px] pb-[16px] border-b border-[#313E3E]">
												<a
													href="#"
													className="text-white text-[22px] leading-[30px]"
												>
													Gallery
												</a>
											</div>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</li>

					<li className="pb-[15px] border-b border-b-[#313E3E]">
						<a
							href="#"
							className="hover:text-primary text-[26px] text-white leading-[36px]"
						>
							Advertise
						</a>
					</li>

					<li className="py-[15px] border-b border-b-[#313E3E]">
						<a
							href="#"
							className="hover:text-primary text-[26px] text-white leading-[36px]"
						>
							Pricing
						</a>
					</li>

					<li className="py-[15px] border-b border-b-[#313E3E]">
						<a
							href="#"
							className="hover:text-primary text-[26px] text-white leading-[36px] "
						>
							Contact Us
						</a>
					</li>
				</ul>
			</nav>
			<a
				href="#"
				className="btn--gradient inline-block w-full px-[30px] py-[14px] text-center  text-white tracking-[1.28px] transition-transform duration-300 rounded-[100px]"
			>
				Book Now
			</a>
		</div>
	);
};
