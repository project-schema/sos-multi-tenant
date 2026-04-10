import { Footer02, Header02 } from '@/components/web';
import Checkout from '../common/checkout';
import GuestCheckout from '../common/guest-checkout';

export default function ThemeTwoCheckoutPage() {
	return (
		<>
			<Header02 />
			<div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<Checkout />
				<GuestCheckout />
			</div>
			<Footer02 />
		</>
	);
}
