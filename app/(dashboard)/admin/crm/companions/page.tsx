import { DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { meta } from '@/lib';
import {
	CrmCompanionCreate,
	CrmCompanionTable,
} from '@/store/features/crm/companion';
import { Metadata } from 'next';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'All Companions' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					<CardHeader className="pb-3 flex items-center justify-between">
						<CardTitle className="text-2xl font-bold">All Companions</CardTitle>
					</CardHeader>

					<CardContent className="grid grid-cols-3 gap-4">
						<Card className="col-span-1">
							<CardContent>
								<CrmCompanionCreate />
							</CardContent>
						</Card>
						<Card className="col-span-2">
							<CardContent>
								<CrmCompanionTable />
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
		title: 'Home Content - Companions',
		description: 'Home Content - Companions Update',
	}),
};
