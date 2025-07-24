'use client';
import { DbHeader } from '@/components/dashboard';
import React from 'react';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Support' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
		</>
	);
}
