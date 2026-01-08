import { AccountProvider } from '@/provider';

export default function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AccountProvider>{children}</AccountProvider>;
}
