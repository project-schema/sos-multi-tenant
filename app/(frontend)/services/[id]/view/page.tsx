import HeadingOfSD from '@/components/essential/ServiceDetails/heading-of-service-details';
import ServiceOfDetails from '@/components/essential/ServiceDetails/service-of-details';
import SliderOfSD from '@/components/essential/ServiceDetails/slider-of-service-details';
import style from '@/components/essential/ServiceDetails/style.module.css';
import TabOfSD from '@/components/essential/ServiceDetails/tab-of-service-details';
import { getApiData } from '@/lib';
import { iSettingsType } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
	title: 'Service - SOS',
	description: 'Service - SOS Management',
};
export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const [settings, service] = await Promise.all([
		getApiData<iSettingsType>('/settings'),
		getApiData<any>(`/services-view/${id}`),
	]);

	console.log(service);

	if (settings?.status !== 200 || !service) {
		return notFound();
	}

	return (
		<>
			<section className={style.servicesDetails}>
				<div className="layout">
					<div className={style.servicesDetailsWp}>
						<div className={style?.servicesdetailsSlider}>
							<HeadingOfSD service={service} />
							<SliderOfSD images={service?.serviceimages} />
							<ServiceOfDetails service={service} />
						</div>
						{/* @ts-ignore */}
						<TabOfSD packages={service?.servicepackages} />
					</div>
				</div>
			</section>
		</>
	);
}
