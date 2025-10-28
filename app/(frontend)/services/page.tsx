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
	searchParams: Promise<ServicesSearchParams>;
}) {
	const resolvedSearchParams = await searchParams;
	const params = new URLSearchParams();
	if (resolvedSearchParams?.page)
		params.set('page', String(resolvedSearchParams.page));
	if (resolvedSearchParams?.category_id)
		params.set('category_id', String(resolvedSearchParams.category_id));
	if (resolvedSearchParams?.type)
		params.set('type', String(resolvedSearchParams.type));
	if (resolvedSearchParams?.search)
		params.set('search', String(resolvedSearchParams.search));
	if (resolvedSearchParams?.tags)
		params.set('tags', String(resolvedSearchParams.tags));

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
					page: resolvedSearchParams?.page || '',
					category_id: resolvedSearchParams?.category_id || '',
					type: (resolvedSearchParams?.type as any) || '',
					search: resolvedSearchParams?.search || '',
					tags: resolvedSearchParams?.tags || '',
				}}
			/>
		</>
	);
}
