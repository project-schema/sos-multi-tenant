import Footer04 from '@/components/web/footer/04';
import Header04 from '@/components/web/header/04';
import AuthSection from './_ctx/auth-section';
import ExtraNav from './_ctx/header-extra-nav';

export default async function ThemeFourAuthPage() {
	return (
		<>
			<Header04 />
			<ExtraNav />
			<AuthSection />
			<Footer04 />
		</>
	);
}
