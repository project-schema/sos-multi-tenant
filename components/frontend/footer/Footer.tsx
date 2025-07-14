import style from './style.module.css';
import PayWith from './footer-pay-with';

function Footer() {
	return (
		<footer className={style.footer}>
			<div className={`${style.footerWrap} layout`}>
				{/* join news latter  */}
				{/* <FooterTop settingsData={settingsData} /> */}

				<hr className={style.hr} />

				{/* links  */}
				{/* <FooterCenter settingsData={settingsData} /> */}

				{/* pay icon  */}
				<PayWith />

				<hr className={style.hr} />

				{/* copy right  */}
				{/* <FooterCopyRight settingsData={settingsData} /> */}
			</div>
		</footer>
	);
}

export default Footer;
