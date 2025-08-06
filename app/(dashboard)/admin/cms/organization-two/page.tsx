import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { meta } from '@/lib';
import {
	CrmOrganizationTwoCreate,
	CrmOrganizationTwoTable,
} from '@/store/features/admin/cms/organization-two';
import { Metadata } from 'next';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'All Organization Two' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>All Organization Two</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<CrmOrganizationTwoCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<CrmOrganizationTwoTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}

export const metadata: Metadata = {
	...meta({
		title: 'Home Content - Organization Two',
		description: 'Home Content - Organization Two Update',
	}),
};
