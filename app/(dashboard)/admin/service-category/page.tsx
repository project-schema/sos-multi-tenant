import { DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ServiceCategoryCreate,
	ServiceCategoryTable,
} from '@/store/features/service-category';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Service Category' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					<CardHeader className="pb-3 flex items-center justify-between">
						<CardTitle className="text-2xl font-bold">
							Service Category
						</CardTitle>
					</CardHeader>

					<CardContent className="grid grid-cols-3 gap-4">
						<Card className="col-span-1">
							<CardContent>
								<ServiceCategoryCreate />
							</CardContent>
						</Card>
						<Card className="col-span-2">
							<CardContent>
								<ServiceCategoryTable />
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
