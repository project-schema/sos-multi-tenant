import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import {
	VendorSupplierCreate,
	VendorSupplierTable,
} from '@/store/features/vendor/supplier';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Supplier' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Supplier</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<VendorSupplierCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<VendorSupplierTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</SessionProvider>
	);
}
