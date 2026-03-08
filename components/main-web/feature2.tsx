import { imageFormat } from '@/lib';
import { iOrgTwoType, iSettingsType } from '@/types';
import Image from 'next/image';
import WebAccordion from './ctx/accordion';
import TitleStart from './icons/title-start';

export const MainWebFeature2 = ({
	settings,
	getOrTwoData,
}: {
	settings: iSettingsType;
	getOrTwoData: iOrgTwoType;
}) => {
	return (
		<section className="bg-[url('https://i.ibb.co.com/35GkmNwT/f-bg.png')] featured-section xl:py-[130px] md:py-[100px] py-[70px] bg--img">
			<div className="container mx-auto">
				<div className="max-w-full flex flex-col justify-center items-center relative px-[0px] 2xl:px-[0px] md:px-[35px]">
					<div className="flex flex-col justify-center max-w-3xl items-center xl:mb-[60px] mb-[40px]">
						{settings?.message?.org_title && (
							<span className="text-primary font-hind text-center flex items-center gap-[8px] text-[16px] leading-[18px] mb-[22px] section-heading">
								<TitleStart />
								{settings?.message?.org_title}
							</span>
						)}
						{settings?.message?.org_heading && (
							<h2 className="section--title font-hind text-center font-medium xl:text-[48px] xl:leading-[54px] lg:text-[40px] lg:leading-[44px] text-[36px] uppercase leading-[40px] text-secondary md:mb-[9ppx] mb-[28px] section-title">
								{settings?.message?.org_heading}
							</h2>
						)}
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] md:gap-[18px]">
						<WebAccordion />

						<div className="thumb--wrap">
							<Image
								src={imageFormat(settings?.message?.org_one_photo)}
								alt="image org"
								width={500}
								height={500}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
