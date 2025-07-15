import Footer from '@/components/frontend/footer/Footer';
import Nav from '@/components/frontend/nav';
import { getApiData } from '@/lib';
import { iSettingsType } from '@/types/settings.type';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const settings = await getApiData<iSettingsType>('/settings');

	if (settings?.status !== 200) {
		return notFound();
	}
	return (
		<>
			<Nav settings={settings} />
			{children}
			<Footer />
		</>
	);
}
