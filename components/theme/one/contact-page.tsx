import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import ContactPage from '@/store/features/frontend/contact/contact';

export default function ThemeOneContactPage() {
	return (
		<>
			<Header01 />
			<ContactPage />
			<Footer01 />
		</>
	);
}
