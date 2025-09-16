import { VendorSidebar } from '@/components/dashboard/sidebar/vendor-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <VendorSidebar> {children}</VendorSidebar>;
}
