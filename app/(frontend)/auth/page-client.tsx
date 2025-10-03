'use client';

import { TenantsRegisterForm } from '@/store/features/auth';
import { AuthLogin } from '@/store/features/auth/auth-login';
import { useSearchParams } from 'next/navigation';

export default function PageClient() {
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab');

	switch (tab) {
		case 'register':
			return <TenantsRegisterForm />;
		case 'login':
			return <AuthLogin />;

		default:
			break;
	}
}
