import { DbHeader } from '@/components/dashboard';
import { UserSupportCreatePage } from '@/store/features/user/support';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Support', path: '/support' },
	{ name: 'Create' },
];
export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="max-w-3xl mx-auto w-full md:mt-12">
				<UserSupportCreatePage />
			</div>
		</>
	);
}
