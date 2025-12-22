'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { env, logout } from '@/lib';
import { menuData } from '@/lib/data/NavMenu';
import { iSettingsType } from '@/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import BtnLink from '../BtnLink';
import DesktopNav from './desktop-nav/DesktopNav';
import MobileNav from './mobile-nav/MobileNav';
import style from './nav-style.module.css';

function Nav({ settings }: { settings: iSettingsType }) {
	const [open, setOpen] = useState(false);
	const { data: session } = useSession();

	return (
		<>
			<nav className={style.nav}>
				<div className={style.navWrap}>
					<Link href="/">
						{settings.message?.logo && (
							<Image
								className={style.logo}
								alt="logo"
								width={202}
								unoptimized
								loading="eager"
								height={60}
								src={`${env.baseAPI}/${settings.message?.logo}`}
							/>
						)}
					</Link>
					<DesktopNav data={menuData} />

					<div className={style.buttonBox}>
						{session?.user.name ? (
							<div className="flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<button
											type="button"
											className="avatar online placeholder focus:outline-none"
										>
											<div className="bg-[#004da3] text-white rounded-full w-16 h-16 flex items-center justify-center">
												<span className="text-xl capitalize">
													{session.user.name?.slice(0, 2) || '--'}
												</span>
											</div>
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="w-52">
										<DropdownMenuLabel className="capitalize">
											{session.user.name}
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											className="capitalize mb-1"
											onClick={() => {
												// PROFILE_PAGE(session.user.role, profile?.usersubscription, router);
											}}
										>
											Profile
										</DropdownMenuItem>
										<DropdownMenuItem
											className="capitalize mb-1"
											onClick={() => {
												// DASHBOARD_PAGE(session.user.role, profile?.usersubscription, router);
											}}
										>
											Dashboard
										</DropdownMenuItem>
										<DropdownMenuItem
											className={`${style.btn} !py-1 !w-full`}
											onClick={() => logout()}
										>
											<span className={style.text}>Log out</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						) : (
							<>
								<Link href={'/auth?tab=login'} className={style.login}>
									Login
								</Link>
								<BtnLink text="Register" path="/auth?tab=register" />
							</>
						)}
					</div>

					<div onClick={() => setOpen(!open)} className={style.mobileToggler}>
						{/* {open ? <FaTimes className={style.iconMenu} /> : <div></div>} */}
						{/* <ICON.menu className={style.iconMenu}></ICON.menu> */}
					</div>
				</div>

				<MobileNav data={menuData} open={open} setOpen={setOpen} />
			</nav>
		</>
	);
}

export default Nav;
