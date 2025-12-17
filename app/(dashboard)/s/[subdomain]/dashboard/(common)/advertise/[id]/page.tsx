'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { badgeFormat, env } from '@/lib';
import { useVendorAdvertiseViewQuery } from '@/store/features/vendor/advertise';
import {
	AlertCircleIcon,
	Box,
	Download,
	Home,
	MapPin,
	Pickaxe,
	Truck,
	User,
	Waypoints,
} from 'lucide-react';
import { useParams } from 'next/navigation';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Advertise', path: '/advertise' },
	{ name: 'Advertise Details' },
];
const tabs = [
	{
		name: 'Main',
		value: 'Main',
		icon: Home,
	},
	{
		name: 'Audience',
		value: 'Audience',
		icon: User,
	},
	{
		name: 'Location',
		value: 'Location',
		icon: MapPin,
	},
	{
		name: 'Placement',
		value: 'Placement',
		icon: Box,
	},
	{
		name: 'Create-Ad',
		value: 'Create-Ad',
		icon: Pickaxe,
	},
	{
		name: 'Others',
		value: 'Others',
		icon: Waypoints,
	},
	{
		name: 'Delivery',
		value: 'Delivery',
		icon: Truck,
	},
];

export default function Page() {
	const { id } = useParams();
	const { data, isLoading, isError } = useVendorAdvertiseViewQuery(
		{ id: id?.toString() || '' },
		{ skip: !id }
	);

	const resultObject: { [key: string]: any } = {};
	if (data) {
		for (const item of data?.message?.placements) {
			const key = Object?.keys(item)[0];
			const value = item[key];
			resultObject[key] = value;
		}
	}
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<CardTitle>Advertise Details</CardTitle>
							{data?.message?.status && (
								<Badge
									className="capitalize"
									variant={badgeFormat(data?.message?.status || '--')}
								>
									{data?.message?.status || '--'}
								</Badge>
							)}
						</div>
					</div>
				}
			>
				<div className="space-y-4">
					{data?.message?.status === 'cancel' && (
						<Alert variant="destructive" className="max-w-5xl">
							<AlertCircleIcon />
							<AlertTitle>Cancel Advertise Order Reason:</AlertTitle>
							<AlertDescription>
								<p>{data?.message?.reason || '--'}</p>
							</AlertDescription>
						</Alert>
					)}

					<div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4 border rounded-lg ">
						<div className="space-y-1 text-center py-2">
							<h3 className="text-base font-bold">Campaign Name</h3>
							<p>{data?.message?.campaign_name || '--'}</p>
						</div>
						<div className="space-y-1 text-center py-2">
							<h3 className="text-base font-bold">Budget Amount</h3>
							<p>{data?.message?.budget || '--'}</p>
						</div>
						<div className="space-y-1 text-center py-2">
							<h3 className="text-base font-bold">Campaign Start Date</h3>
							<p>{data?.message?.start_date || '--'}</p>
						</div>
						<div className="space-y-1 text-center py-2">
							<h3 className="text-base font-bold">Campaign End Date</h3>
							<p>{data?.message?.end_date || '--'}</p>
						</div>
						<div className="space-y-1 text-center py-2">
							<h3 className="text-base font-bold">Status</h3>
							<Badge
								className="capitalize"
								variant={badgeFormat(data?.message?.status || '--')}
							>
								{data?.message?.status || '--'}
							</Badge>
						</div>
					</div>
					<Card>
						<CardContent>
							<Tabs
								orientation="vertical"
								defaultValue={tabs[0].value}
								className="w-full flex flex-col lg:flex-row items-start gap-4 justify-center"
							>
								<TabsList className="shrink-0 flex flex-wrap  h-full lg:grid  lg:grid-cols-1 gap-1 p-0 bg-background">
									{tabs.map((tab) => (
										<TabsTrigger
											key={tab.value}
											value={tab.value}
											className="data-[state=active]:bg-primary w-fit lg:w-full  data-[state=active]:text-primary-foreground justify-start px-3 py-1.5"
										>
											<tab.icon className="h-5 w-5 me-2" /> {tab.name}
										</TabsTrigger>
									))}
								</TabsList>
								<div className="h-full min-h-72 p-4 w-full border rounded-md ">
									<TabsContent value="Main" className="space-y-4">
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Campaign objective:
											</p>
											<p>{data?.message?.campaign_objective || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Budget:
											</p>
											<p>{data?.message?.budget || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Budget Amount:
											</p>
											<p>{data?.message?.budget_amount || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Conversion Location:
											</p>
											<p>{data?.message?.conversion_location || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Performance Goal:
											</p>
											<p>{data?.message?.performance_goal || '--'}</p>
										</div>
									</TabsContent>
									<TabsContent value="Audience" className="space-y-4">
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Age From:
											</p>
											<p>{data?.message?.age || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Age to:
											</p>
											<p>{data?.message?.ageto || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Gender:
											</p>
											<p>{data?.message?.gender || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Detail Targeting:
											</p>
											<p>{data?.message?.detail_targeting || '--'}</p>
										</div>
										<div>
											<h3 className="text-xl font-semibold">Location Files</h3>
											<div className="flex gap-2">
												{data?.message?.advertise_audience_file?.map(
													(item: any, index: number) => (
														<img
															key={index}
															src={
																item.file
																	? `${env.baseAPI}/${item.file}`
																	: '/placeholder.svg'
															}
															alt=""
															width={100}
															height={100}
														/>
													)
												)}
											</div>
										</div>
									</TabsContent>
									<TabsContent value="Location" className="space-y-4">
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Country:
											</p>
											<p>{data?.message?.country || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												City:
											</p>
											{data?.message?.city?.map((item: any, index: number) => (
												<p key={index}>{item},</p>
											))}
										</div>
										<div>
											<h3 className="text-xl font-semibold">Location Files</h3>
											<div className="flex gap-2">
												{data?.message?.advertise_location_files?.map(
													(item: any, index: number) => (
														<img
															key={index}
															src={
																item?.file
																	? `${env.baseAPI}/${item?.file}`
																	: '/placeholder.svg'
															}
															alt=""
															width={100}
															height={100}
														/>
													)
												)}
											</div>
										</div>
									</TabsContent>
									<TabsContent value="Placement" className="space-y-4">
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Devices:
											</p>
											<p>{data?.message?.device || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Platform:
											</p>
											{data?.message?.platform?.map(
												(item: any, index: number) => (
													<p key={index}>{item},</p>
												)
											)}
										</div>
										<h2 className="text-xl font-semibold">Placements</h2>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Feeds:
											</p>
											{resultObject?.feeds?.map((item: any, index: number) => (
												<p key={index}>{item},</p>
											))}
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Story Reels:
											</p>
											{resultObject?.story_reels?.map(
												(item: any, index: number) => (
													<p key={index}>{item},</p>
												)
											)}
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Adds Video And Reels:
											</p>
											{resultObject?.adds_video_and_reels?.map(
												(item: any, index: number) => (
													<p key={index}>{item},</p>
												)
											)}
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Search Result:
											</p>
											{resultObject?.search_result?.map(
												(item: any, index: number) => (
													<p key={index}>{item},</p>
												)
											)}
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Messages:
											</p>
											{resultObject?.messages?.map(
												(item: any, index: number) => (
													<p key={index}>{item},</p>
												)
											)}
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Apps and Sites:
											</p>
											{resultObject?.apps_and_sites?.map(
												(item: any, index: number) => (
													<p key={index}>{item},</p>
												)
											)}
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Inventory
											</p>
											<p>{data?.message?.inventory || '--'}</p>
										</div>
									</TabsContent>
									<TabsContent value="Create-Ad" className="space-y-4">
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Conversion Location:
											</p>
											<p>{data?.message?.country || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Platform
											</p>
											{data?.message?.platform?.map(
												(item: any, index: number) => (
													<p key={index}>{item},</p>
												)
											)}
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Format:
											</p>
											<p>{data?.message?.format || '--'}</p>
										</div>

										{data?.message?.format === 'Existing Add'
											? data?.message?.ad_creative?.map(
													(placement: any, index: number) => {
														return (
															<div key={index}>
																<h2 className="text-xl font-semibold">
																	Adds info
																</h2>
																<div className="flex gap-2">
																	<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
																		Post Id:
																	</p>
																	<p>{placement?.postid || '--'}</p>
																</div>
															</div>
														);
													}
											  )
											: data?.message?.ad_creative?.map(
													(placement: any, index: number) => {
														return (
															<div key={index} className="space-y-4">
																<div className="flex gap-2">
																	<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
																		Primary Text
																	</p>
																	<p>{placement?.primary_text || '--'}</p>
																</div>
																<div className="flex gap-2">
																	<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
																		Media
																	</p>
																	<p>{placement?.media || '--'}</p>
																</div>
																<div className="flex gap-2">
																	<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
																		Heading
																	</p>
																	<p>{placement?.heading || '--'}</p>
																</div>
																<div className="flex gap-2">
																	<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
																		Description
																	</p>
																	<p>{placement?.description || '--'}</p>
																</div>
																<div className="flex gap-2">
																	<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
																		Call To Action
																	</p>
																	<p>{placement?.call_to_action || '--'}</p>
																</div>
															</div>
														);
													}
											  )}
									</TabsContent>
									<TabsContent value="Others" className="space-y-4">
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Destination:
											</p>
											<p>{data?.message?.destination || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Tracking:
											</p>
											<p>{data?.message?.tracking || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												URL perimeter:
											</p>
											<p>{data?.message?.url_perimeter || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Number:
											</p>
											<p>{data?.message?.number || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Description :
											</p>
											<p>{data?.message?.last_description || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Transition Id:
											</p>
											<p>{data?.message?.trxid || '--'}</p>
										</div>
									</TabsContent>
									<TabsContent value="User" className="space-y-4">
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												User Id:
											</p>
											<p>{data?.message?.user?.id || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												User Name:
											</p>
											<p>{data?.message?.user?.name || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Number:
											</p>
											<p>{data?.message?.user?.name || '--'}</p>
										</div>
										<div className="flex gap-2">
											<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
												Email:
											</p>
											<p>{data?.message?.user?.email || '--'}</p>
										</div>
									</TabsContent>

									<TabsContent value="Delivery" className="space-y-4">
										{data?.message?.status === 'delivered' ? (
											<>
												<div className="flex gap-2">
													<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
														Delivery Status:
													</p>
													<Badge variant={'success'}>
														{data?.message?.status}
													</Badge>
												</div>
												<div className="space-y-2">
													<p className="font-semibold max-w-[120px] md:max-w-[200px] w-full">
														Files:
													</p>
													<div className="flex flex-wrap gap-4">
														{data?.message?.files?.map(
															(item: any, index: number) => {
																const fileUrl = `${env.baseAPI}/${item.name}`;
																return (
																	<div
																		key={index}
																		className="flex flex-col gap-2"
																	>
																		<img
																			src={fileUrl}
																			alt={`Delivered file ${index + 1}`}
																			width={120}
																			height={120}
																			className="rounded border object-cover"
																		/>
																		<Button
																			asChild
																			variant="outline"
																			size="sm"
																			className="w-full"
																		>
																			<a
																				href={fileUrl}
																				download
																				target="_blank"
																				rel="noreferrer"
																			>
																				<Download className="h-4 w-4 mr-2" />
																				Download
																			</a>
																		</Button>
																	</div>
																);
															}
														)}
													</div>
												</div>
											</>
										) : (
											<>
												<p className="flex gap-2 text-yellow-600">
													Delivery is not completed.
												</p>
											</>
										)}
									</TabsContent>
								</div>
							</Tabs>
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}
