import { getApiData } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iSettingsType, iSubscriptionsType } from '@/types';
import WebPricing from './ctx/web-pricing';
import TitleStart from './icons/title-start';

export const MainWebPricing = async ({
	settings,
}: {
	settings: iSettingsType;
}) => {
	const subscription = await getApiData<iSubscriptionsType>('/subscriptions');

	const words = settings?.message?.partner_heading.split(' ') || [];
	return (
		<section className="pricing--section xl:pb-[130px] md:pb-[100px] pb-[70px] relative">
			<div className="absolute bottom-[15%] left-0">
				<img src="https://i.ibb.co.com/qFy83DTG/plan-shape.png" alt="..." />
			</div>

			<div className="container mx-auto">
				<div className="max-w-full relative">
					<div className="flex flex-col justify-center items-center relative px-[0px] 2xl:px-[0px] md:px-[35px]">
						<div className="flex flex-col justify-center max-w-3xl items-center xl:mb-[60px] mb-[40px]">
							<MotionFadeIn>
								<span className="text-primary font-hind text-center flex items-center gap-[8px] text-[16px] leading-[18px] mb-[22px] section-heading">
									<TitleStart />
									{settings?.message?.partner_title}
								</span>
							</MotionFadeIn>
							<MotionFadeIn direction="down">
								<h2 className="section--title font-hind text-center font-semibold xl:text-[48px] lg:text-[40px] text-[36px] uppercase lg:leading-[64px] leading-[40px] text-secondary section-title">
									{words[0]}
									<span className="text-primary">{words[1]}</span>{' '}
									{words.slice(2).join(' ')}
								</h2>
							</MotionFadeIn>
						</div>
					</div>
					{subscription && <WebPricing subscription={subscription} />}
				</div>
			</div>
		</section>
	);
};
