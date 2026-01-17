import { DbHeader } from '@/components/dashboard';
import { getApiData } from '@/lib';
import { SessionProvider } from '@/provider';
import { iAdminService } from '@/store/features/admin/service';
import { VendorServicePurchasePay } from '@/store/features/vendor/services-purchase/service-pay';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
	title: 'Service Payment - SOS',
	description: 'Service Payment - SOS Management',
};
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Services', path: '/services' },
	{ name: 'Purchase' },
];
export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const [service] = await Promise.all([
		getApiData<iAdminService>(`/services-view/${id}`),
	]);
	console.log(service);
	if (!service) {
		return notFound();
	}

	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorServicePurchasePay service={service} />
		</SessionProvider>
	);
}
