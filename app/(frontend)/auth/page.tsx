import { getApiData } from '@/lib';
import { iSettingsType } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import style from '../../../store/features/auth/sign-in.module.css';
import PageClient from './page-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Service - SOS',
	description: 'Service - SOS Management',
};

export default async function HomePage() {
	let settings: iSettingsType | null = null;

	try {
		settings = await getApiData<iSettingsType>('/settings');
	} catch (error) {
		console.error('Error loading homepage data:', error);
	}

	if (!settings || settings?.status !== 200) {
		return notFound();
	}

	return (
		<div className={style.loginBg}>
			<div className="layout">
				<div className="max-w-2xl mx-auto">
					<Suspense fallback={null}>
						<PageClient settings={settings} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
