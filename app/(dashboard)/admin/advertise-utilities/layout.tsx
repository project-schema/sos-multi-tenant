import { DbHeader } from '@/components/dashboard';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Advertise Utilities' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />

			{children}
		</>
	);
}
