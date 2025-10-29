import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header01 />
			{children}
			<Footer01 />
		</>
	);
}
