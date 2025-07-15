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
				{/* <IconPickerItem icon={icon} size={30} /> */}
			</div>
			<h1 className={style.txt}>{title}</h1>
			<p className={style.subTxt}>{subtitle}</p>
		</div>
	);
}

export default ChooseUsCard;
