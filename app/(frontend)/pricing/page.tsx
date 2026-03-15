import { MainWebPricing } from '@/components/main-web/pricing';
import { getApiData } from '@/lib';
import { SmoothScrollPage } from '@/lib/smooth-scroll';
import { iSettingsType, iSubscriptionsType } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Pricing - SOS',
	description: 'Pricing - SOS Management',
};

export default async function Page() {
	const subscriptions = await getApiData<iSubscriptionsType>('/subscriptions');
	const settings = await getApiData<iSettingsType>('/settings');

	if (subscriptions?.status !== 200) {
		return notFound();
	}

	return (
		<SmoothScrollPage>
			<div className="xl:pt-[130px] md:pt-[100px] pt-[70px]">
				<Suspense fallback={null}>
					{settings && <MainWebPricing settings={settings} />}
				</Suspense>
			</div>
		</SmoothScrollPage>
	);
}
