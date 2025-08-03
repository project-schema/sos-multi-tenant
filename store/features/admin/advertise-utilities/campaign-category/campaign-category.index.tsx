import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CampaignCategoryCreate } from './campaign-category.create';
import { CampaignCategoryTable } from './campaign-category.table';

export function CampaignCategoryIndex() {
	return (
		<>
			<Card className="col-span-1">
				<CardHeader>
					<CardTitle className="text-lg font-bold">Campaign Category</CardTitle>
				</CardHeader>
				<CardContent>
					<CampaignCategoryCreate />
				</CardContent>
			</Card>
			<Card className="col-span-2">
				<CardContent>
					<CampaignCategoryTable />
				</CardContent>
			</Card>
		</>
	);
}
