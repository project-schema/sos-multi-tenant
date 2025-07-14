import { IMenu } from '@/types/Ui-Types';
import style from './style.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { DASHBOARD_URL } from '@/lib/env';
import { motion } from 'framer-motion';
import BtnLink from '../../BtnLink';
import { logout } from '@/lib';
import { useRouter } from 'next/navigation';

function MobileNav({
	data,
	open,
	setOpen,
}: {
	data: IMenu[];
	open: boolean;
	setOpen: Function;
}) {
	const router = useRouter();
	const { data: session } = useSession();
	return (
		<motion.div
			initial={{ x: 100, opacity: 0, display: 'none' }}
			animate={{
				x: open ? 0 : 100,
				opacity: open ? 1 : 0,
				display: open ? 'block' : 'none',
				right: 0,
			}}
			transition={{ type: 'spring', stiffness: 260, damping: 20 }}
			className={style.mobileNavbar}
		>
			{/* <span className={style.bgOverlay}></span> */}
			<div className={style.navWrap}>
				{data.map((e) => (
					<Link
						onClick={() => setOpen(false)}
						className={`${style.navItem} ${
							router.pathname === e.path && style.active
						}`}
						href={e.path}
						key={e.id}
					>
						{e.menu}
					</Link>
				))}
				<div className={style.buttonBox}>
					{session?.user.username ? (
						<div className="flex items-center gap-2 flex-col">
							<Link
								onClick={() => setOpen(false)}
								href={DASHBOARD_URL as string}
								replace
								className={`${style.login} badge badge-accent badge-outline`}
							>
								Dashboard
							</Link>

							<p className="text-white">{session.user.username}</p>
							<button
								onClick={() => {
									logout();
									setOpen(false);
								}}
								className={style.btn}
							>
								<span className={style.text}>Log out</span>
							</button>
						</div>
					) : (
						<>
							<Link
								onClick={() => setOpen(false)}
								href={'/login'}
								className={style.login}
							>
								Login
							</Link>
							<div onClick={() => setOpen(false)}>
								<BtnLink text="Register" path="/register" />
							</div>
						</>
					)}
				</div>
			</div>
		</motion.div>
	);
}

export default MobileNav;
