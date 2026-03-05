import Footer04 from '@/components/web/footer/04';
import Header04 from '@/components/web/header/04';
import Checkout from '../common/checkout';
import ExtraNav from './_ctx/header-extra-nav';

export default function ThemeFourCheckoutPage() {
	return (
		<>
			<Header04 />
			<ExtraNav />
			<div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<Checkout />
			</div>
			<Footer04 />
		</>
	);
}
