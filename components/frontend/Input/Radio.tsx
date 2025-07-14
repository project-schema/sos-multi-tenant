import { useRouter } from 'next/router';
import style from './Radio.module.css';

function Radio({
	txt,
	time,
	setTime,
}: {
	txt: string;
	time: string;
	setTime: Function;
}) {
	const getTxt = (e: string) => {
		return e.replace(/_/g, '-').toUpperCase();
	};

	const { route } = useRouter();

	return (
		<div
			onClick={() => setTime(txt)}
			className={route === '/register' ? style.RadioBoxLogin : style.RadioBox}
		>
			<span className={`${style.radio} ${txt === time && style.active}`}></span>
			<span className={`${style.label} ${txt === time && style.active}`}>
				{getTxt(txt)}
			</span>
		</div>
	);
}

export default Radio;
