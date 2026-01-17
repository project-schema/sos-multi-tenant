import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorSupportCreatePage } from '@/store/features/vendor/support';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Support', path: '/support' },
	{ name: 'Create' },
];
export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="max-w-3xl mx-auto w-full md:mt-12">
				<VendorSupportCreatePage />
			</div>
		</SessionProvider>
	);
}
