import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { meta } from '@/lib';
import {
	CrmPartnerCreate,
	CrmPartnerTable,
} from '@/store/features/admin/cms/partner';
import { Metadata } from 'next';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'All Partner' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>All Partner</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<CrmPartnerCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<CrmPartnerTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}

export const metadata: Metadata = {
	...meta({
		title: 'Home Content - Partner',
		description: 'Home Content - Partner Update',
	}),
};
