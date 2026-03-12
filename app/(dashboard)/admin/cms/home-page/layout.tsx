import { Suspense } from 'react';
import LayoutClient from './layout-client';
type LayoutProps = {
	children: React.ReactNode;
};
export default function Layout({ children }: LayoutProps) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LayoutClient>{children}</LayoutClient>
		</Suspense>
	);
}
