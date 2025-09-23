import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'My Wallet | History | SOS',
	description: 'SOS Management',
};
export default function Layout({ children }: { children: React.ReactNode }) {
	return children;
}
