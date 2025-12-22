import { Metadata } from 'next';
import style from '../../../store/features/auth/sign-in.module.css';
import PageClient from './page-client';

export const metadata: Metadata = {
	title: 'Service - SOS',
	description: 'Service - SOS Management',
};

import { getApiData } from '@/lib';
import { iSettingsType } from '@/types';
import { notFound } from 'next/navigation';

export default async function HomePage() {
	let settings: iSettingsType | null = null;

	try {
		[settings] = await Promise.all([getApiData<iSettingsType>('/settings')]);
	} catch (error) {
		console.error('Error loading homepage data:', error);
	}

	if (!settings || settings?.status !== 200) {
		return notFound();
	}

	return (
		<>
			<div className={style.loginBg}>
				<div className="layout">
					<div className="max-w-2xl mx-auto  ">
						{settings?.status === 200 && <PageClient settings={settings} />}
					</div>
				</div>
			</div>
		</>
	);
}
