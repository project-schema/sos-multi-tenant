'use client';
import { DbHeader } from '@/components/dashboard';
import { UserRecharge } from '@/store/features';
import React from 'react';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Recharge' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="max-w-2xl mx-auto w-full md:mt-12">
				<UserRecharge />
			</div>
		</>
	);
}
