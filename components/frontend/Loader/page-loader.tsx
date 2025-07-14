import style from './page-loader.module.css';

export function PageLoader() {
	return (
		<div className={style.container}>
			<div className={style.ring}></div>
			<div className={style.ring}></div>
			<div className={style.ring}></div>
			<p>Loading...</p>
		</div>
	);
}
