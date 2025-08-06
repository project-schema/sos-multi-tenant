'use client';

import { Card } from '@/components/ui/card';
import { useQueryParams } from '@/hooks/useQueryParams';
import { AdminEmailSubTable } from './admin-email-sub-table';
import { AdminUserMessageTable } from './admin-user-message-table';

export default function UserResponsesClient() {
	const { getParam } = useQueryParams();
	const tab = getParam('tab');

	return (
		<div className="db-container space-y-6">
			<Card className="gap-0">
				{tab !== 'contact' && <AdminEmailSubTable />}
				{tab === 'contact' && <AdminUserMessageTable />}
			</Card>
		</div>
	);
}
