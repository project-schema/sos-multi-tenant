import Banner from '@/components/essential/Banner';
import ChooseUs from '@/components/essential/ChooseUs';
import Counter from '@/components/essential/Counter';
import ItServices from '@/components/essential/Itservices';
import Organization from '@/components/essential/Organization';
import OrganizationProvide from '@/components/essential/OrganizationProvide';
import Partners from '@/components/essential/Partners';
import Pricing from '@/components/essential/Pricing';
import Services from '@/components/essential/Services';
import { getApiData } from '@/lib';
import {
	iItServicesType,
	iOrgOneType,
	iOrgTwoType,
	iPartnersType,
	iServicesType,
	iSettingsType,
	iSubscriptionsType,
} from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
	title: 'SOS | Home',
	description: 'SOS Management',
};

export default async function HomePage() {
	let settings: iSettingsType | null = null;
	let services: iServicesType | null = null;
	let orgOne: iOrgOneType | null = null;
	let orgTwo: iOrgTwoType | null = null;
	let itService: iItServicesType | null = null;
	let partners: iPartnersType | null = null;
	let subscriptions: iSubscriptionsType | null = null;

	try {
		[settings, services, orgOne, orgTwo, itService, partners, subscriptions] =
			await Promise.all([
				getApiData<iSettingsType>('/settings'),
				getApiData<iServicesType>('/services'),
				getApiData<iOrgOneType>('/org-one'),
				getApiData<iOrgTwoType>('/org-two'),
				getApiData<iItServicesType>('/it-services'),
				getApiData<iPartnersType>('/partners'),
				getApiData<iSubscriptionsType>('/subscriptions'),
			]);
	} catch (error) {
		console.error('Error loading homepage data:', error);
	}

	if (!settings || settings?.status !== 200) {
		return notFound();
	}

	return (
		<>
			{settings?.status === 200 && <Banner settings={settings} />}
			{services?.status === 200 && settings?.status === 200 && (
				<Services settingsData={settings} getServiceData={services} />
			)}
			{orgOne?.status === 200 && (
				<Organization settingsData={settings} getOrgOneData={orgOne} />
			)}
			{settings?.status === 200 && <Counter settings={settings} />}
			{settings?.status === 200 && itService?.status === 200 && (
				<ItServices settings={settings} itServices={itService} />
			)}
			{settings?.status === 200 && orgTwo?.status === 200 && (
				<OrganizationProvide settings={settings} getOrTwoData={orgTwo} />
			)}
			{settings?.status === 200 && orgTwo?.status === 200 && (
				<ChooseUs settings={settings} />
			)}
			{settings?.status === 200 && partners?.status === 200 && (
				<Partners settings={settings} partners={partners} />
			)}
			{subscriptions?.status === 200 && (
				<div className="pt-20">
					<Pricing subscriptions={subscriptions} />
				</div>
			)}
		</>
	);
}
