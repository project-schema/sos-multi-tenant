import style from './simple-loader.module.css';

export function SimpleLoader() {
	return (
		<div id="loading-bar-spinner" className="spinner">
			<div className="spinner-icon"></div>
		</div>
	);
}
