import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib';
import { AdFormatCreate } from './ad_format.create';
import { AdFormatTable } from './ad_format.table';

export function AdFormatIndex() {
	return (
		<>
			<Card className="lg:col-span-1">
				<CardHeader>
					<CardTitle className={cn('text-lg xl:text-xl')}>Ad Format</CardTitle>
				</CardHeader>
				<CardContent>
					<AdFormatCreate />
				</CardContent>
			</Card>
			<Card className="lg:col-span-2">
				<CardContent>
					<AdFormatTable />
				</CardContent>
			</Card>
		</>
	);
}
