import { Button } from '@/components/ui/button';
import {
	Card01,
	Card04,
	Card05,
	Category01,
	Footer01,
	Header01,
} from '@/components/web';
import Banner02 from '@/components/web/banner/02';
import Link from 'next/link';

export default function ThemeOneHomePage() {
	return (
		<>
			<Header01 />
			<Banner02 />

			<div>
				<div className="py-10">
					<h2 className="text-[40px] font-bold text-center">
						Trending Categories
					</h2>
				</div>
				<Category01 />
			</div>

			<div className="flex items-center justify-between max-w-[1320px] px-4 mx-auto py-10">
				<h2 className="text-[40px] font-bold">PANJABI</h2>
				<Link href="/shop">
					<Button variant="dark">View All</Button>
				</Link>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1320px] px-4 mx-auto">
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
			</div>

			<div className="max-w-[1320px] px-4 mx-auto py-8">
				<Card04 />
			</div>

			<div className="flex items-center justify-between max-w-[1320px] px-4 mx-auto py-10">
				<h2 className="text-[40px] font-bold">Mens Fashion</h2>
				<Link href="/shop">
					<Button variant="dark">View All</Button>
				</Link>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1320px] px-4 mx-auto">
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
			</div>

			<div className="max-w-[1320px] px-4 mx-auto py-8">
				<Card05 />
			</div>

			<Footer01 />
		</>
	);
}
