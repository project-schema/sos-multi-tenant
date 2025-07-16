import AdvertiseBanner from '@/components/essential/AdvertisePage/AdvertiseBanner/AdvertiseBanner';
import SosAdvertise from '@/components/essential/AdvertisePage/SosAdvertise/SosAdvertiseSection';
import { getApiData } from '@/lib';
import { iFaqsType, iSettingsType } from '@/types';
import { notFound } from 'next/navigation';

export const metadata = {
	title: 'Advertise - SOS',
	description: 'Advertise - SOS Management',
};

export default async function Page() {
	const settings = await getApiData<iSettingsType>('/settings');
	const faqs = await getApiData<iFaqsType>('/faqs');

	if (settings?.status !== 200) {
		return notFound();
	}
	return (
		<>
			<AdvertiseBanner settings={settings} />
			{faqs?.status === 200 && <SosAdvertise settings={settings} faqs={faqs} />}
		</>
	);
}
