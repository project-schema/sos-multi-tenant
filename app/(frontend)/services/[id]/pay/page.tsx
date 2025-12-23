import style from '@/components/essential/ServiceDetails/style.module.css';
import { getApiData } from '@/lib';
import { iAdminService } from '@/store/features/admin/service';
import { ServiceOrderCheckout } from '@/store/features/frontend';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
	title: 'Service Payment - SOS',
	description: 'Service Payment - SOS Management',
};
export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const [service] = await Promise.all([
		getApiData<iAdminService>(`/services-view/${id}`),
	]);
	console.log(service);
	if (!service) {
		return notFound();
	}

	return (
		<>
			<section className={style.servicesDetails}>
				<div className="layout">
					<ServiceOrderCheckout service={service} />
				</div>
			</section>
		</>
	);
}
