import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Settings' },
];
export default function Page() {
	return (
		<div>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Settings</CardTitle>}>Settings</Container1>
		</div>
	);
}
