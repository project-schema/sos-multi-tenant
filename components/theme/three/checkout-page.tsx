import { Footer03, Header03 } from '@/components/web';
import Checkout from '../common/checkout';

export default function ThemeThreeCheckoutPage() {
	return (
		<>
			<Header03 />
			<div className="bg-primary3/5 space-y-10 md:space-y-14 lg:space-y-16 2xl:space-y-24 pb-10 md:pb-14 lg:pb-16 2xl:pb-24">
				<Checkout />
			</div>
			<Footer03 />
		</>
	);
}
