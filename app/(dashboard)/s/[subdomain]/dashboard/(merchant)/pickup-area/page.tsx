import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import {
	VendorPickAndDeliveryAddressCreate,
	VendorPickAndDeliveryAddressTable,
} from '@/store/features/vendor/delivery-area';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Pickup Area' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Pickup Area</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<VendorPickAndDeliveryAddressCreate type="pickup" />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<VendorPickAndDeliveryAddressTable type="pickup" />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</SessionProvider>
	);
}
