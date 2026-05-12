import { DbHeader } from '@/components/dashboard';
import { getApiData } from '@/lib';
import { SessionProvider } from '@/provider';
import { TenantServicePurchaseView } from '@/store/features/service/tenant-purchase/services-purchase-view';
import { iService } from '@/store/features/service/type';
import { notFound } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Services', path: '/dashboard/expertise' },
	{ name: 'Purchase' },
];

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const [service] = await Promise.all([
		getApiData<iService>(`/services-view/${id}`),
	]);
	if (!service) {
		return notFound();
	}
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<TenantServicePurchaseView service={service} />
		</SessionProvider>
	);
}
