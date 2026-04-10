import Footer04 from '@/components/web/footer/04';
import Header04 from '@/components/web/header/04';
import GuestWishList from '../common/guest-wishlist';
import CommonWishList from '../common/wish-list';
import ExtraNav from './_ctx/header-extra-nav';

export default function ThemeFourWishListPage() {
	return (
		<>
			<Header04 />
			<ExtraNav />
			<CommonWishList />
			<GuestWishList />

			<Footer04 />
		</>
	);
}
