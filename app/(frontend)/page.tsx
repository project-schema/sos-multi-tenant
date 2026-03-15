// import Pricing from '@/components/essential/Pricing';
import { MainWebCTA } from '@/components/main-web/cta';
import { MainWebFeature } from '@/components/main-web/feature';
import { MainWebFeature2 } from '@/components/main-web/feature2';
import { MainWebFeature3 } from '@/components/main-web/feature3';
import { MainWebHero } from '@/components/main-web/hero';
import { MainWebPricing } from '@/components/main-web/pricing';
import { MainWebSupport } from '@/components/main-web/support';
import { MainWebTestimonial } from '@/components/main-web/testimonial';
import { getApiData } from '@/lib';
import { SmoothScrollPage } from '@/lib/smooth-scroll';
import {
	iItServicesType,
	iOrgOneType,
	iOrgTwoType,
	iPartnersType,
	iServicesType,
	iSettingsType,
	iSubscriptionsType,
} from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic'; // 👈 REQUIRED

export const metadata: Metadata = {
	title: 'SOS | Home',
	description: 'SOS Management',
};

export default async function HomePage() {
	let settings: iSettingsType | null = null;
	let services: iServicesType | null = null;
	let orgOne: iOrgOneType | null = null;
	let orgTwo: iOrgTwoType | null = null;
	let itService: iItServicesType | null = null;
	let partners: iPartnersType | null = null;
	let subscriptions: iSubscriptionsType | null = null;

	try {
		[settings, services, orgOne, orgTwo, itService, partners, subscriptions] =
			await Promise.all([
				getApiData<iSettingsType>('/settings'),
				getApiData<iServicesType>('/services'),
				getApiData<iOrgOneType>('/org-one'),
				getApiData<iOrgTwoType>('/org-two'),
				getApiData<iItServicesType>('/it-services'),
				getApiData<iPartnersType>('/partners'),
				getApiData<iSubscriptionsType>('/subscriptions'),
			]);
	} catch (error) {
		console.error('Error loading homepage data:', error);
	}

	if (!settings || settings?.status !== 200) {
		return notFound();
	}

	return (
		<SmoothScrollPage>
			{/* <!-- hero section --> */}
			<MainWebHero settings={settings} />
			{/* <!-- /hero section --> */}

			{/* <!-- feature section --> */}
			{services && services?.message.length > 0 && (
				<MainWebFeature settingsData={settings} />
			)}
			{/* <!-- /feature section --> */}

			{/* <!-- main featured section --> */}
			{orgTwo?.status === 200 && <MainWebFeature2 settings={settings} />}
			{/* <!-- /main featured  section--> */}

			{/* <!-- featured section--> */}
			<MainWebFeature3 settingsData={settings} />
			{/* <!-- /featured section--> */}

			{/* <!-- support section --> */}
			<MainWebSupport settingsData={settings} />
			{/* <!-- /support section --> */}

			{/* <!-- testimonial section --> */}
			<MainWebTestimonial settings={settings} />
			{/* <!-- /testimonial section --> */}

			{/* <!-- pricing section --> */}
			<MainWebPricing settings={settings} />
			{/* <!-- /pricing section --> */}

			{/* <!-- cta section --> */}
			<MainWebCTA settings={settings} />
			{/* <!-- /callout section --> */}

			{/* {subscriptions?.status === 200 && (
				<div className="pt-20">
					<Suspense fallback={null}>
						<Pricing subscriptions={subscriptions} />
					</Suspense>
				</div>
			)} */}
		</SmoothScrollPage>
	);
}
