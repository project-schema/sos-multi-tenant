import { Footer03, Header03 } from '@/components/web';
import Checkout from '../common/checkout';

export default function ThemeThreeCheckoutPage() {
	return (
		<>
			<Header03 />
			<div className="max-w-[1420px] mx-auto py-10">
				<Checkout />
			</div>
			<Footer03 />
		</>
	);
}
