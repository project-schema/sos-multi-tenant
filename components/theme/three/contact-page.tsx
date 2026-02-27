import Footer03 from '@/components/web/footer/03';
import Header03 from '@/components/web/header/03';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import ContactSection from './ctx/contact-section';

export default async function ThemeThreeContactPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms',
	);

	return (
		<>
			<Header03 />
			<div className="bg-primary3/5 py-10 md:py-14 lg:py-16 2xl:py-24  max-w-7xl mx-auto px-5">
				<ContactSection settings={settings ?? undefined} />
			</div>
			<Footer03 />
		</>
	);
}
