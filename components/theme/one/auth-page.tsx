import { Header01 } from '@/components/web';
import Footer01 from '@/components/web/footer/01';
import AuthSection from './_ctx/auth-section';

export default async function ThemeThreeAuthPage() {
	return (
		<>
			<Header01 />
			<AuthSection />
			<Footer01 />
		</>
	);
}
