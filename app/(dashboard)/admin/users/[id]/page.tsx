'use client';
import {
	AdminUserNote,
	AdminUserPayments,
	AdminUserSettings,
} from '@/store/features/admin/user';
import { useSearchParams } from 'next/navigation';

export default function User() {
	const searchParams = useSearchParams().get('tab');
	switch (searchParams) {
		case 'payments':
			return <AdminUserPayments />;

		case 'note':
			return <AdminUserNote />;

		default:
			return <AdminUserSettings />;
	}
}
