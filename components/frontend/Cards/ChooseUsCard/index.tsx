import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import style from './ChooseUsCard.module.css';

function ChooseUsCard({
	icon,
	title,
	subtitle,
}: {
	icon: string;
	title: string;
	subtitle: string;
}) {
	return (
		<div className={style.card}>
			<div className={style.icoBox}>
				<DynamicIcon icon={icon} className="size-8" />
			</div>
			<h1 className={style.txt}>{title}</h1>
			<p className={style.subTxt}>{subtitle}</p>
		</div>
	);
}

export default ChooseUsCard;
