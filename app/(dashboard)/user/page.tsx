import { DbHeader } from '@/components/dashboard';
import { UserSwitchCard } from '@/store/features/user-switch';
const breadcrumbItems = [{ name: 'Dashboard' }];

export default function Page() {
	return (
		<div>
			<DbHeader breadcrumb={breadcrumbItems} />
			<UserSwitchCard />
		</div>
	);
}

// components/JoinCards.tsx
