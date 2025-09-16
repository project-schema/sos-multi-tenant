import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';

const breadcrumbItems = [{ name: 'Dashboard', path: '/' }, { name: 'Service' }];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div> My Service</div>
		</SessionProvider>
	);
}
