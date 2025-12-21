import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import CartViewPageClient from './page.client';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Cart' },
];

export default async function Page({
	params,
}: {
	params: Promise<{ tenant_id: string; id: string }>;
}) {
	const { tenant_id, id } = await params;
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<CartViewPageClient cartId={id} />
		</SessionProvider>
	);
}
