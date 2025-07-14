import { IMenu } from '@/types/Ui-Types';
import style from './style.module.css';
import Link from 'next/link';

function DesktopNav({ data }: { data: IMenu[] }) {
	return (
		<div className={style.navWrap}>
			{data.map((e) => (
				<Link
					// className={`${style.navItem} ${
					// 	(router.pathname === e.path ||
					// 		e.subRoute.includes(router.pathname)) &&
					// 	style.active
					// }`}
					href={e.path}
					key={e.id}
				>
					{e.menu}
				</Link>
			))}
		</div>
	);
}

export default DesktopNav;
