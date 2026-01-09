'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CategoryCreate, CategoryTable } from './category';

export function HomeCategory() {
	return (
		<Card className="w-full">
			<CardContent>
				<div className="mb-4 flex justify-end">
					<CategoryCreate />
				</div>
				<CategoryTable />
			</CardContent>
		</Card>
	);
}