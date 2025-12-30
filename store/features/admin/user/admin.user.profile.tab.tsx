'use client';

import { Loader6 } from '@/components/dashboard/loader';
import { useParams, useSearchParams } from 'next/navigation';
import { AdminTenantProfile } from './admin.tenant.profile';
import { useAdminUserProfileByIdQuery } from './admin.user.api.slice';
import { AdminUserSettings } from './admin.user.settings';

export function AdminUserProfileTab() {
	const params = useParams();
	const isTenant = useSearchParams().get('type');

	const {
		data,
		isLoading: profileLoading,
		isError,
	} = useAdminUserProfileByIdQuery(
		{ id: params.id as string, is_tenant: isTenant === 'tenant' },
		{
			skip: !params.id || !isTenant,
		}
	);

	if (profileLoading) {
		return (
			<div className="space-y-4">
				<Loader6 />
				<Loader6 />
			</div>
		);
	}
	if (isError) return <div>Error loading profile</div>;

	if (data && isTenant === 'tenant') {
		return <AdminTenantProfile data={{ user: data?.user }} />;
	}

	if (data && isTenant === 'user') {
		return <AdminUserSettings data={{ user: data?.user }} />;
	}

	return <div>No data found</div>;
}
