import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConversionLocationCreate } from './conversion-location.create';
import { ConversionLocationTable } from './conversion-location.table';

export function ConversionLocationIndex() {
	return (
		<>
			<Card className="col-span-1">
				<CardHeader>
					<CardTitle className="text-lg font-bold">
						Conversion Location
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ConversionLocationCreate />
				</CardContent>
			</Card>
			<Card className="col-span-2">
				<CardContent>
					<ConversionLocationTable />
				</CardContent>
			</Card>
		</>
	);
}
