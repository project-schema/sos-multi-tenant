import { Metadata } from 'next';
import PageClient from './page-client';

export const metadata: Metadata = {
	title: 'Service - SOS',
	description: 'Service - SOS Management',
};
export default function Page() {
	return (
		<div className="layout">
			<div className="max-w-2xl mx-auto py-40">
				<PageClient />
			</div>
		</div>
	);
}
