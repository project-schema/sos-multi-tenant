import { Metadata } from 'next';
import React from 'react';
import Pricing from '@/components/essential/Pricing';
import { getApiData } from '@/lib';
import { iSubscriptionsType } from '@/types';
import { notFound } from 'next/navigation';
import { DbHeader } from '@/components/dashboard';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Pricing' },
];

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
		<div className="user-db-pricing">
			<DbHeader breadcrumb={breadcrumbItems} />
			<Pricing subscriptions={subscriptions} />
		</div>
	);
}
