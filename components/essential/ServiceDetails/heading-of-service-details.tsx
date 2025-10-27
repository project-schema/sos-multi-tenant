import { imageFormat } from '@/lib';
import Image from 'next/image';
import ClientMotionWrapper from './ClientMotionWrapper';
import UserImg from './sDetailsUser.png';
import style from './style.module.css';

export default function HeadingOfSD({ service }: { service: any }) {
	const userImage = service?.user?.image
		? imageFormat(service.user.image)
		: null;
	return (
		<div>
			<ClientMotionWrapper fromY={50} delay={0.2}>
				<h2 className={style.sDetailsHeading}>{service?.title}</h2>
			</ClientMotionWrapper>

			<ClientMotionWrapper delay={0.25}>
				<div className={style.userDetails}>
					<div>
						{userImage ? (
							<Image
								className={style.sDetailsUserImg}
								src={userImage}
								width={48}
								height={48}
								alt="User Image"
							/>
						) : (
							<Image
								className={style.sDetailsUserImg}
								src={UserImg}
								alt="User Image"
							/>
						)}
					</div>
					<div>
						<p className={style.userName}>{service?.user?.name}</p>
					</div>
				</div>
			</ClientMotionWrapper>

			<ClientMotionWrapper delay={0.2}>
				<div className={style.userBorder}></div>
			</ClientMotionWrapper>
		</div>
	);
}
