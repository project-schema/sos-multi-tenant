import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import {
	VendorPaymentMethodsCreate,
	VendorPaymentMethodsTable,
} from '@/store/features/vendor/payment-methods';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Payment Methods' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Payment Methods</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<VendorPaymentMethodsCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<VendorPaymentMethodsTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</SessionProvider>
	);
}
