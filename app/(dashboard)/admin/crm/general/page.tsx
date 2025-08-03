import { DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { meta } from '@/lib';
import { CrmGeneralContentCreate } from '@/store/features/crm/general-content';
import { Metadata } from 'next';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'General Content' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					<CardHeader className="pb-3 flex items-center justify-between">
						<CardTitle className="text-2xl font-bold">
							General Content
						</CardTitle>
					</CardHeader>

					<CardContent>
						<Card>
							<CardContent>
								<CrmGeneralContentCreate />
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
		title: 'General Content - Update',
		description: 'General Content - Update',
	}),
};
