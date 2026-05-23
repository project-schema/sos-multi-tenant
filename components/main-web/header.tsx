import { imageFormat } from '@/lib';
import { menuData } from '@/lib/data/NavMenu';
import { iSettingsType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderAuthAction } from './ctx/header-auth-action';
import { NavList } from './ctx/nav-list';
import { MainWebOffCanvas } from './off-canvas';

export const MainWebHeader = ({ settings }: { settings: iSettingsType }) => {
	return (
		<header className="header--area fixed top-0 left-0 right-0 bg-[#fff] z-50">
			<div className="container mx-auto">
				<nav className="mx-auto lg:pt-[0px] pt-[14px] lg:pb-[0px] pb-[16px] flex items-center justify-between">
					<Link href="/" className="flex w-auto ">
						<Image
							width={300}
							height={300}
							className="object-contain h-20"
							src={imageFormat(settings.message.logo ?? '/logo-black.png')}
							alt="logo"
						/>
					</Link>

					<ul className="main-menu hidden lg:flex gap-[20px] xl:gap-[40px] items-center">
						{menuData.map((item, index) => (
							<NavList item={item} key={index} />
						))}
					</ul>

					<div className="flex items-center gap-[14px]">
						<MainWebOffCanvas />
						<HeaderAuthAction />
					</div>
				</nav>
			</div>
		</header>
	);
};
