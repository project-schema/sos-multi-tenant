import { DbHeader } from '@/components/dashboard';
import Pricing from '@/components/essential/Pricing';
import { getApiData } from '@/lib';
import { SwitchPage } from '@/store/features/user/switch';
import { iSubscriptionsType } from '@/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Pricing' },
];

export default async function Page() {
	const subscriptions = await getApiData<iSubscriptionsType>('/subscriptions');

	if (subscriptions?.status !== 200) {
		return notFound();
	}

	return (
		<div className="user-db-pricing">
			<DbHeader breadcrumb={breadcrumbItems} />

			<Suspense fallback={null}>
				<SwitchPage />
			</Suspense>

			<Pricing subscriptions={subscriptions} />
		</div>
	);
}
