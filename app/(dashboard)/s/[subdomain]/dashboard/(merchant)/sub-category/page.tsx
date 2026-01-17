import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import {
	VendorSubCategoryCreate,
	VendorSubCategoryTable,
} from '@/store/features/vendor/sub-category';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Sub Category' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Sub Category</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<VendorSubCategoryCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<VendorSubCategoryTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</SessionProvider>
	);
}
