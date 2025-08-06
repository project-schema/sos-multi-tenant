import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { meta } from '@/lib';
import {
	CrmSocialCreate,
	CrmSocialTable,
} from '@/store/features/admin/cms/social';
import { Metadata } from 'next';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'All Social' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>All Social</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<CrmSocialCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<CrmSocialTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}

export const metadata: Metadata = {
	...meta({
		title: 'Home Content - Social',
		description: 'Home Content - Social Update',
	}),
};
