import Image from 'next/image';
import image from './blue.svg';
import style from './servicesCard.module.css';

function ServicesCard() {
	return (
		<div className={style.wrap}>
			<div className={style.icon}>
				<Image alt="icon" src={image} className={style.ico} />
			</div>
			<h1 className={style.text}>Awesome Results</h1>
			<p className={style.paragraph}>
				We offer a wide range of affiliate programs, including commission-based
				programs, pay-per-click programs, and lead generation programs.{' '}
			</p>
		</div>
	);
}

export default ServicesCard;
