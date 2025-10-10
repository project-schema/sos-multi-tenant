import { Button } from '@/components/ui/button';
import { Card01, Footer01, Header01 } from '@/components/web';
import Banner02 from '@/components/web/banner/02';

export default function MySite() {
	return (
		<>
			<Header01 />
			<Banner02 />
			<div className="flex items-center justify-between max-w-[1320px] mx-auto py-10">
				<h2 className="text-[40px] font-bold">PANJABI</h2>
				<Button>View All</Button>
			</div>
			<div className="grid grid-cols-4 gap-4 max-w-[1320px] mx-auto">
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
				<Card01 />
			</div>
			<Footer01 />
		</>
	);
}
