import { DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, meta } from '@/lib';
import { CrmServiceContentCreate } from '@/store/features/crm/service-content';
import { Metadata } from 'next';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Service Content' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					<CardHeader className="pb-3 flex items-center justify-between">
						<CardTitle className="text-2xl font-bold">
							Service Content
						</CardTitle>
					</CardHeader>

					<CardContent>
						<Card className={cn('max-w-2xl')}>
							<CardContent>
								<CrmServiceContentCreate />
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
		title: 'Service Content - Update',
		description: 'Service Content - Update',
	}),
};
