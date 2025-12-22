'use client';

import { TenantsRegisterForm } from '@/store/features/auth';
import { AuthLogin } from '@/store/features/auth/auth-login';
import { iSettingsType } from '@/types';
import { useSearchParams } from 'next/navigation';

export default function PageClient({ settings }: { settings: iSettingsType }) {
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab');

	switch (tab) {
		case 'register':
			return <TenantsRegisterForm settings={settings} />;

		case 'login':
			return <AuthLogin settings={settings} />;

		default:
			return <AuthLogin settings={settings} />;
	}
}
