import { TenantsRegisterForm } from '@/store/features/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Service - SOS',
	description: 'Service - SOS Management',
};
export default function Page() {
	return (
		<div className="layout">
			<div className="max-w-2xl mx-auto py-40">
				<TenantsRegisterForm />
			</div>
		</div>
	);
}
