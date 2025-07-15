import { getApiData } from '@/lib';
import style from './footerTop.style.module.css';
import { iSettingsType } from '@/types';
import { notFound } from 'next/navigation';

async function FooterTop() {
	const settings = await getApiData<iSettingsType>('/settings');

	if (settings?.status !== 200) {
		return notFound();
	}
	const dataF = settings?.message;

	return (
		<div className={style.footerTop}>
			<div className={style.joinNews}>
				<div className={style.joinNews__left}>
					<h4 className={style.joinHead}>{dataF?.newsletter_title}</h4>
					<p className={style.subJoinNewsTxt}>
						{dataF?.newsletter_description}
					</p>
				</div>
				<div className={style.joinNews__right}>
					{/* onSubmit={submitDataServer} */}
					<form>
						<div className={style.inputWrap}>
							<input
								className={style.email}
								type="email"
								placeholder="Enter your email"
								name="email"
								id="email_"
							/>
							<button className={style.subBtn} type="submit">
								Subscribe
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default FooterTop;
