import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import GuestWishList from '../common/guest-wishlist';
import CommonWishList from '../common/wish-list';

export default function ThemeOneWishListPage() {
	return (
		<>
			<Header01 />
			<CommonWishList />
			<GuestWishList />
			<Footer01 />
		</>
	);
}
