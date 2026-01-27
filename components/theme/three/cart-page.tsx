import { Footer03, Header03 } from '@/components/web';
import CommonCart from '../common/cart';

export default function ThemeThreeCartPage() {
	return (
		<>
			<Header03 />
			<div className="max-w-[1420px] mx-auto py-10">
				<CommonCart />
			</div>
			<Footer03 />
		</>
	);
}
