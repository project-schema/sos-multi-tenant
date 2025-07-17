'use client';

import { useState, useEffect } from 'react';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Bell,
	User,
	Settings,
	LogOut,
	CreditCard,
	Eye,
	EyeOff,
} from 'lucide-react';

export default function DbHeader({
	page,
	subPage,
}: {
	page: string;
	subPage: string;
}) {
	const [showBalance, setShowBalance] = useState(false);
	const [balance] = useState(2450.75); // Mock balance

	// Auto-hide balance after 1 second
	useEffect(() => {
		if (showBalance) {
			const timer = setTimeout(() => {
				setShowBalance(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [showBalance]);

	const toggleBalance = () => {
		setShowBalance(!showBalance);
	};

	// Mock notifications data
	const notifications = [
		{
			id: 1,
			title: 'Payment received',
			message: '$150.00 from John Doe',
			time: '2 min ago',
			unread: true,
		},
		{
			id: 2,
			title: 'System update',
			message: 'New features available',
			time: '1 hour ago',
			unread: true,
		},
		{
			id: 3,
			title: 'Backup completed',
			message: 'Daily backup successful',
			time: '3 hours ago',
			unread: false,
		},
	];

	const unreadCount = notifications.filter((n) => n.unread).length;

	return (
		<header className="fixed w-full top-0 left-0 md:pl-[var(--sidebar-width)] z-50 bg-white  border-b flex h-16 mb-16 shrink-0 items-center gap-2 transition-[width,height,padding] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 group-has-data-[collapsible=icon]/sidebar-wrapper:mb-12 group-has-data-[collapsible=icon]/sidebar-wrapper:pl-10">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbLink href="/user">{page}</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<BreadcrumbPage>{subPage}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			{/* Right side elements */}
			<div className="flex items-center gap-2 ml-auto px-4">
				{/* Balance Toggle */}
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={toggleBalance}
						className="flex items-center gap-2 cursor-pointer"
					>
						{showBalance ? (
							<span className="font-medium">${balance.toFixed(2)}</span>
						) : (
							<span className="text-muted-foreground">••••</span>
						)}
						{showBalance ? (
							<EyeOff className="h-2 w-2" />
						) : (
							<Eye className="h-2 w-2" />
						)}
					</Button>
				</div>

				{/* Notifications Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild className="mr-2">
						<Button
							variant="ghost"
							size="sm"
							className="relative cursor-pointer"
						>
							<Bell className="h-4 w-4" />
							{unreadCount > 0 && (
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
						{notifications.map((notification) => (
							<DropdownMenuItem
								key={notification.id}
								className="flex flex-col items-start p-3"
							>
								<div className="flex items-center justify-between w-full">
									<span className="font-medium text-sm">
										{notification.title}
									</span>
									<span className="text-xs text-muted-foreground">
										{notification.time}
									</span>
								</div>
								<span className="text-sm text-muted-foreground mt-1">
									{notification.message}
								</span>
								{notification.unread && (
									<div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
								)}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-center">
							<span className="text-sm text-muted-foreground">
								View all notifications
							</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* User Profile Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="relative h-8 w-8 rounded-full cursor-pointer"
						>
							<Avatar className="h-12 w-12 bg-amber-100">
								<AvatarImage
									src="/placeholder.svg?height=32&width=32"
									alt="User"
								/>
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="end" forceMount>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">John Doe</p>
								<p className="text-xs leading-none text-muted-foreground">
									john.doe@example.com
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<CreditCard className="mr-2 h-4 w-4" />
							<span>Billing</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
