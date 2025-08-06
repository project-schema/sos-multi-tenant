import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { meta } from '@/lib';
import { AboutContentCreate } from '@/store/features/admin/cms/about-content';
import { Metadata } from 'next';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'About Content' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>About Content</CardTitle>}>
				<Card>
					<CardContent>
						<AboutContentCreate />
					</CardContent>
				</Card>
			</Container1>
		</>
	);
}

export const metadata: Metadata = {
	...meta({
		title: 'About Content - Update',
		description: 'About Content - Update',
	}),
};
