import { IProgressBarUI } from '@/types/Ui-Types';
import style from './progressbar.module.css';
// import { BsCheckLg } from 'react-icons/bs';
function Progressbar({ value, text, line, init }: IProgressBarUI) {
	return (
		<div className={`${style.item} ${init && style.init}`}>
			<span className={style.num}>{value}</span>
			<span className={style.title}>{text}</span>
			{line && <span className={style.line}></span>}
		</div>
	);
}

export default Progressbar;
