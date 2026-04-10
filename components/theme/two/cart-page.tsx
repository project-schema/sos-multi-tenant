import { Footer02, Header02 } from '@/components/web';
import CommonCart from '../common/cart';
import GuestCart from '../common/guest-cart';

export default function ThemeTwoCartPage() {
	return (
		<>
			<Header02 />
			<CommonCart />
			<GuestCart />
			<Footer02 />
		</>
	);
}
