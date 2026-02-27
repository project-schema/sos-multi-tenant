import { Footer03, Header03 } from '@/components/web';
import CommonWishList from '../common/wish-list';

export default function ThemeThreeWishListPage() {
	return (
		<>
			<Header03 />
			<div className="bg-primary3/5">
				<CommonWishList />
			</div>
			<Footer03 />
		</>
	);
}
