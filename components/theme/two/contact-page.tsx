import Footer02 from '@/components/web/footer/02';
import Header02 from '@/components/web/header/02';
import ContactPage from '@/store/features/frontend/contact/contact';

export default function ThemeTwoContactPage() {
	return (
		<>
			<Header02 cms={null} />
			<ContactPage />
			<Footer02 />
		</>
	);
}
