import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
	ServiceSubCategoryCreate,
	ServiceSubCategoryTable,
} from '@/store/features/admin/service-sub-category';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Service Sub Category' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Service Sub Category</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<ServiceSubCategoryCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<ServiceSubCategoryTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}
