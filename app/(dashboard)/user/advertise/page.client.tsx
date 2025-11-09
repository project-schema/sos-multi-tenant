'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';

export default function PageClient() {
	//
	return (
		<Container1
			isLoading={false}
			isError={false}
			header={<CardTitle>Cart List</CardTitle>}
		>
			<div className="border rounded-lg relative">
				{false && <Loader8 />}
				test
			</div>
		</Container1>
	);
}
