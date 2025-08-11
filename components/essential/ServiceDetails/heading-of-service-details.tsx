import Image from 'next/image';
import ClientMotionWrapper from './ClientMotionWrapper';
import UserImg from './sDetailsUser.png';
import style from './style.module.css';

function HeadingOfSD() {
	// Static mock data
	const staticData = {
		title: 'Professional Web Design Service',
		user: {
			name: 'John Doe',
			image: 'user-image.jpg',
		},
	};

	return (
		<div>
			<ClientMotionWrapper fromY={50} delay={0.2}>
				<h2 className={style.sDetailsHeading}>{staticData.title}</h2>
			</ClientMotionWrapper>

			<ClientMotionWrapper delay={0.25}>
				<div className={style.userDetails}>
					<div>
						{staticData.user.image ? (
							<Image
								className={style.sDetailsUserImg}
								src={UserImg}
								alt="User Image"
							/>
						) : (
							<span>{/* fallback icon */}</span>
						)}
					</div>
					<div>
						<p className={style.userName}>{staticData.user.name}</p>
					</div>
				</div>
			</ClientMotionWrapper>

			<ClientMotionWrapper delay={0.2}>
				<div className={style.userBorder}></div>
			</ClientMotionWrapper>
		</div>
	);
}

export default HeadingOfSD;
