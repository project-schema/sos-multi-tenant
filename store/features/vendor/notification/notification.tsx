'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Loader2 } from 'lucide-react';
import {
	useGetAllNotificationsQuery,
	useMarkAsReadAllMutation,
	useMarkAsReadMutation,
} from './api-slice';

export function Notification() {
	const {
		data: notifications,
		isLoading,
		isFetching,
		refetch,
	} = useGetAllNotificationsQuery();
	const [markAsRead, { isLoading: isMarkingOne }] = useMarkAsReadMutation();
	const [markAsReadAll, { isLoading: isMarkingAll }] =
		useMarkAsReadAllMutation();

	const notification = notifications?.notification ?? [];
	const unreadCount = notification.filter((n) => !n.read_at).length;
	const isBusy = isLoading || isFetching;

	const handleMarkAsRead = async (id: string) => {
		try {
			await markAsRead({ id }).unwrap();
			await refetch();
		} catch (error) {
			console.error('Failed to mark notification as read', error);
		}
	};

	const handleMarkAllAsRead = async () => {
		try {
			await markAsReadAll().unwrap();
			await refetch();
		} catch (error) {
			console.error('Failed to mark all notifications as read', error);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="mr-2">
				<Button variant="ghost" size="sm" className="relative cursor-pointer ">
					<Bell className="h-4 w-4" />
					{unreadCount && unreadCount > 0 && (
						<Badge
							variant="destructive"
							className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
						>
							{unreadCount}
						</Badge>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-80">
				<DropdownMenuLabel>Notifications</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{isBusy && (
					<div className="p-3 space-y-3">
						{Array.from({ length: 3 }).map((_, index) => (
							<div key={index} className="space-y-2 animate-pulse">
								<div className="h-4 bg-muted rounded" />
								<div className="h-3 bg-muted rounded w-2/3" />
							</div>
						))}
					</div>
				)}
				{!isBusy &&
					notification.map((notification) => (
						<DropdownMenuItem
							key={notification.id}
							className="flex flex-col items-start p-3 gap-1"
							onSelect={(e) => e.preventDefault()}
						>
							<div className="flex items-center justify-between w-full gap-2">
								<span className="font-medium text-sm">
									{notification.data.text}
								</span>
								<span className="text-xs text-muted-foreground">
									{notification.created_at}
								</span>
							</div>
							<span className="text-sm text-muted-foreground">
								{notification.data.redirect}
							</span>
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-2">
									{notification.read_at === null ? (
										<span className="text-xs text-blue-600">Unread</span>
									) : (
										<span className="text-xs text-muted-foreground">Read</span>
									)}
								</div>
								{notification.read_at === null && (
									<Button
										variant="ghost"
										size="sm"
										className="h-7 px-2"
										disabled={isMarkingOne}
										onClick={() => handleMarkAsRead(notification.id)}
									>
										{isMarkingOne ? (
											<Loader2 className="mr-2 h-3 w-3 animate-spin" />
										) : null}
										Mark as read
									</Button>
								)}
							</div>
						</DropdownMenuItem>
					))}
				{!isBusy && notification.length === 0 && (
					<DropdownMenuItem className="text-center">
						<span className="text-sm text-muted-foreground">
							No notifications found
						</span>
					</DropdownMenuItem>
				)}
				{!isBusy && notification.length > 0 && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="text-center cursor-pointer"
							disabled={unreadCount === 0 || isMarkingAll}
							onSelect={(e) => {
								e.preventDefault();
								handleMarkAllAsRead();
							}}
						>
							<span className="text-sm text-muted-foreground">
								{isMarkingAll ? 'Marking...' : 'Mark all as read'}
							</span>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
