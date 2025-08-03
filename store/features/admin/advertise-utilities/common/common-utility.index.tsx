import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdvertiseCommonUtilitiesCreate } from './common-utility.create';
import { AdvertiseCommonUtilitiesTable } from './common-utility.table';
import { iAdvertiseCommonPath } from './common-utility.type';

export function AdvertiseCommonUtilitiesIndex({
	path,
}: {
	path: iAdvertiseCommonPath;
}) {
	return (
		<>
			<Card className="col-span-1">
				<CardHeader>
					<CardTitle className="text-lg font-bold capitalize">
						{path?.replace(/_/g, '  ')}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<AdvertiseCommonUtilitiesCreate path={path} />
				</CardContent>
			</Card>
			<Card className="col-span-2">
				<CardContent>
					<AdvertiseCommonUtilitiesTable path={path} />
				</CardContent>
			</Card>
		</>
	);
}
