import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
	SupportSubCategoryCreate,
	SupportSubCategoryTable,
} from '@/store/features/support-sub-category';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Problem Topic' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Problem Topic</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<SupportSubCategoryCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<SupportSubCategoryTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}
