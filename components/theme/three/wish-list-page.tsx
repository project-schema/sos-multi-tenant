import { Footer03, Header03 } from '@/components/web';
import GuestWishList from '../common/guest-wishlist';
import CommonWishList from '../common/wish-list';

export default function ThemeThreeWishListPage() {
	return (
		<>
			<Header03 />
			<div className="bg-primary3/5">
				<CommonWishList />
				<GuestWishList />
			</div>
			<Footer03 />
		</>
	);
}
