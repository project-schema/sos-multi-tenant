'use client';

import { Container1 } from '@/components/dashboard';
import { Card, CardTitle } from '@/components/ui/card';
import { useQueryParams } from '@/hooks/useQueryParams';
import { AdminEmailSubTable } from './admin-email-sub-table';
import { AdminUserMessageTable } from './admin-user-message-table';

export default function UserResponsesClient() {
	const { getParam } = useQueryParams();
	const tab = getParam('tab');

	return (
		<Container1 header={<CardTitle>User Management</CardTitle>}>
			<Card className="gap-0">
				{tab !== 'contact' && <AdminEmailSubTable />}
				{tab === 'contact' && <AdminUserMessageTable />}
			</Card>
		</Container1>
	);
}
