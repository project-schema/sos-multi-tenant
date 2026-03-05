import Footer04 from '@/components/web/footer/04';
import Header04 from '@/components/web/header/04';
import CommonAccount from '../common/account';
import ExtraNav from './_ctx/header-extra-nav';

export default function ThemeFourAccountPage() {
	return (
		<>
			<Header04 />
			<ExtraNav />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<CommonAccount />
			</div>
			<Footer04 />
		</>
	);
}
