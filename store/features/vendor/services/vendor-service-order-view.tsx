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
import { badgeFormat, dateFormat, env, timeFormat } from '@/lib';
import { ChevronDown, CreditCard, FileText, Package, User } from 'lucide-react';
import Image from 'next/image';
import { iAdminServiceOrder } from '../../admin/service';
import { ServiceRatingCard } from '../../user/service/service-ratting-card';
import { VendorServiceDelivery } from './vendor-service-delevery';
import { VendorServiceOrderStatus } from './vendor-service-order-status';

export function VendorServiceOrderView({
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
									{/* {order.status !== 'revision' && (
										<AdminServiceOrderCancelReq data={order} />
									)} */}

									{(order as any).is_rejected === '1' &&
										order.status !== 'canceled' && (
											<>
												{/* <VendorServiceOrderStatusAccept data={order} /> */}
												{/* <VendorServiceOrderStatusCancel data={order} /> */}
											</>
										)}

									{/* {order.status !== 'pending' && (
										<VendorServiceOrderStatus
											data={order}
											icon="Clock"
											status="pending"
											text="Pending"
										/>
									)} */}

									{order.status === 'pending' && (
										<VendorServiceOrderStatus
											data={order}
											icon="Loader"
											status="progress"
											text="In Progress"
										/>
									)}

									{(order.status === 'progress' ||
										order.status === 'revision') && (
										<VendorServiceDelivery order={order} />
									)}

									{/* {order.status !== 'revision' && (
										<VendorServiceOrderStatus
											data={order}
											icon="RotateCcw"
											status="revision"
											text="Revision Requested"
										/>
									)} */}

									{/* {order.status !== 'success' && (
										<VendorServiceOrderStatus
											data={order}
											icon="CheckCircle2"
											status="success"
											text="Service Completed Successfully"
										/>
									)} */}
									{order.status !== 'delivered' && <DropdownMenuSeparator />}

									{order.status !== 'cancel' && (
										<VendorServiceOrderStatus
											data={order}
											icon="XCircle"
											status="cancel"
											text="Service Cancelled"
											type="destructive"
										/>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
							<div className="flex items-center gap-2">
								<p className="font-medium">
									{dateFormat(order.created_at)} at{' '}
									{timeFormat(order.created_at)}
								</p>
							</div>

							{(order as any).is_rejected === '1' && (
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
							<Package className="h-5 w-5" />
							Service Information
						</CardTitle>
					</CardHeader>
					<CardContent>
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
									{(order as any).vendor_service_id || 'N/A'}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									Package ID:
								</span>
								<span className="text-sm font-medium">
									{(order as any).service_package_id || 'N/A'}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									Commission Type:
								</span>
								<Badge variant="outline" className="capitalize">
									{(order as any).commission_type || 'N/A'}
								</Badge>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									Commission Amount:
								</span>
								<span className="text-sm font-medium">
									৳ {(order as any).commission_amount || '0.00'}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Service Information */}

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
					</div>
					<div>
						<p className="text-sm text-muted-foreground mb-2">Attachments:</p>
						<div className="flex flex-wrap gap-2">
							{order.files?.map((file) => (
								<div key={file.id} className="border rounded-md p-2">
									<Image
										src={`${env.baseAPI}/${file.name}`}
										alt={file.name}
										width={100}
										height={100}
										unoptimized
										className="rounded-sm"
									/>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
			{/* Delivery Details */}
			{order.orderdelivery?.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-5 w-5" />
							Delivery Details
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{order.orderdelivery?.length === 0 ? (
							<p className="text-sm text-muted-foreground">
								No delivery found.
							</p>
						) : (
							<div className="space-y-2">
								{order.orderdelivery?.map((delivery) => (
									<div key={delivery.id} className="border rounded-lg p-4">
										<p className="text-sm mb-2">
											Delivered on:{' '}
											<span className="text-muted-foreground">
												{timeFormat(delivery.created_at)}
											</span>
										</p>

										<p className="text-sm"> {delivery.description}</p>

										{delivery.deliveryfiles?.length > 0 && (
											<div className="mt-2">
												<p className="text-sm text-muted-foreground mb-2">
													Delivery Attachments:
												</p>

												<div className="flex flex-wrap gap-2">
													{delivery.deliveryfiles?.map((file) => (
														<div
															key={file.id}
															className="border rounded-md p-2"
														>
															<Image
																src={`${env.baseAPI}/${file.files}`}
																alt={file.files}
																width={100}
																height={100}
																unoptimized
																className="rounded-sm"
															/>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			)}

			{order.status === 'success' && order.servicerating && (
				<ServiceRatingCard data={order} />
			)}
		</div>
	);
}
