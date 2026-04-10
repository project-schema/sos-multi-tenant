import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import CommonCart from '../common/cart';
import GuestCart from '../common/guest-cart';

export default function ThemeOneCartPage() {
	return (
		<>
			<Header01 />
			<CommonCart />
			<GuestCart />
			<Footer01 />
		</>
	);
}
