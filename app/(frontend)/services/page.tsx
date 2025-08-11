import AllServices from '@/components/essential/ServicePage/AllServices/AllServices';
import ServiceBanner from '@/components/essential/ServicePage/ServiceBanner/ServiceBanner';
import { getApiData } from '@/lib';
import { iSettingsType } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
	title: 'Service - SOS',
	description: 'Service - SOS Management',
};
export default async function Page() {
	const [settings] = await Promise.all([
		getApiData<iSettingsType>('/settings'),
	]);

	if (settings?.status !== 200) {
		return notFound();
	}
	return (
		<>
			<ServiceBanner settings={settings} />
			<AllServices />
		</>
	);
}
