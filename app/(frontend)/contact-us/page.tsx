import Contact from '@/components/essential/Contact/Contact';
import { getApiData } from '@/lib';
import { iContactType } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Contact Us - SOS',
	description: 'Contact Us - SOS Management',
};
export default async function Page() {
	const data = await getApiData<iContactType>('/contact-page-data');

	if (data?.status !== 200) {
		return notFound();
	}
	return (
		<>
			<Contact data={data} />
		</>
	);
}
