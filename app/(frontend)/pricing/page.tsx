import { Metadata } from 'next';
import React from 'react';
import style from '@/components/essential/AboutPage/ChooseUs/ChooseUs.style.module.css';
import Pricing from '@/components/essential/Pricing';
import { getApiData } from '@/lib';
import { iSubscriptionsType } from '@/types';
import { notFound } from 'next/navigation';

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
		<>
			<div className={style.pricingPageSection}>
				<Pricing subscriptions={subscriptions} />
			</div>
		</>
	);
}
