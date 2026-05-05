import { Loader9 } from '@/components/dashboard';
import { lazy, Suspense } from 'react';
const LayoutClient = lazy(() => import('./layout-client'));

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<Suspense fallback={<Loader9 />}>
			<LayoutClient children={children} />
		</Suspense>
	);
}

export const metadata = {
	title: 'Users',
};
