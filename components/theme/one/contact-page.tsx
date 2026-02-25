import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import ContactSection from './_ctx/contact-section';

export default function ThemeOneContactPage({ cms }: { cms: iSystem }) {
	return (
		<>
			<Header01 />
			<ContactSection cms={cms} />
			<Footer01 />
		</>
	);
}
