'use client';

import { Card, CardContent } from '@/components/ui/card';
import { BannerTable } from './banner/table';

export function HomeBanner() {
	return (
		<Card className="w-full">
			<CardContent>
				<BannerTable />
			</CardContent>
		</Card>
	);
}
