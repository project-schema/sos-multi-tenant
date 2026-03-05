import Footer04 from '@/components/web/footer/04';
import Header04 from '@/components/web/header/04';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import ContactSection from './_ctx/contact-section';
import ExtraNav from './_ctx/header-extra-nav';

export default function ThemeFourContactPage({ cms }: { cms: iSystem }) {
	return (
		<>
			<Header04 />
			<ExtraNav />
			<ContactSection cms={cms} />
			<Footer04 />
		</>
	);
}
