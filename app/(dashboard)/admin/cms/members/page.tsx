import { DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { meta } from '@/lib';
import {
	CrmMemberCreate,
	CrmMemberTable,
} from '@/store/features/admin/cms/member';
import { Metadata } from 'next';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'All Members' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					<CardHeader className="pb-3 flex items-center justify-between">
						<CardTitle className="text-2xl font-bold">All Members</CardTitle>
					</CardHeader>

					<CardContent className="grid grid-cols-3 gap-4">
						<Card className="col-span-1">
							<CardContent>
								<CrmMemberCreate />
							</CardContent>
						</Card>
						<Card className="col-span-2">
							<CardContent>
								<CrmMemberTable />
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export const metadata: Metadata = {
	...meta({
		title: 'Home Content - Members',
		description: 'Home Content - Members Update',
	}),
};
