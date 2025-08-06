import KeyMembers from '@/components/essential/AboutPage/KeyMembers/KeyMembers';
import OurCompany from '@/components/essential/AboutPage/OurCompany/OurCompany';
import OurMission from '@/components/essential/AboutPage/OurMission/OurMission';
import OurVission from '@/components/essential/AboutPage/OurVission/OurVission';
import ChooseUs from '@/components/essential/ChooseUs';
import { getApiData } from '@/lib';
import { iMembersType, iMissionsType, iSettingsType } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
	title: 'About Us - SOS',
	description: 'About Us - SOS Management',
};
export default async function Page() {
	const settings = await getApiData<iSettingsType>('/settings');
	const missions = await getApiData<iMissionsType>('/missions');
	const members = await getApiData<iMembersType>('/members');

	if (
		settings?.status !== 200 ||
		missions?.status !== 200 ||
		members?.status !== 200
	) {
		return notFound();
	}
	return (
		<>
			<OurCompany settings={settings} />
			<OurVission settings={settings} />
			{missions?.status === 200 && (
				<OurMission settings={settings} missions={missions} />
			)}
			<ChooseUs settings={settings} />
			{/* <FeedbackSlider settings={settings} /> */}
			<KeyMembers settings={settings} members={members} />
		</>
	);
}
