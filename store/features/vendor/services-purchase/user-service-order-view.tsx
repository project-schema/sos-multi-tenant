'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { badgeFormat, dateFormat, env, timeFormat } from '@/lib';
import { CreditCard, FileText, Package, Store } from 'lucide-react';
import Image from 'next/image';
import { ServiceRatingCard } from './service-ratting-card';
import { ServiceRatingForm } from './service-ratting-form';
import { UserDeliverySuccess } from './user-delivery-success';
import { UserRevisionSend } from './user-revision-send';

export function UserServiceOrderView({ order }: { order: any }) {
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
							<Badge variant={badgeFormat(order.status)} className="capitalize">
								{order.status}
							</Badge>
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
						</div>
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
							</>
						) : (
							<p className="text-muted-foreground text-sm">No vendor data</p>
						)}
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

						<div></div>
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
								{order.orderdelivery.map((delivery: any) => (
									<div key={delivery.id} className="border rounded-lg p-4">
										<p className="text-sm mb-2">
											Delivered on:{' '}
											<span className="text-muted-foreground">
												{timeFormat(delivery.created_at)}
											</span>
										</p>
										<p className="text-sm"> {delivery.description}</p>
										{delivery.deliveryfiles.length > 0 && (
											<div className="mt-2">
												<p className="text-sm text-muted-foreground mb-2">
													Delivery Attachments:
												</p>

												<div className="flex flex-wrap gap-2">
													{delivery.deliveryfiles?.map((file: any) => (
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

			{order.status === 'delivered' && (
				<div className="flex items-center justify-end gap-2">
					<UserRevisionSend data={order} />
					<UserDeliverySuccess data={order} />
				</div>
			)}
			{order.status === 'success' && !order.servicerating && (
				<ServiceRatingForm data={order} />
			)}
			{order.status === 'success' && order.servicerating && (
				<ServiceRatingCard data={order} />
			)}
		</div>
	);
}
