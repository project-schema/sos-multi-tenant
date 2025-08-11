'use client';
import { Loader2 } from '@/components/dashboard';
import { SearchableSelect } from '@/components/dashboard/form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { MultiImageUpload } from '@/components/ui/image-upload-multiple';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { calculateBudgetWidthTimeDifference, cn } from '@/lib';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { skipToken } from '@reduxjs/toolkit/query';
import { format } from 'date-fns';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { useFrontendGetDollarRateQuery } from '../frontend-api-slice';
import {
	useFrontendAdvDyDataQuery,
	useFrontendCampaignConversionLocationQuery,
	useFrontendCampaignPerformanceGoalQuery,
	useFrontendCityQuery,
	useFrontendCountryQuery,
	useFrontendCreateAdvertiseMutation,
} from './advertiser-form-api-slice';
import {
	L2_RequitedField,
	level2Format,
	level2SubmitFormat,
	nextStep,
	prevStep,
	updateLevel2,
} from './advertiser-form-slice';
//  Zod Schema
const optionSchema = z.object({
	label: z.string().min(1, 'Label is required'),
	value: z.string().min(1, 'Value is required'),
});
const schema = z.object({
	campaign_name: z
		.string({ error: 'Campaign name is required' })
		.trim()
		.min(1, 'Campaign name is required'),
	age: z
		.string({ error: 'Age From is required' })
		.trim()
		.min(1, 'Age from  is required'),
	ageto: z
		.string({ error: 'Age to is required' })
		.trim()
		.min(1, 'Age to is required'),
	country: z
		.string({ error: 'Country name is required' })
		.trim()
		.min(1, 'Country name is required'),
	city: z.array(optionSchema).min(1, 'At least one city is required'),

	platform: z.array(optionSchema).min(1, 'At least one platform is required'),

	feeds: z.array(optionSchema).min(1, 'At least one feed is required'),

	story_reels: z
		.array(optionSchema)
		.min(1, 'At least one story reels is required'),

	adds_video_and_reels: z
		.array(optionSchema)
		.min(1, 'At least one adds video and reels is required'),

	search_result: z
		.array(optionSchema)
		.min(1, 'At least one search result is required'),

	messages: z.array(optionSchema).min(1, 'At least one messages is required'),

	apps_and_sites: z
		.array(optionSchema)
		.min(1, 'At least one apps and sites is required'),

	device: z.array(optionSchema).min(1, 'At least one device is required'),

	conversion_location: z
		.string({ error: 'Conversion location is required' })
		.trim()
		.min(1, 'Conversion location is required'),

	performance_goal: z
		.string({ error: 'Conversion location is required' })
		.trim()
		.min(1, 'Conversion location is required'),

	budget: z.enum(['Daily Budget', 'Lifetime Budget'], {
		message: 'Budget is required',
	}),
	budget_amount: z
		.number({ error: 'Amount is required' })
		.min(0, { message: 'Amount must be at least 0' })
		.max(1000000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Amount must be a number',
		}),

	start_date: z.date({ error: 'Start Date is required' }),
	end_date: z.date({ error: 'End Date is required' }),

	gender: z.enum(['Male', 'Female', 'All'], {
		message: 'Gender is required',
	}),

	inventory: z.enum(
		['Expanded Inventory', 'Moderate Inventory', 'Limited Inventory'],
		{
			message: 'Inventory is required',
		}
	),

	detail_targeting: z
		.string({ error: 'Detail Targeting is required' })
		.trim()
		.min(1, 'Detail Targeting is required')
		.max(1000, 'Too long'),

	location_files: z
		.array(
			z
				.instanceof(File)
				.refine((file) => file.size > 0, { message: 'Empty file detected' })
		)
		.min(1, { message: 'At least one image is required' }),
	advertise_audience_files: z
		.array(
			z
				.instanceof(File)
				.refine((file) => file.size > 0, { message: 'Empty file detected' })
		)
		.min(1, { message: 'At least one image is required' }),
});

type ZodType = z.infer<typeof schema>;

