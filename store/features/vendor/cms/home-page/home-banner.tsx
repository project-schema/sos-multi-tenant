'use client';

import { Card, CardContent } from '@/components/ui/card';
import { BannerCreate } from './banner/create';
import { BannerTable } from './banner/table';

export function HomeBanner() {
	return (
		<Card className="w-full">
			<CardContent>
				<div className="mb-4 flex justify-end">
					<BannerCreate />
				</div>
				<BannerTable />
			</CardContent>
		</Card>
	);
}
