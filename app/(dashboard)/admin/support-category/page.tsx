import { DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	SupportCategoryCreate,
	SupportCategoryTable,
} from '@/store/features/support-category';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Support Category' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					<CardHeader className="pb-3 flex items-center justify-between">
						<CardTitle className="text-2xl font-bold">
							Support Category
						</CardTitle>
					</CardHeader>

					<CardContent className="grid grid-cols-3 gap-4">
						<Card className="col-span-1">
							<CardContent>
								<SupportCategoryCreate />
							</CardContent>
						</Card>
						<Card className="col-span-2">
							<CardContent>
								<SupportCategoryTable />
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
