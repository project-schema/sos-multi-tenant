import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import {
	VendorBrandCreate,
	VendorBrandTable,
} from '@/store/features/vendor/brand';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Brand' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Brand</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<VendorBrandCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<VendorBrandTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</SessionProvider>
	);
}
