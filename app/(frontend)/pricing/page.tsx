import style from '@/components/essential/AboutPage/ChooseUs/ChooseUs.style.module.css';
import Pricing from '@/components/essential/Pricing';
import { getApiData } from '@/lib';
import { iSubscriptionsType } from '@/types';
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

	if (subscriptions?.status !== 200) {
		return notFound();
	}

	return (
		<div className={style.pricingPageSection}>
			<Suspense fallback={null}>
				<Pricing subscriptions={subscriptions} />
			</Suspense>
		</div>
	);
}
