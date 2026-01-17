import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import VendorWithdrawPage from '@/store/features/vendor/withdraw/vendor-withdraw-page';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Withdraw' },
];
export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorWithdrawPage />
		</SessionProvider>
	);
}
