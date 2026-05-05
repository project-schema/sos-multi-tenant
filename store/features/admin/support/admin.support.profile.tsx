'use client';

import { Loader6 } from '@/components/dashboard';
import { CardContent } from '@/components/ui/card';
import { dateFormat } from '@/lib';
import { useAdminUserProfileByIdQuery } from '../user';

export const AdminSupportProfile = ({
	id,
	is_tenant,
}: {
	id: string;
	is_tenant: boolean;
}) => {
	const { data, isLoading, isError } = useAdminUserProfileByIdQuery({
		id,
		is_tenant,
	});

	if (isLoading) {
		return (
			<CardContent className="space-y-3">
				<Loader6 />
				<Loader6 />
			</CardContent>
		);
	}

	if (isError || !data?.user) {
		return (
			<CardContent className="p-4 text-red-500">
				Failed to load profile
			</CardContent>
		);
	}

	const user = data.user;

	return (
		<CardContent className="space-y-3 text-sm">
			<div className="flex justify-between">
				<span className="font-medium">Name:</span>
				<span>{user.name || '-'}</span>
			</div>

			<div className="flex justify-between">
				<span className="font-medium">Email:</span>
				<span>{user.email || '-'}</span>
			</div>

			<div className="flex justify-between">
				<span className="font-medium">Phone:</span>
				<span>{user.number || '-'}</span>
			</div>

			<div className="flex justify-between">
				<span className="font-medium">Company:</span>
				<span>{user.company_name || '-'}</span>
			</div>

			<div className="flex justify-between">
				<span className="font-medium">Address:</span>
				<span>{user.address || '-'}</span>
			</div>

			<div className="flex justify-between">
				<span className="font-medium">Status:</span>
				<span className="capitalize">{user.status}</span>
			</div>

			<div className="flex justify-between">
				<span className="font-medium">Balance:</span>
				<span>{user.balance}</span>
			</div>

			<div className="flex justify-between">
				<span className="font-medium">Last Seen:</span>
				<span>{dateFormat(user.last_seen) || '-'}</span>
			</div>
		</CardContent>
	);
};
