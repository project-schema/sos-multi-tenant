'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function CommonAccount() {
	const [view, setView] = useState<'home' | 'profile' | 'orders'>('home');

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
					{view === 'home' && <DashboardCards />}
					{view === 'profile' && <ProfileForm />}
					{view === 'orders' && <OrdersTable />}
				</div>
			</div>
		</section>
	);
}

function StatCard({ title, count }: { title: string; count: number }) {
	return (
		<div className="flex items-center gap-4 border rounded-xl p-5 bg-white">
			<div className="w-12 h-12 rounded-lg bg-black text-white flex items-center justify-center">
				<Package className="w-6 h-6" />
			</div>
			<div>
				<p className="text-sm text-gray-600">{title}</p>
				<p className="text-2xl font-bold">{count}</p>
			</div>
		</div>
	);
}

function DashboardCards() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			<StatCard title="All Orders" count={60} />
			<StatCard title="All Orders" count={60} />
			<StatCard title="Completed Order" count={60} />
			<StatCard title="Canceled Order" count={60} />
			<StatCard title="Pending Order" count={60} />
		</div>
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

function OrdersTable() {
	const rows = Array.from({ length: 7 }).map((_, i) => ({
		id: `ORD-20250712-${257 + i}`,
		total: 302,
		orderStatus: i === 0 ? 'Pending' : 'Delivered',
		payment: i === 0 ? 'Unpaid' : 'Paid',
		date: '2025-07-12',
	}));

	return (
		<div className="border rounded-md overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full text-sm text-left">
					<thead className="bg-gray-50 text-gray-700 font-semibold">
						<tr>
							<th className="px-4 py-3 whitespace-nowrap">ORDER #</th>
							<th className="px-4 py-3">TOTAL</th>
							<th className="px-4 py-3 whitespace-nowrap">ORDER STATUS</th>
							<th className="px-4 py-3 whitespace-nowrap">PAYMENT STATUS</th>
							<th className="px-4 py-3 whitespace-nowrap">DATE</th>
							<th className="px-4 py-3 text-right">ACTIONS</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{rows.map((r) => (
							<tr key={r.id} className="hover:bg-gray-50">
								<td className="px-4 py-3 whitespace-nowrap">{r.id}</td>
								<td className="px-4 py-3">{r.total}৳</td>
								<td className="px-4 py-3">
									<span
										className={`px-2 py-1 rounded text-xs ${
											r.orderStatus === 'Pending'
												? 'bg-blue-100 text-blue-700'
												: 'bg-green-100 text-green-700'
										}`}
									>
										{r.orderStatus}
									</span>
								</td>
								<td className="px-4 py-3">
									<span
										className={`px-2 py-1 rounded text-xs ${
											r.payment === 'Unpaid'
												? 'bg-red-100 text-red-700'
												: 'bg-green-100 text-green-700'
										}`}
									>
										{r.payment}
									</span>
								</td>
								<td className="px-4 py-3 whitespace-nowrap">{r.date}</td>
								<td className="px-4 py-3 text-right">
									<button className="border rounded px-3 py-1 text-sm">
										Details
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