export function AdvertiserFormTab2() {
	const { data: dollarRate } = useFrontendGetDollarRateQuery(undefined);
	const [store, { isLoading: storeLoading }] =
		useFrontendCreateAdvertiseMutation();
	const dispatch = useAppDispatch();
	const level2 = useAppSelector((state) => state.advertiseForm.level2);

	const [country, setCountry] = useState<string>('');
	const selected = useAppSelector((state) => state.advertiseForm.level1?.id);
	const { data: countries, isLoading: loadingCountries } =
		useFrontendCountryQuery(undefined);
	const {
		data: cities,
		isLoading: loadingCities,
		isFetching,
	} = useFrontendCityQuery(
		{
			id: country,
		},
		{
			skip: !country,
			refetchOnFocus: false,
		}
	);

	const { data: AudData, isLoading: loadAud } = useFrontendAdvDyDataQuery({
		api: 'audience_age',
	});

	const { data: devData, isLoading: loadDev } = useFrontendAdvDyDataQuery({
		api: 'device',
	});

	const { data: platData, isLoading: loadPlat } = useFrontendAdvDyDataQuery({
		api: 'platform',
	});

	const { data: ageToData, isLoading: loadAgeTo } = useFrontendAdvDyDataQuery({
		api: 'audience_age_to',
	});

	const { data: feedData, isLoading: feedLoad } = useFrontendAdvDyDataQuery({
		api: 'feed',
	});

	const { data: storyData, isLoading: storyLoad } = useFrontendAdvDyDataQuery({
		api: 'store_reel',
	});
	const { data: vidData, isLoading: vidLoad } = useFrontendAdvDyDataQuery({
		api: 'video_reel',
	});

	const { data: searData, isLoading: searLoad } = useFrontendAdvDyDataQuery({
		api: 'search_reel',
	});

	const { data: mesData, isLoading: mesLoad } = useFrontendAdvDyDataQuery({
		api: 'messages_reel',
	});

	const { data: appData, isLoading: loadApp } = useFrontendAdvDyDataQuery({
		api: 'apps_web',
	});

	const { data: performanceGoals, isLoading: loadingGoals } =
		useFrontendCampaignPerformanceGoalQuery(
			selected !== undefined ? { id: selected } : skipToken,
			{
				skip: !selected,
			}
		);

	const { data: conversionLocations, isLoading: loadingConversions } =
		useFrontendCampaignConversionLocationQuery(
			selected !== undefined ? { id: selected } : skipToken,
			{
				skip: !selected,
			}
		);
	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			campaign_name: '',
			age: '',
			ageto: '',
			conversion_location: '',
			performance_goal: '',
			budget: 'Daily Budget',
			gender: 'All',
			detail_targeting: '',
			budget_amount: 0,
			start_date: new Date(),
			end_date: new Date(),
			country: '',
			city: [],
			platform: [],
			device: [],
			adds_video_and_reels: [],
			story_reels: [],
			messages: [],
			apps_and_sites: [],
			feeds: [],
			search_result: [],
			advertise_audience_files: [],
			location_files: [],
			inventory: 'Expanded Inventory',
		},
	});

	const conversion_location = form.watch('conversion_location');
	const performance_goal = form.watch('performance_goal');

	useEffect(() => {
		if (
			conversionLocations?.message &&
			conversionLocations?.message?.length > 0 &&
			!conversion_location
		) {
			form.setValue(
				'conversion_location',
				conversionLocations?.message[0]?.name
			);
		}

		if (
			performanceGoals?.message &&
			performanceGoals?.message?.length > 0 &&
			!performance_goal
		) {
			form.setValue('performance_goal', performanceGoals?.message[0]?.name);
		}
	}, [
		conversionLocations?.message?.[0]?.name,
		performanceGoals?.message?.[0]?.name,
	]);

	useEffect(() => {
		if (level2.start_date && level2.end_date) {
			form.reset({
				...level2,
				start_date: new Date(level2?.start_date),
				end_date: new Date(level2?.end_date),
			});
		}
	}, []);

	if (!selected) return null;

	const onSubmit = async (data: ZodType) => {
		const formedData = level2Format(data);
		try {
			const response = await store(level2SubmitFormat(formedData)).unwrap();
			if (response?.message === 'Validation errors') {
				Object.entries(response?.data).forEach(([field, value]) => {
					if (L2_RequitedField.includes(field)) {
						form.setError(field as keyof ZodType, {
							type: 'server',
							message: Array.isArray(value) ? value[0] : value,
						});
						return toast.error('Please fill all the required fields');
					}
				});
			}
			dispatch(
				updateLevel2({
					...data,
					start_date: formValue?.start_date?.toLocaleDateString(),
					end_date: formValue?.end_date?.toLocaleDateString(),
				})
			);
			dispatch(nextStep());
		} catch (error: any) {
			toast.error(error?.message || 'Something went wrong');
		}
	};
	const formValue = form.getValues();
	const watchValue = form.watch();

	return (
		<div className="max-w-lg mx-auto mb-10">
			<Form {...form}>
				<form
					className="space-y-10 mt-4"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{/* Campaign Name  */}
					<FormField
						control={form.control}
						name="campaign_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className={cn('text-lg font-semibold')}>
									Campaign Name
								</FormLabel>
								<FormControl>
									<Input placeholder="Type..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Conversion Location</h3>
						<FormField
							control={form.control}
							name="conversion_location"
							render={({ field }) => (
								<>
									{loadingConversions || !conversionLocations ? (
										<Loader2 />
									) : (
										<RadioGroup
											onValueChange={field.onChange}
											value={field.value}
											className="space-y-2"
										>
											{conversionLocations?.message?.map((item) => (
												<Label
													key={item.id}
													className={cn(
														'hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950 mt-0'
													)}
												>
													<RadioGroupItem
														value={item.name}
														className="border-blue-500"
													/>
													<div className="grid gap-1.5 font-normal">
														<p className="text-sm leading-none font-medium">
															{item.name}
														</p>
													</div>
												</Label>
											))}
										</RadioGroup>
									)}
								</>
							)}
						/>
					</div>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Performance Goal</h3>

						<FormField
							control={form.control}
							name="performance_goal"
							render={({ field }) => (
								<>
									{loadingGoals || !performanceGoals ? (
										<Loader2 />
									) : (
										<RadioGroup
											onValueChange={field.onChange}
											value={field.value}
											className="space-y-2"
										>
											{performanceGoals?.message?.map((item) => (
												<Label
													key={item.id}
													className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950"
												>
													<RadioGroupItem
														value={item.name}
														id={`goal-${item.id}`}
														className=" border-blue-600"
													/>
													<div className="grid gap-1.5 font-normal">
														<p className="text-sm leading-none font-medium">
															{item.name}
														</p>
													</div>
												</Label>
											))}
										</RadioGroup>
									)}
								</>
							)}
						/>
					</div>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Platforms</h3>
						<FormField
							control={form.control}
							name="budget"
							render={({ field }) => (
								<RadioGroup
									onValueChange={field.onChange}
									value={field.value}
									className="grid grid-cols-1 md:grid-cols-2 gap-2"
								>
									<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950">
										<RadioGroupItem
											value={'Daily Budget'}
											id={`DailyBudget`}
											className=" border-blue-600"
										/>
										<div className="grid gap-1.5 font-normal">
											<p className="text-sm leading-none font-medium">
												Daily Budget
											</p>
										</div>
									</Label>
									<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950">
										<RadioGroupItem
											value={'Lifetime Budget'}
											id={`DailyBudget`}
											className=" border-blue-600"
										/>
										<div className="grid gap-1.5 font-normal">
											<p className="text-sm leading-none font-medium">
												Lifetime Budget
											</p>
										</div>
									</Label>
								</RadioGroup>
							)}
						/>
						<FormField
							control={form.control}
							name="budget_amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Budget Amount</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Enter amount"
											{...field}
											onChange={(e) =>
												field.onChange(e.target.valueAsNumber || '')
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="start_date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Start Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													className={cn(
														'w-full pl-3 justify-start text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{field.value
														? format(field.value, 'dd-MM-yyyy')
														: 'Pick a date'}
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="end_date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>End Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													className={cn(
														'w-full pl-3 justify-start text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{field.value
														? format(field.value, 'dd-MM-yyyy')
														: 'Pick a date'}
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<p className="font-medium text-blue-500">
							Total Cost:{' '}
							{calculateBudgetWidthTimeDifference({
								budget: watchValue.budget_amount,
								date1: watchValue.start_date,
								date2: watchValue.end_date,
								dollarRate: dollarRate?.message?.amount || 0,
								type: watchValue.budget,
							})}
						</p>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Audience</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							<FormField
								name="age"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Age From</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue
														placeholder={loadAud ? 'Loading...' : 'Select Age'}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{AudData?.message &&
													AudData?.message?.map(
														(item: { id: number; audience_age: string }) => {
															return (
																<SelectItem
																	key={item?.id}
																	value={item?.audience_age}
																>
																	{item?.audience_age}
																</SelectItem>
															);
														}
													)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="ageto"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Age To</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue
														placeholder={
															loadAgeTo ? 'Loading...' : 'Select Age'
														}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{ageToData?.message &&
													ageToData?.message?.map(
														(item: { id: number; audience_age_to: string }) => {
															return (
																<SelectItem
																	key={item?.id}
																	value={item?.audience_age_to}
																>
																	{item?.audience_age_to}
																</SelectItem>
															);
														}
													)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Gender</h3>
						<div>
							<FormField
								control={form.control}
								name="gender"
								render={({ field }) => (
									<RadioGroup
										onValueChange={field.onChange}
										value={field.value}
										className="grid  grid-cols-3 gap-2"
									>
										<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950">
											<RadioGroupItem
												value={'Male'}
												id={`Gender-Male`}
												className=" border-blue-600"
											/>
											<div className="grid gap-1.5 font-normal">
												<p className="text-sm leading-none font-medium">Male</p>
											</div>
										</Label>
										<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950">
											<RadioGroupItem
												value={'Female'}
												id={`Gender-Female`}
												className=" border-blue-600"
											/>
											<div className="grid gap-1.5 font-normal">
												<p className="text-sm leading-none font-medium">
													Female
												</p>
											</div>
										</Label>
										<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950">
											<RadioGroupItem
												value={'All'}
												id={`Gender-All`}
												className=" border-blue-600"
											/>
											<div className="grid gap-1.5 font-normal">
												<p className="text-sm leading-none font-medium">All</p>
											</div>
										</Label>
									</RadioGroup>
								)}
							/>
						</div>
						<div>
							<FormField
								control={form.control}
								name="detail_targeting"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Detail Targeting </FormLabel>
										<FormControl>
											<Textarea placeholder="Type here..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="advertise_audience_files"
							render={({ field }) => (
								<FormItem>
									<MultiImageUpload
										label="Detail Targeting  Image"
										value={field.value}
										onChange={field.onChange}
									/>
								</FormItem>
							)}
						/>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Location</h3>
						<div className="space-y-4">
							{loadingCountries ? (
								<Loader2 />
							) : (
								<FormField
									control={form.control}
									name="country"
									render={({ field }) => (
										<SearchableSelect
											field={field}
											label="Country"
											onSelectorClick={(value) => {
												setCountry(value?.id);
												form.setValue('city', []);
											}}
											options={
												countries?.map((item) => ({
													label: item?.name,
													value: item?.name,
													id: item?.id,
												})) || []
											}
											placeholder={'Select...'}
										/>
									)}
								/>
							)}
							{loadingCities || isFetching ? (
								<Loader2 />
							) : (
								<FormField
									name="city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>City</FormLabel>
											{cities?.length === 0 ? (
												<div className="text-sm text-muted-foreground">
													No city found
												</div>
											) : (
												<FormControl>
													<MultiSelect
														options={
															cities?.map((item) => ({
																label: item?.name,
																value: item?.name.toString(),
															})) || []
														}
														value={field.value || []}
														onChange={(value) => {
															field.onChange(value);
														}}
														placeholder="Select..."
													/>
												</FormControl>
											)}
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</div>
						<FormField
							control={form.control}
							name="location_files"
							render={({ field }) => (
								<FormItem>
									<MultiImageUpload
										label="Add Image"
										value={field.value}
										onChange={field.onChange}
									/>
								</FormItem>
							)}
						/>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Placement</h3>
						<div className="space-y-4">
							{loadDev ? (
								<Loader2 />
							) : (
								<FormField
									name="device"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Device</FormLabel>
											<FormControl>
												<MultiSelect
													options={
														devData?.message?.map((item: any) => ({
															label: item?.device,
															value: item?.device,
														})) || []
													}
													value={field.value || []}
													onChange={field.onChange}
													placeholder="Select..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							{loadPlat ? (
								<Loader2 />
							) : (
								<FormField
									name="platform"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Platform</FormLabel>
											<FormControl>
												<MultiSelect
													options={
														platData?.message?.map((item: any) => ({
															label: item?.platform,
															value: item?.platform,
														})) || []
													}
													value={field.value || []}
													onChange={field.onChange}
													placeholder="Select..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Placements</h3>
						<div className="space-y-4">
							{feedLoad ? (
								<Loader2 />
							) : (
								<FormField
									name="feeds"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Feeds</FormLabel>
											<FormControl>
												<MultiSelect
													options={
														feedData?.message?.map((item: any) => ({
															label: item?.feed,
															value: item?.feed,
														})) || []
													}
													value={field.value || []}
													onChange={field.onChange}
													placeholder="Select..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							{storyLoad ? (
								<Loader2 />
							) : (
								<FormField
									name="story_reels"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Stories & Reels</FormLabel>
											<FormControl>
												<MultiSelect
													options={
														storyData?.message?.map((item: any) => ({
															label: item?.store_reel,
															value: item?.store_reel,
														})) || []
													}
													value={field.value || []}
													onChange={field.onChange}
													placeholder="Select..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							{vidLoad ? (
								<Loader2 />
							) : (
								<FormField
									name="adds_video_and_reels"
									render={({ field }) => (
										<FormItem>
											<FormLabel>In-stream ads videos & reels</FormLabel>
											<FormControl>
												<MultiSelect
													options={
														vidData?.message?.map((item: any) => ({
															label: item?.video_reel,
															value: item?.video_reel,
														})) || []
													}
													value={field.value || []}
													onChange={field.onChange}
													placeholder="Select..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							{searLoad ? (
								<Loader2 />
							) : (
								<FormField
									name="search_result"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Search Result</FormLabel>
											<FormControl>
												<MultiSelect
													options={
														searData?.message?.map((item: any) => ({
															label: item?.search_reel,
															value: item?.search_reel,
														})) || []
													}
													value={field.value || []}
													onChange={field.onChange}
													placeholder="Select..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							{mesLoad ? (
								<Loader2 />
							) : (
								<FormField
									name="messages"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Messages</FormLabel>
											<FormControl>
												<MultiSelect
													options={
														mesData?.message?.map((item: any) => ({
															label: item?.messages_reel,
															value: item?.messages_reel,
														})) || []
													}
													value={field.value || []}
													onChange={field.onChange}
													placeholder="Select..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							{loadApp ? (
								<Loader2 />
							) : (
								<FormField
									name="apps_and_sites"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Apps & Sites</FormLabel>
											<FormControl>
												<MultiSelect
													options={
														appData?.message?.map((item: any) => ({
															label: item?.apps_web,
															value: item?.apps_web,
														})) || []
													}
													value={field.value || []}
													onChange={field.onChange}
													placeholder="Select..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Inventory</h3>
						<FormField
							control={form.control}
							name="inventory"
							render={({ field }) => (
								<RadioGroup
									onValueChange={field.onChange}
									value={field.value}
									className="grid  grid-cols-3 gap-2"
								>
									<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950">
										<RadioGroupItem
											value={'Expanded Inventory'}
											id={`Expanded-Inventory`}
											className=" border-blue-600"
										/>
										<div className="grid gap-1.5 font-normal">
											<p className="text-sm leading-none font-medium">
												Expanded Inventory
											</p>
											<p>
												Show ads on all content that adhere to our Content
												Monetisation Policies so that you get the most reach.
											</p>
										</div>
									</Label>
									<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950">
										<RadioGroupItem
											value={'Moderate Inventory'}
											id={`Moderate-Inventory`}
											className=" border-blue-600"
										/>
										<div className="grid gap-1.5 font-normal">
											<p className="text-sm leading-none font-medium">
												Moderate Inventory
											</p>
											<p>Exclude Moderately sensitive content.</p>
										</div>
									</Label>
									<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950">
										<RadioGroupItem
											value={'Limited Inventory'}
											id={`Limited-Inventory`}
											className=" border-blue-600"
										/>
										<div className="grid gap-1.5 font-normal">
											<p className="text-sm leading-none font-medium">
												Limited Inventory
											</p>
											<p>
												Exclude additional sensitive content, as well as all
												live videos. This lowers reach and can increase costs.
											</p>
										</div>
									</Label>
								</RadioGroup>
							)}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Button
							onClick={() => {
								dispatch(
									updateLevel2({
										...formValue,
										start_date: formValue?.start_date?.toLocaleDateString(),
										end_date: formValue?.end_date?.toLocaleDateString(),
									})
								);
								dispatch(prevStep());

								if (window) {
									window.scrollTo(0, 0);
								}
							}}
							type="button"
							className="w-full"
							variant="outline"
						>
							Previous
						</Button>

						<Button type="submit" className="w-full">
							{storeLoading && (
								<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
							)}
							{false ? 'Submitting...' : 'Next'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
