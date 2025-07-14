import Link from 'next/link';
import style from './btn-link.module.css';
import { IButton } from '@/types/Ui-Types';
import Image from 'next/image';

function BtnLink({ text, icon, path }: IButton) {
	return (
		<Link className={style.btn} href={path || '/'}>
			<span className={style.text}>{text}</span>
			{icon && (
				<Image className={style.ico} alt="icon-arrow" src={icon}></Image>
			)}
		</Link>
	);
}

export default BtnLink;
