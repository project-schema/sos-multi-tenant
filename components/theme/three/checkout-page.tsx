import { Footer03, Header03 } from '@/components/web';
import Checkout from '../common/checkout';
import GuestCheckout from '../common/guest-checkout';

export default function ThemeThreeCheckoutPage() {
	return (
		<>
			<Header03 />
			<div className="bg-primary3/5 space-y-10 md:space-y-14 lg:space-y-16 2xl:space-y-24 pb-10 md:pb-14 lg:pb-16 2xl:pb-24">
				<div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
					<Checkout />
					<GuestCheckout />
				</div>
			</div>
			<Footer03 />
		</>
	);
}
