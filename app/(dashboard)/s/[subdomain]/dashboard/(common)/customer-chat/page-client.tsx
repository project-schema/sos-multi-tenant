'use client';

import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { ChatApp } from '@/store/features/chat/ChatApp';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Customer Chat' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<ChatApp />
		</SessionProvider>
	);
}
