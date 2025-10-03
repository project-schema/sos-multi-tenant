import { DbHeader } from '@/components/dashboard';
import VendorWithdrawPage from '@/store/features/vendor/withdraw/vendor-withdraw-page';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Withdraw' },
];
export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorWithdrawPage />
		</>
	);
}
