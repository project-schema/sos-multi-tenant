import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { CmsBlogPage } from '@/store/features/vendor/cms/blog';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Blog' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<CmsBlogPage />
		</SessionProvider>
	);
}
