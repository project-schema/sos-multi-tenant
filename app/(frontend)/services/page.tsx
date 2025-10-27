import AllServices from '@/components/essential/ServicePage/AllServices/AllServices';
import ServiceBanner from '@/components/essential/ServicePage/ServiceBanner/ServiceBanner';
import { getApiData } from '@/lib';
import { iPagination, iServiceType, iSettingsType } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
	title: 'Service - SOS',
	description: 'Service - SOS Management',
};
type ServicesSearchParams = {
	page?: string;
	category_id?: string;
	type?: 'latest' | 'best_selling' | 'avg_rating' | string;
	search?: string;
	tags?: string;
};

export default async function Page({
	searchParams,
}: {
	searchParams: ServicesSearchParams;
}) {
	const params = new URLSearchParams();
	if (searchParams?.page) params.set('page', String(searchParams.page));
	if (searchParams?.category_id)
		params.set('category_id', String(searchParams.category_id));
	if (searchParams?.type) params.set('type', String(searchParams.type));
	if (searchParams?.search) params.set('search', String(searchParams.search));
	if (searchParams?.tags) params.set('tags', String(searchParams.tags));

	const queryString = params.toString();

	const [settings, services, categories] = await Promise.all([
		getApiData<iSettingsType>('/settings'),
		getApiData<iPagination<iServiceType>>(
			`/all-services${queryString ? `?${queryString}` : ''}`
		),
		getApiData<{
			status: number;
			data: 'success';
			message: { id: number; name: string; slug: string; status: string }[];
		}>('/service-category'),
	]);

	if (settings?.status !== 200) {
		return notFound();
	}

	return (
		<>
			<ServiceBanner settings={settings} />
			<AllServices
				services={services}
				categories={categories?.message || []}
				current={{
					page: searchParams?.page || '',
					category_id: searchParams?.category_id || '',
					type: (searchParams?.type as any) || '',
					search: searchParams?.search || '',
					tags: searchParams?.tags || '',
				}}
			/>
		</>
	);
}
