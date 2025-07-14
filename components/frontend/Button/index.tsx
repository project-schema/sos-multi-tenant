import { IButton } from '@/types/Ui-Types';
import style from './button-style.module.css';

function Button({ text, icon }: IButton) {
	return (
		<button className={style.btn}>
			<span>{text}</span>
			<span>{icon}</span>
		</button>
	);
}

export default Button;
