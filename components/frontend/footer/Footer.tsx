import style from './style.module.css';
import PayWith from './footer-pay-with';
import { iSettingsType } from '@/types';
import FooterTop from './footer-top';
import FooterCenter from './footer-center';
import FooterCopyRight from './footer-copy-right';
import { getApiData } from '@/lib';
import { notFound } from 'next/navigation';

async function Footer() {
	const settings = await getApiData<iSettingsType>('/settings');

	if (settings?.status !== 200) {
		return notFound();
	}
	return (
		<footer className={style.footer}>
			<div className={`${style.footerWrap} layout`}>
				{/* join news latter  */}
				<FooterTop />

				<hr className={style.hr} />

				{/* links  */}
				<FooterCenter />

				{/* pay icon  */}
				<PayWith />

				<hr className={style.hr} />

				{/* copy right  */}
				<FooterCopyRight settingsData={settings} />
			</div>
		</footer>
	);
}

export default Footer;
