'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ServiceCreate, ServiceTable } from './service';

export function HomeService() {
	return (
		<Card className="w-full">
			<CardContent>
				<div className="mb-4 flex justify-end">
					<ServiceCreate />
				</div>
				<ServiceTable />
			</CardContent>
		</Card>
	);
}