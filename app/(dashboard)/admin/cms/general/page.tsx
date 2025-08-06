import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { meta } from '@/lib';
import { GeneralContentCreate } from '@/store/features/admin/cms/general-content';
import { Metadata } from 'next';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'General Content' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>General Content</CardTitle>}>
				<Card>
					<CardContent>
						<GeneralContentCreate />
					</CardContent>
				</Card>
			</Container1>
		</>
	);
}

export const metadata: Metadata = {
	...meta({
		title: 'General Content - Update',
		description: 'General Content - Update',
	}),
};
