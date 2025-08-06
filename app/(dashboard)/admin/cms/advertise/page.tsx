import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { meta } from '@/lib';
import { AdvertiseContentCreate } from '@/store/features/admin/cms/advertise-content';
import { Metadata } from 'next';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Advertise Content' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Advertise Content</CardTitle>}>
				<Card>
					<CardContent>
						<AdvertiseContentCreate />
					</CardContent>
				</Card>
			</Container1>
		</>
	);
}

export const metadata: Metadata = {
	...meta({
		title: 'Advertise Content - Update',
		description: 'Advertise Content - Update',
	}),
};
