import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { CategoryCreate, CategoryTable } from '@/store/features/category';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Category' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Category</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<CategoryCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<CategoryTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}
