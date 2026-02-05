import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import Checkout from '../common/checkout';

export default function ThemeOneCheckoutPage() {
	return (
		<>
			<Header01 />
			<div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<Checkout />
			</div>
			<Footer01 />
		</>
	);
}
