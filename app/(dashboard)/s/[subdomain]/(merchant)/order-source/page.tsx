import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import {
	VendorOrderSourceCreate,
	VendorOrderSourceTable,
} from '@/store/features/vendor/order-source';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Order Source' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Order Source</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<VendorOrderSourceCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<VendorOrderSourceTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</SessionProvider>
	);
}
