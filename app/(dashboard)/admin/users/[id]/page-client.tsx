'use client';
import {
	AdminUserNote,
	AdminUserPayments,
	AdminUserService,
	AdminUserServiceAdvertisement,
	AdminUserSubscription,
} from '@/store/features/admin/user';
import { AdminUserProfileTab } from '@/store/features/admin/user/admin.user.profile.tab';
import { useSearchParams } from 'next/navigation';

export default function User() {
	const searchParams = useSearchParams().get('tab');
	switch (searchParams) {
		case 'payments':
			return <AdminUserPayments />;

		case 'note':
			return <AdminUserNote />;

		case 'subscriptions':
			return <AdminUserSubscription />;

		case 'advertisement':
			return <AdminUserServiceAdvertisement />;

		case 'service':
			return <AdminUserService />;

		default:
			return <AdminUserProfileTab />;
	}
}
