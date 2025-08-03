import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdFormatCreate } from './ad_format.create';
import { AdFormatTable } from './ad_format.table';

export function AdFormatIndex() {
	return (
		<>
			<Card className="col-span-1">
				<CardHeader>
					<CardTitle className="text-lg font-bold">Ad Format</CardTitle>
				</CardHeader>
				<CardContent>
					<AdFormatCreate />
				</CardContent>
			</Card>
			<Card className="col-span-2">
				<CardContent>
					<AdFormatTable />
				</CardContent>
			</Card>
		</>
	);
}
