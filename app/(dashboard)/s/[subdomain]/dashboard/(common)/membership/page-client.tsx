import { DbHeader } from '@/components/dashboard';
import Pricing from '@/components/essential/Pricing';
import { getApiData } from '@/lib';
import { SessionProvider } from '@/provider';
import { iSubscriptionsType } from '@/types';
import { notFound } from 'next/navigation';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Membership' },
];

export default async function Page() {
	const subscriptions = await getApiData<iSubscriptionsType>('/subscriptions');

	if (subscriptions?.status !== 200) {
		return notFound();
	}
	return (
		<SessionProvider>
			<div className="user-db-pricing">
				<DbHeader breadcrumb={breadcrumbItems} />
				<Pricing subscriptions={subscriptions} />
			</div>
		</SessionProvider>
	);
}
