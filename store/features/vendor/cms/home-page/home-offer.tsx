'use client';

import { Card, CardContent } from '@/components/ui/card';
import { OfferCreate } from './offer';
import { OfferTable } from './offer/table';

export function HomeOffer() {
	return (
		<Card className="w-full">
			<CardContent>
				<div className="mb-4 flex justify-end">
					<OfferCreate />
				</div>
				<OfferTable />
			</CardContent>
		</Card>
	);
}
