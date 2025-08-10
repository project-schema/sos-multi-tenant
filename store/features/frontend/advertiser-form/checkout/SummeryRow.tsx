import style from './summery.module.css';
interface ISummery {
	pp: number | string;
	text: {
		h: string;
		p?: string;
	};
}
function SummeryRow({ pp, text }: ISummery) {
	return (
		<div className={style.summeryRow}>
			<div className={style.left}>
				<h1 className={style.title}>{text?.h}</h1>
				<p className={style.subTitle}>{text?.p}</p>
			</div>
			<div className={style.right}>
				<p className={style.pp}>{pp}</p>
			</div>
		</div>
	);
}

export default SummeryRow;
