import { Footer03, Header03 } from '@/components/web';
import CommonAccount from '../common/account';

export default function ThemeThreeAccountPage() {
	return (
		<>
			<Header03 />
			<div className="max-w-[1420px] mx-auto py-10">
				<CommonAccount />
			</div>
			<Footer03 />
		</>
	);
}
