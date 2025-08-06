import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib';
import { CampaignCategoryCreate } from './campaign-category.create';
import { CampaignCategoryTable } from './campaign-category.table';

export function CampaignCategoryIndex() {
	return (
		<>
			<Card className="lg:col-span-1">
				<CardHeader>
					<CardTitle className={cn('text-lg xl:text-xl')}>
						Campaign Category
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CampaignCategoryCreate />
				</CardContent>
			</Card>
			<Card className="lg:col-span-2">
				<CardContent>
					<CampaignCategoryTable />
				</CardContent>
			</Card>
		</>
	);
}
