import { iServicesType, iSettingsType } from '@/types';
import { FeatureCard1 } from './ctx/feature-card-1';
import TitleStart from './icons/title-start';

export const MainWebFeature = ({
	settingsData,
	getServiceData,
}: {
	settingsData: iSettingsType;
	getServiceData: iServicesType;
}) => {
	return (
		<section className="feature-section relative z-1 xl:py-[172px] md:py-[100px] py-[70px] overflow-hidden">
			<div className="bg--shape-one absolute -z-1"></div>
			<div className="bg--shape-two absolute -z-1"></div>
			<div className="container mx-auto">
				<div className="max-w-full mx-auto">
					<div className="flex flex-col max-w-5xl justify-start items-start mb-[52px] md:mb-[40px]">
						{settingsData?.message?.service_one_title && (
							<span
								className="text-primary font-hind text-center flex items-center gap-[8px] text-[16px] leading-[18px] mb-[22px] section-heading"
								data-aos="fade-up"
								data-aos-duration="400"
							>
								<TitleStart />
								{settingsData?.message?.service_one_title}
							</span>
						)}
						{settingsData?.message?.service_one_heading && (
							<h2
								className="section--title font-hind text-start font-medium xl:text-[48px] xl:leading-[54px] lg:text-[40px] lg:leading-[44px] text-[36px] uppercase leading-[40px] text-secondary md:mb-[9ppx] mb-[28px] section-title"
								data-aos="fade-up"
								data-aos-duration="500"
							>
								{settingsData?.message?.service_one_heading}
							</h2>
						)}
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[18px] mb-[24px]">
						{getServiceData?.message?.map((feature) => (
							<FeatureCard1 key={feature.id} {...feature} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
