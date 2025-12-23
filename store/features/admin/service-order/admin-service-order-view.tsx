'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { badgeFormat, dateFormat, timeFormat } from '@/lib';
import {
	ChevronDown,
	CreditCard,
	FileText,
	Package,
	Store,
	User,
} from 'lucide-react';
import { AdminServiceOrderStatus } from './admin-service-order-status';
import { AdminServiceOrderCancelReq } from './admin-sevice-order-cancel-req';
import { AdminServiceOrderStatusAccept } from './admin-sevice-order-cancel-req-accept';
import { AdminServiceOrderStatusCancel } from './admin-sevice-order-cancel-req-cancel';
import { iAdminServiceOrder } from './service-order.type';

export function AdminServiceOrderView({
	order,
}: {
	order: iAdminServiceOrder;
}) {
	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			{/* Order Overview */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Order Overview</CardTitle>
							<CardDescription>
								Order ID: #{order.trxid || order.id}
							</CardDescription>

							<div className="space-y-1">
								<p className="text-sm text-muted-foreground flex items-center gap-2">
									<CreditCard className="h-4 w-4" />
									Amount
								</p>
								<p className="text-lg font-semibold">
									৳ {order.amount || '0.00'}
								</p>
							</div>
						</div>
						<div className="flex flex-col items-end gap-2">
							<div className="flex items-center gap-2">
								<p className="font-medium">
									{dateFormat(order.created_at)} at{' '}
									{timeFormat(order.created_at)}
								</p>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="data-[state=open]:bg-muted text-muted-foreground flex"
									>
										<span className="capitalize">{order.status}</span>
										<ChevronDown className="size-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-56">
									{order.status !== 'revision' && (
										<AdminServiceOrderCancelReq data={order} />
									)}

									{order.is_rejected === '1' && order.status !== 'canceled' && (
										<>
											<AdminServiceOrderStatusAccept data={order} />
											<AdminServiceOrderStatusCancel data={order} />
										</>
									)}

									<DropdownMenuSeparator />
									{order.status !== 'pending' && (
										<AdminServiceOrderStatus
											data={order}
											icon="Clock"
											status="pending"
											text="Pending"
										/>
									)}

									{order.status !== 'progress' && (
										<AdminServiceOrderStatus
											data={order}
											icon="Loader"
											status="progress"
											text="In Progress"
										/>
									)}

									{order.status !== 'delivered' && (
										<AdminServiceOrderStatus
											data={order}
											icon="Truck"
											status="delivered"
											text="Delivered"
										/>
									)}

									{order.status !== 'revision' && (
										<AdminServiceOrderStatus
											data={order}
											icon="RotateCcw"
											status="revision"
											text="Revision Requested"
										/>
									)}

									{order.status !== 'success' && (
										<AdminServiceOrderStatus
											data={order}
											icon="CheckCircle2"
											status="success"
											text="Service Completed Successfully"
										/>
									)}

									<DropdownMenuSeparator />

									{order.status !== 'cancel' && (
										<AdminServiceOrderStatus
											data={order}
											icon="XCircle"
											status="cancel"
											text="Service Cancelled"
											type="destructive"
										/>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
							{order.is_rejected === '1' && (
								<Badge variant="destructive" className="capitalize">
									Rejected
								</Badge>
							)}
						</div>
					</div>
				</CardHeader>
			</Card>

			{/* Customer & Vendor Information */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="h-5 w-5" />
							Customer Details
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{order.customerdetails ? (
							<>
								<div className="flex items-center gap-3">
									<Avatar>
										<AvatarImage
											src={order.customerdetails.image || undefined}
										/>
										<AvatarFallback>
											{order.customerdetails.name?.charAt(0).toUpperCase() ||
												'U'}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium">{order.customerdetails.name}</p>
										<p className="text-sm text-muted-foreground">
											{order.customerdetails.email}
										</p>
									</div>
								</div>
								<Separator />
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Phone:</span>
										<span className="font-medium">
											{order.customerdetails.number || 'N/A'}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">User ID:</span>
										<span className="font-medium">
											{order.customerdetails.uniqid || order.customerdetails.id}
										</span>
									</div>

									<div className="flex justify-between">
										<span className="text-muted-foreground">Role:</span>
										<Badge variant="outline" className="capitalize">
											{order.customerdetails.role_as || 'N/A'}
										</Badge>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Status:</span>
										<Badge
											variant={badgeFormat(order.customerdetails.status)}
											className="capitalize"
										>
											{order.customerdetails.status}
										</Badge>
									</div>
								</div>
							</>
						) : (
							<p className="text-muted-foreground text-sm">No customer data</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Store className="h-5 w-5" />
							Seller Details
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{order.vendor ? (
							<>
								<div className="flex items-center gap-3">
									<Avatar>
										<AvatarImage src={order.vendor.image || undefined} />
										<AvatarFallback>
											{order.vendor.name?.charAt(0).toUpperCase() || 'V'}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium">{order.vendor.name}</p>
										<p className="text-sm text-muted-foreground">
											{order.vendor.email}
										</p>
									</div>
								</div>
								<Separator />
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Phone:</span>
										<span className="font-medium">
											{order.vendor.number || 'N/A'}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Vendor ID:</span>
										<span className="font-medium">
											{order.vendor.uniqid || order.vendor.id}
										</span>
									</div>

									<div className="flex justify-between">
										<span className="text-muted-foreground">Role:</span>
										<Badge variant="outline" className="capitalize">
											{order.vendor.role_as || 'N/A'}
										</Badge>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Status:</span>
										<Badge
											variant={badgeFormat(order.vendor.status)}
											className="capitalize"
										>
											{order.vendor.status}
										</Badge>
									</div>
								</div>
							</>
						) : (
							<p className="text-muted-foreground text-sm">No vendor data</p>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Service Information */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Package className="h-5 w-5" />
						Service Information
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									Service Title:
								</span>
								<span className="text-sm font-medium">
									{order.servicedetails?.title || 'N/A'}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									Service ID:
								</span>
								<span className="text-sm font-medium">
									{order.vendor_service_id || 'N/A'}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									Package ID:
								</span>
								<span className="text-sm font-medium">
									{order.service_package_id || 'N/A'}
								</span>
							</div>
						</div>
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									Commission Type:
								</span>
								<Badge variant="outline" className="capitalize">
									{order.commission_type || 'N/A'}
								</Badge>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									Commission Amount:
								</span>
								<span className="text-sm font-medium">
									৳ {order.commission_amount || '0.00'}
								</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Order Details */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<FileText className="h-5 w-5" />
						Order Details
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<p className="text-sm text-muted-foreground mb-2">
							Customer Requirements / Message:
						</p>
						<div className="rounded-lg border bg-muted/40 p-4">
							<p className="text-sm whitespace-pre-wrap">
								{order.details || 'No details provided'}
							</p>
						</div>

						<div></div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
