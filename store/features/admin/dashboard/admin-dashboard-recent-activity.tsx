'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { recentActivity } from './admin-dashboard-data';

export function AdminDashboardRecentActivity() {
	return (
		<Card className="shadow-none">
			<CardHeader className="flex flex-row items-center gap-2 border-b pb-4">
				<Bell className="size-4 text-muted-foreground" />
				<h3 className="text-lg font-semibold">Recent Activity</h3>
			</CardHeader>
			<CardContent className="p-0">
				<ul className="divide-y">
					{recentActivity.map((item, index) => (
						<li
							key={`${item.title}-${index}`}
							className="flex items-start justify-between gap-4 px-6 py-4"
						>
							<div>
								<p className="text-sm font-medium">{item.title}</p>
								<p className="text-sm text-muted-foreground">{item.user}</p>
							</div>
							<span className="shrink-0 text-xs text-muted-foreground">
								{item.time}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
