import { Header01 } from '@/components/web';
import Footer01 from '@/components/web/footer/01';
import { getApiData } from '@/lib';
import { iSubscriptionsType } from '@/types';
import { notFound } from 'next/navigation';
import AuthClient from '../two/_ctx/auth-client';

export default async function ThemeThreeAuthPage() {
	const subscriptions = await getApiData<iSubscriptionsType>('/subscriptions');

	if (subscriptions?.status !== 200) {
		return notFound();
	}
	return (
		<>
			<Header01 />
			<AuthClient subscriptions={subscriptions} />
			<Footer01 />
		</>
	);
}
