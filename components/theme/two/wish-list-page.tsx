import { Footer02, Header02 } from '@/components/web';
import GuestWishList from '../common/guest-wishlist';
import CommonWishList from '../common/wish-list';

export default function ThemeTwoWishListPage() {
	return (
		<>
			<Header02 />
			<CommonWishList />
			<GuestWishList />
			<Footer02 />
		</>
	);
}
