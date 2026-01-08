import { DbHeader } from '@/components/dashboard';
import { TenantCouponPage } from '@/store/features/vendor/tenant-coupon';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Generate Coupons' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<TenantCouponPage />
		</>
	);
}
