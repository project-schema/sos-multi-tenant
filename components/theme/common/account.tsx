'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	OrderDashboardCards,
	OrdersTable,
} from '@/store/features/account/order';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CommonAccount() {
	const [view, setView] = useState<'home' | 'profile' | 'orders'>('home');
	const searchParams = useSearchParams();
	useEffect(() => {
		const view = searchParams.get('view');
		if (view) {
			setView(view as 'home' | 'profile' | 'orders');
		}
	}, [searchParams]);

	return (
		<section>
			<h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				{/* Sidebar */}
				<aside className="lg:col-span-3 border rounded-md overflow-hidden">
					<div className="flex items-center gap-4 p-4 border-b">
						<div className="relative w-16 h-16 rounded-full overflow-hidden">
							<Image
								src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop"
								alt="avatar"
								fill
								className="object-cover"
							/>
						</div>
						<div>
							<p className="font-semibold">Alex Adams</p>
							<p className="text-xs text-gray-500">Joined Sep Mon 2021</p>
						</div>
					</div>
					<nav className="divide-y">
						<button
							onClick={() => setView('home')}
							className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
								view === 'home' ? 'bg-gray-50' : ''
							}`}
						>
							Dashboard
						</button>
						<button
							onClick={() => setView('profile')}
							className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
								view === 'profile' ? 'bg-gray-50' : ''
							}`}
						>
							Profile Settings
						</button>
						<button
							onClick={() => setView('orders')}
							className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
								view === 'orders' ? 'bg-gray-50' : ''
							}`}
						>
							Orders List
						</button>
						<button className="w-full text-left px-4 py-3 hover:bg-gray-50">
							Log Out
						</button>
					</nav>
				</aside>

				{/* Content */}
				<div className="lg:col-span-9">
					{view === 'home' && <OrderDashboardCards />}
					{view === 'profile' && <ProfileForm />}
					{view === 'orders' && <OrdersTable />}
				</div>
			</div>
		</section>
	);
}

function ProfileForm() {
	return (
		<div className="border rounded-md p-5 bg-gray-50">
			<h2 className="text-xl font-bold mb-4">Profile Information</h2>
			<div className="space-y-5">
				<div>
					<label className="block text-sm font-medium mb-1">Name</label>
					<Input placeholder="+880 6146 11616" />
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Email Address
					</label>
					<Input placeholder="your email" />
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Phone Number *
					</label>
					<Input placeholder="+880 6146 11616" />
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Password *</label>
					<Input type="password" placeholder="Enter Password" />
				</div>
				<Button className="bg-black text-white">Save</Button>
			</div>
		</div>
	);
}
