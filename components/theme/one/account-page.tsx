import { Footer01, Header01 } from '@/components/web';
import CommonAccount from '../common/account';

export default function ThemeOneAccountPage() {
	return (
		<>
			<Header01 />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<CommonAccount />
			</div>
			<Footer01 />
		</>
	);
}
