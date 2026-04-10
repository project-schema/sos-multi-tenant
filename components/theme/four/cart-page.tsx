import Footer04 from '@/components/web/footer/04';
import Header04 from '@/components/web/header/04';
import CommonCart from '../common/cart';
import GuestCart from '../common/guest-cart';
import ExtraNav from './_ctx/header-extra-nav';

export default function ThemeFourCartPage() {
	return (
		<>
			<Header04 />
			<ExtraNav />
			<CommonCart />
			<GuestCart />
			<Footer04 />
		</>
	);
}
