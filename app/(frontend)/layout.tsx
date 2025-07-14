import Footer from '@/components/frontend/footer/Footer';
import Nav from '@/components/frontend/nav';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Nav />
			{children}
			<Footer />
		</>
	);
}
