import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib';
import { ConversionLocationCreate } from './conversion-location.create';
import { ConversionLocationTable } from './conversion-location.table';

export function ConversionLocationIndex() {
	return (
		<>
			<Card className="lg:col-span-1">
				<CardHeader>
					<CardTitle className={cn('text-lg xl:text-xl')}>
						Conversion Location
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ConversionLocationCreate />
				</CardContent>
			</Card>
			<Card className="lg:col-span-2">
				<CardContent>
					<ConversionLocationTable />
				</CardContent>
			</Card>
		</>
	);
}
