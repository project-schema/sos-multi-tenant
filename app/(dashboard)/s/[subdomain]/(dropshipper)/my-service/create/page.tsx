import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Service', path: '/my-service' },
	{ name: 'Create' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div> Service Create</div>
		</SessionProvider>
	);
}
