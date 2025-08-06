'use client';

import { Suspense } from 'react';
import SuspensePage from './suspense-page';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={<div>Loading tab controls...</div>}>
			<SuspensePage>{children}</SuspensePage>
		</Suspense>
	);
}
