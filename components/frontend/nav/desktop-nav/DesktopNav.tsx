import { IMenu } from '@/types/Ui-Types';
import style from './style.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function DesktopNav({ data }: { data: IMenu[] }) {
	const pathName = usePathname();
	const isActive = (path: string) => path === pathName;

	return (
		<div className={style.navWrap}>
			{data.map((e) => (
				<Link
					className={`${style.navItem} ${isActive(e.path) ? style.active : ''}`}
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
