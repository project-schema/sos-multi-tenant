import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { TenantCouponPage } from '@/store/features/vendor/tenant-coupon';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Generate Coupons' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<TenantCouponPage />
		</SessionProvider>
	);
}
