import { DbHeader } from '@/components/dashboard';
import { getApiData } from '@/lib';
import { SessionProvider } from '@/provider';
import { iAdminService } from '@/store/features/admin/service';
import { VendorServicePurchaseView } from '@/store/features/vendor/services-purchase/service-view';
import { notFound } from 'next/navigation';

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
	if (!service) {
		return notFound();
	}
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorServicePurchaseView order={service} />
		</SessionProvider>
	);
}
