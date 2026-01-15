import Footer01 from '@/components/web/footer/01';
import Header02 from '@/components/web/header/02';
import AuthClient from './_ctx/auth-client';

export default function ThemeTwoAuthPage() {
	return (
		<>
			<Header02 />
			<AuthClient />
			<Footer01 />
		</>
	);
}
