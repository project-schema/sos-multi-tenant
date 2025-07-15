'use client';
import style from './nav-style.module.css';
import DesktopNav from './desktop-nav/DesktopNav';
import MobileNav from './mobile-nav/MobileNav';
import { menuData } from '@/lib/data/NavMenu';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import BtnLink from '../BtnLink';
import { env, logout } from '@/lib';
import { iSettingsType } from '@/types';
import Image from 'next/image';

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
								loading="eager"
								height={60}
								src={`${env.baseAPI}/${settings.message?.logo}`}
							/>
						)}
					</Link>
					<DesktopNav data={menuData} />

					<div className={style.buttonBox}>
						{session?.user.username ? (
							<div className="flex items-center gap-2">
								<div className="dropdown dropdown-end">
									<div tabIndex={0} className="avatar online placeholder">
										<div className="bg-[#004da3] text-white rounded-full w-16">
											<span className="text-xl capitalize">
												{/* {loading
													? 'load..'
													: profile?.name?.slice(0, 2) || '--'} */}
											</span>
										</div>
									</div>
									<ul
										tabIndex={0}
										className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 gap-3"
									>
										<li className="cursor-default">
											<button
												onClick={() => {
													// PROFILE_PAGE(
													// 	session.user.role,
													// 	profile?.usersubscription,
													// 	router
													// )
												}}
												type="button"
												className="capitalize"
											>
												{session.user.username}
											</button>
										</li>
										<li>
											<button
												type="button"
												onClick={() => {
													// DASHBOARD_PAGE(
													// 	session.user.role,
													// 	profile?.usersubscription,
													// 	router
													// )
												}}
												className="capitalize"
											>
												Dashboard
											</button>
										</li>
										<li>
											<button
												onClick={() => logout()}
												className={`${style.btn} !py-2 !w-full`}
											>
												<span className={style.text}>Log out</span>
											</button>
										</li>
									</ul>
									{/* {!loading && (
										
									)} */}
								</div>
							</div>
						) : (
							<>
								<Link href={'/login'} className={style.login}>
									Login
								</Link>
								<BtnLink text="Register" path="/register" />
							</>
						)}
					</div>

					<div onClick={() => setOpen(!open)} className={style.mobileToggler}>
						{open ? <FaTimes className={style.iconMenu} /> : <div></div>}
						{/* <ICON.menu className={style.iconMenu}></ICON.menu> */}
					</div>
				</div>

				<MobileNav data={menuData} open={open} setOpen={setOpen} />
			</nav>
		</>
	);
}

export default Nav;
