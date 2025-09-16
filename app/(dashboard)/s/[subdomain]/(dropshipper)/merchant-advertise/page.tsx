import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Advertise' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div> Advertise</div>
		</SessionProvider>
	);
}
