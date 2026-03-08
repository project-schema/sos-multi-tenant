import { imageFormat } from '@/lib';
import { menuData } from '@/lib/data/NavMenu';
import { iSettingsType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderAuthAction } from './ctx/header-auth-action';
import { NavList } from './ctx/nav-list';

export const MainWebHeader = ({ settings }: { settings: iSettingsType }) => {
	return (
		<header className="header--area fixed top-0 left-0 right-0 bg-[#fff] z-50">
			<div className="container mx-auto">
				<nav className="mx-auto lg:pt-[0px] pt-[14px] lg:pb-[0px] pb-[16px] flex items-center justify-between">
					<Link href="/" className="">
						<Image
							fill
							className="object-cover max-w-sm"
							src={imageFormat(settings.message.logo ?? null)}
							alt="logo"
						/>
					</Link>

					<ul className="main-menu hidden lg:flex gap-[20px] xl:gap-[40px] items-center">
						{menuData.map((item, index) => (
							<NavList item={item} key={index} />
						))}
					</ul>

					<HeaderAuthAction />

					{/* <div className="btn--wrap lg:hidden flex items-center gap-[14px]">
						<button id="toggleSidebar" aria-label="offcanvas">
							<svg
								className="ham--icon block"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<g clipPath="url(#clip0_7108_5381)">
									<path
										d="M3.75 12H20.25"
										stroke="black"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M3.75 6H20.25"
										stroke="black"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M3.75 18H20.25"
										stroke="black"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
								<defs>
									<clipPath id="clip0_7108_5381">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<svg
								className="close--icon hidden"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18 6L6 18M6 6L18 18"
									stroke="black"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div> */}
				</nav>
			</div>
		</header>
	);
};
