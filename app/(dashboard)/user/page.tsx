import DBHeader from '@/components/dashboard/header/header';
import { UserSwitchCard } from '@/store/features/user-switch';

export default function Page() {
	return (
		<div>
			<DBHeader page="User" subPage="Dashboard" />
			<UserSwitchCard />
		</div>
	);
}

// components/JoinCards.tsx
