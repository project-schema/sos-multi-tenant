import { BASE_URL } from '@/lib/env';
import style from './footerTop.style.module.css';
import { FormEvent } from 'react';

function FooterTop({ settingsData }: any) {
	const dataF = settingsData?.message;
	// const [loading, setLoading] = useState(false);
	// const submitDataServer = async (e: FormEvent) => {
	// 	e.preventDefault();
	// 	const target = e.target as HTMLFormElement;

	// 	const email = target.elements.namedItem('email') as HTMLInputElement;

	// 	const res = await fetch(BASE_URL + '/api/email-subscribe', {
	// 		method: 'POST',
	// 		headers: {
	// 			'content-type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ email: email.value }),
	// 	});
	// 	const data = await res.json();
	// 	target.reset();
	// 	if (data.message === 'Validation errors' && !data.success) {
	// 		Swal.fire({
	// 			icon: 'error',
	// 			title: 'Error!',
	// 			text: data.data.email[0],
	// 			footer: 'Please Add this ',
	// 		});
	// 	}
	// 	if (
	// 		(data.data = 'success' && data.message === 'Successfully subscribed!')
	// 	) {
	// 		Swal.fire({
	// 			icon: 'success',
	// 			title: 'Great!',
	// 			text: data?.message,
	// 			footer: 'Thanks For Connect',
	// 		});
	// 	}
	// };

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
