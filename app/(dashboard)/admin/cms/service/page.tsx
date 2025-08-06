import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { meta } from '@/lib';
import {
	CrmServiceCreate,
	CrmServiceTable,
} from '@/store/features/admin/cms/service';
import { Metadata } from 'next';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'All Service' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>All Service</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<CrmServiceCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<CrmServiceTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}

export const metadata: Metadata = {
	...meta({
		title: 'Home Content - Service',
		description: 'Home Content - Service Update',
	}),
};
