import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorCouponPage } from '@/store/features/vendor/coupon';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Coupons' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorCouponPage />
		</SessionProvider>
	);
}
