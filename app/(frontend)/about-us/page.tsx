import ChooseUs from '@/components/essential/AboutPage/ChooseUs/ChooseUs';
import FeedbackSlider from '@/components/essential/AboutPage/FeedbackSlider/FeedbackSlider';
import KeyMembers from '@/components/essential/AboutPage/KeyMembers/KeyMembers';
import OurCompany from '@/components/essential/AboutPage/OurCompany/OurCompany';
import OurMission from '@/components/essential/AboutPage/OurMission/OurMission';
import OurVission from '@/components/essential/AboutPage/OurVission/OurVission';
import { getApiData } from '@/lib';
import {
	iCompanionsType,
	iMembersType,
	iMissionsType,
	iSettingsType,
	iTestimonialsType,
} from '@/types';
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
	const companions = await getApiData<iCompanionsType>('/companions');
	const testimonials = await getApiData<iTestimonialsType>('/testimonials');

	if (
		settings?.status !== 200 ||
		missions?.status !== 200 ||
		companions?.status !== 200 ||
		testimonials?.status !== 200 ||
		members?.status !== 200
	) {
		return notFound();
	}
	return (
		<>
			<OurCompany settings={settings} />
			<OurVission settings={settings} />
			<OurMission settings={settings} missions={missions} />
			<ChooseUs settings={settings} companions={companions} />
			<FeedbackSlider settings={settings} testimonials={testimonials} />
			<KeyMembers settings={settings} members={members} />
		</>
	);
}
