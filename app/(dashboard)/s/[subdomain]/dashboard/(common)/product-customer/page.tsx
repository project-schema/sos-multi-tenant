import { DbHeader } from '@/components/dashboard';
import { getApiData } from '@/lib';
import { SessionProvider } from '@/provider';
import { VendorRegisterCustomerPage } from '@/store/features/vendor/product-customer';
import { iSubscriptionsType } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Register Customers' },
];

export const metadata: Metadata = {
	title: 'Customers - SOS',
	description: 'Customers - SOS Management',
};
export default async function Page() {
	const subscriptions = await getApiData<iSubscriptionsType>('/subscriptions');

	if (subscriptions?.status !== 200) {
		return notFound();
	}
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorRegisterCustomerPage />
		</SessionProvider>
	);
}
