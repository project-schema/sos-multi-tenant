import { Card1, Card2 } from '@/components/dashboard';
import { Loader2 } from '@/components/dashboard/loader';
import { BadgeAlertIcon } from 'lucide-react';

export default function Page() {
	return (
		<div className="flex flex-col gap-4 p-4">
			<h1>Card 1 </h1>
			<Card1
				countTitle={'123'}
				icon={BadgeAlertIcon}
				title={'FrontEnd'}
				className="bg-slate-300"
				iconClassName="bg-slate-400"
			/>
			<h2>Card 2</h2>
			<Card2 count={100} title={'BackEnd'} />
			<h2>Loader 2</h2>
			<Loader2 />
		</div>
	);
}
