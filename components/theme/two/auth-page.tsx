import Footer01 from '@/components/web/footer/01';
import Header02 from '@/components/web/header/02';
import { getApiData } from '@/lib';
import { iSubscriptionsType } from '@/types';
import { notFound } from 'next/navigation';
import AuthClient from './_ctx/auth-client';

export default async function ThemeTwoAuthPage() {
	const subscriptions = await getApiData<iSubscriptionsType>('/subscriptions');

	if (subscriptions?.status !== 200) {
		return notFound();
	}
	return (
		<>
			<Header02 />
			<AuthClient subscriptions={subscriptions} />
			<Footer01 />
		</>
	);
}
