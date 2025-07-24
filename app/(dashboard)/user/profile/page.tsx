'use client';
import { UserProfile, UserSettings } from '@/store/features/user-profile';
import { UserPassword } from '@/store/features/user-profile/user-password';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function ProfilePage() {
	const searchParams = useSearchParams().get('tab');
	switch (searchParams) {
		case 'profile':
			return <UserProfile />;

		case 'password':
			return <UserPassword />;

		case 'settings':
			return <UserSettings />;

		default:
			return <UserProfile />;
	}
}
