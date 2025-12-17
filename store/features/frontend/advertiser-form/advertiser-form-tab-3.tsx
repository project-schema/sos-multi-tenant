'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { useFrontendAdvDyDataQuery } from './advertiser-form-api-slice';
import {
	L3_RequitedField,
	level2SubmitFormat,
	level3Format,
	nextStep,
	prevStep,
	updateLevel3,
} from './advertiser-form-slice';
//  Zod Schema
const optionSchema = z.object({
	format: z
		.string({ error: 'format is required' })
		.trim()
		.min(1, 'format is required'),
	primary_text: z
		.string({ error: 'Primary text is required' })
		.trim()
		.min(1, 'Primary text is required'),
	media: z
		.string({ error: 'Media is required' })
		.trim()
		.min(1, 'Media is required'),
	heading: z
		.string({ error: 'Heading is required' })
		.trim()
		.min(1, 'Heading is required'),
	description: z
		.string({ error: 'Description is required' })
		.trim()
		.min(1, 'Description is required'),
	call_to_action: z
		.string({ error: 'Call to action is required' })
		.trim()
		.min(1, 'Call to action is required'),
});
const schema = z
	.object({
		format: z.enum(['Existing Add', 'New Add'], {
			message: 'Format is required',
		}),

		destination: z
			.string({ error: 'Destination is required' })
			.trim()
			.min(1, 'Destination is required'),
		tracking: z
			.string({ error: 'Tracking From is required' })
			.trim()
			.min(1, 'Tracking from  is required'),

		url_perimeter: z.url({ error: 'URL is required' }),

		number: z
			.string({ error: 'Number is required' })
			.trim()
			.min(1, 'Number is required'),
		last_description: z
			.string({ error: 'Number is required' })
			.trim()
			.optional(),
		postid: z.string().optional(),

		cards: z.array(optionSchema).optional(),
	})
	.superRefine((data, ctx) => {
		if (
			data.format === 'Existing Add' &&
			(!data.postid || data.postid.trim() === '')
		) {
			ctx.addIssue({
				path: ['postid'],
				code: z.ZodIssueCode.custom,
				message: 'Post ID is required for Existing Add',
			});
		}

		if (data.format === 'New Add' && (!data.cards || data.cards.length === 0)) {
			ctx.addIssue({
				path: ['cards'],
				code: z.ZodIssueCode.custom,
				message: 'At least one card is required for New Add',
			});
		}
	});

type ZodType = z.infer<typeof schema>;

export function AdvertiserFormTab3({
	createAdvertise,
	isLoading,
}: {
	createAdvertise: (data: any) => any;
	isLoading: boolean;
}) {
	const [card, setCard] = useState({
		format: '',
		primary_text: '',
		media: '',
		heading: '',
		description: '',
		call_to_action: '',
	});
	const dispatch = useAppDispatch();
	const level3 = useAppSelector((state) => state.advertiseForm.level3);

	const selected = useAppSelector((state) => state.advertiseForm.level1?.id);

	const { data: AdFData, isLoading: loadAdF } = useFrontendAdvDyDataQuery(
		{
			api: `add_format/${selected}` as 'add_format',
		},
		{
			skip: !selected,
		}
	);

	const { data: calTData, isLoading: loadCalT } = useFrontendAdvDyDataQuery({
		api: 'call_to_action',
	});

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			format: 'Existing Add',
			destination: '',
			tracking: '',
			url_perimeter: '',
			number: '',
			last_description: '',
			postid: '',
			cards: [],
		},
	});

	const formatValue = form.watch('format');

	useEffect(() => {
		form.reset(level3);
	}, []);

	const onSubmit = async (data: ZodType) => {
		const formedData = level3Format(data);
		try {
			const response = await createAdvertise(
				level2SubmitFormat(formedData)
			).unwrap();
			if (response?.message === 'Validation errors') {
				Object.entries(response?.data).forEach(([field, value]) => {
					if (L3_RequitedField.includes(field)) {
						form.setError(field as keyof ZodType, {
							type: 'server',
							message: Array.isArray(value) ? value[0] : value,
						});
						return toast.error('Please fill all the required fields');
					}
				});
			}
			dispatch(
				updateLevel3({
					...data,
				})
			);
			dispatch(nextStep());
		} catch (error: any) {
			toast.error(error?.message || 'Something went wrong');
		}
	};

	const formValue = form.getValues();

	return (
		<div className="max-w-5xl mx-auto mb-10">
			<Form {...form}>
				<form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
					<div className=" mt-4 grid grid-cols-1 xl:grid-cols-2 gap-8">
						<div className="space-y-10">
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Format</h3>
								<div>
									<FormField
										control={form.control}
										name="format"
										render={({ field }) => (
											<RadioGroup
												onValueChange={field.onChange}
												value={field.value}
												className="grid  grid-cols-2 gap-2"
											>
												<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950">
													<RadioGroupItem
														value={'Existing Add'}
														id={`Existing-Add`}
														className=" border-blue-600"
													/>
													<div className="grid gap-1.5 font-normal">
														<p className="text-sm leading-none font-medium">
															Existing Add
														</p>
													</div>
												</Label>
												<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950">
													<RadioGroupItem
														value={'New Add'}
														id={`New-Add`}
														className=" border-blue-600"
													/>
													<div className="grid gap-1.5 font-normal">
														<p className="text-sm leading-none font-medium">
															New Add
														</p>
													</div>
												</Label>
											</RadioGroup>
										)}
									/>
								</div>
							</div>

							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Ad Creative</h3>
								<div className="space-y-4">
									{formatValue === 'Existing Add' && (
										<FormField
											control={form.control}
											name="postid"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Post Id</FormLabel>
													<FormControl>
														<Input
															placeholder="Type..."
															{...field}
															value={field.value ?? ''}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}
									{formatValue === 'New Add' && (
										<>
											{/* Single Card Input Form */}
											<div className="space-y-4 border p-4 rounded-md">
												{/* Format */}
												<div className="space-y-2">
													<Label>Format</Label>
													<Select
														value={card.format}
														onValueChange={(value) => {
															setCard((prev) => ({ ...prev, format: value }));
															form.clearErrors('cards');
														}}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select format" />
														</SelectTrigger>
														<SelectContent>
															{AdFData?.message?.map((item: any) => (
																<SelectItem
																	key={item.id}
																	value={item.add_format}
																>
																	{item.add_format}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>

												{/* Primary Text */}
												<div className="space-y-2">
													<Label>Primary Text</Label>
													<Textarea
														placeholder="Type..."
														value={card.primary_text}
														onChange={(e) => [
															setCard((prev) => ({
																...prev,
																primary_text: e.target.value,
															})),
														]}
													/>
												</div>

												{/* Media */}
												<div className="space-y-2">
													<Label>Media</Label>
													<Input
														placeholder="Type..."
														value={card.media}
														onChange={(e) => {
															setCard((prev) => ({
																...prev,
																media: e.target.value,
															}));
															form.clearErrors('cards');
														}}
													/>
												</div>

												{/* Headline */}
												<div className="space-y-2">
													<Label>Headline</Label>
													<Input
														placeholder="Type..."
														value={card.heading}
														onChange={(e) => {
															setCard((prev) => ({
																...prev,
																heading: e.target.value,
															}));
															form.clearErrors('cards');
														}}
													/>
												</div>

												{/* Description */}
												<div className="space-y-2">
													<Label>Description</Label>
													<Textarea
														placeholder="Type..."
														value={card.description}
														onChange={(e) => {
															setCard((prev) => ({
																...prev,
																description: e.target.value,
															}));
															form.clearErrors('cards');
														}}
													/>
												</div>

												{/* Call to Action */}
												<div className="space-y-2">
													<Label>Call To Action</Label>
													<Select
														value={card.call_to_action}
														onValueChange={(value) => {
															setCard((prev) => ({
																...prev,
																call_to_action: value,
															}));
															form.clearErrors('cards');
														}}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select call to action" />
														</SelectTrigger>
														<SelectContent>
															{calTData?.message?.map((item: any) => (
																<SelectItem
																	key={item.id}
																	value={item.call_to_action}
																>
																	{item.call_to_action}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>

												{form.formState.errors.cards && (
													<p className="text-red-500 text-sm">
														{form.formState.errors.cards.message}
													</p>
												)}

												{/* Add Button */}
												<div className="flex justify-end">
													<Button
														type="button"
														onClick={() => {
															const fields: (keyof typeof card)[] = [
																'format',
																'primary_text',
																'media',
																'heading',
																'description',
																'call_to_action',
															];

															const hasEmpty = fields.some((key) => !card[key]);

															if (hasEmpty) {
																form.setError('cards', {
																	type: 'manual',
																	message:
																		'Please fill out all card fields before adding.',
																});
																return;
															}

															// Clear any previous error
															form.clearErrors('cards');

															const updatedCards = [
																...(form.getValues('cards') || []),
																card,
															];
															form.setValue('cards', updatedCards);

															// Reset the draft card
															setCard({
																format: '',
																primary_text: '',
																media: '',
																heading: '',
																description: '',
																call_to_action: '',
															});
														}}
													>
														Add New
													</Button>
												</div>
											</div>
										</>
									)}
								</div>
							</div>

							{/* Campaign Name  */}
							<FormField
								control={form.control}
								name="destination"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={cn('text-lg font-semibold')}>
											Destination
										</FormLabel>
										<FormControl>
											<Input placeholder="Type..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Tracking  */}
							<FormField
								control={form.control}
								name="tracking"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={cn('text-lg font-semibold')}>
											Tracking
										</FormLabel>
										<FormControl>
											<Input placeholder="Type..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* URL perimeter  */}
							<FormField
								control={form.control}
								name="url_perimeter"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={cn('text-lg font-semibold')}>
											URL perimeter
										</FormLabel>
										<FormControl>
											<Input placeholder="Type..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Whatsapp Number  */}
							<FormField
								control={form.control}
								name="number"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={cn('text-lg font-semibold')}>
											Whatsapp Number
										</FormLabel>
										<FormControl>
											<Input placeholder="Type..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Description   */}
							<FormField
								control={form.control}
								name="last_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={cn('text-lg font-semibold')}>
											Description
										</FormLabel>
										<FormControl>
											<Textarea placeholder="Type..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="">
							<div className="grid grid-cols-2 gap-4">
								{formatValue === 'New Add' && (
									<FormField
										control={form.control}
										name="cards"
										render={({ field }) => (
											<>
												{(field.value || []).map((card, index) => (
													<div
														key={index}
														className="space-y-4 border p-4 rounded-md"
													>
														<FormField
															name={`cards.${index}.format`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Format</FormLabel>
																	<Select
																		onValueChange={field.onChange}
																		defaultValue={field.value}
																	>
																		<FormControl>
																			<SelectTrigger className="w-full">
																				<SelectValue placeholder="Select format" />
																			</SelectTrigger>
																		</FormControl>
																		<SelectContent>
																			{AdFData?.message?.map(
																				(item: {
																					id: number;
																					add_format: string;
																				}) => (
																					<SelectItem
																						key={item.id}
																						value={item.add_format}
																					>
																						{item.add_format}
																					</SelectItem>
																				)
																			)}
																		</SelectContent>
																	</Select>
																	<FormMessage />
																</FormItem>
															)}
														/>

														<FormField
															name={`cards.${index}.primary_text`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Primary Text</FormLabel>
																	<FormControl>
																		<Textarea
																			placeholder="Type..."
																			{...field}
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>

														<FormField
															name={`cards.${index}.media`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Media</FormLabel>
																	<FormControl>
																		<Input placeholder="Type..." {...field} />
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>

														<FormField
															name={`cards.${index}.heading`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Headline</FormLabel>
																	<FormControl>
																		<Input placeholder="Type..." {...field} />
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>

														<FormField
															name={`cards.${index}.description`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Description</FormLabel>
																	<FormControl>
																		<Textarea
																			placeholder="Type..."
																			{...field}
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>

														<FormField
															name={`cards.${index}.call_to_action`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Call To Action</FormLabel>
																	<Select
																		onValueChange={field.onChange}
																		defaultValue={field.value}
																	>
																		<FormControl>
																			<SelectTrigger className="w-full">
																				<SelectValue placeholder="Select call to action" />
																			</SelectTrigger>
																		</FormControl>
																		<SelectContent>
																			{calTData?.message?.map(
																				(item: {
																					id: number;
																					call_to_action: string;
																				}) => (
																					<SelectItem
																						key={item.id}
																						value={item.call_to_action}
																					>
																						{item.call_to_action}
																					</SelectItem>
																				)
																			)}
																		</SelectContent>
																	</Select>
																	<FormMessage />
																</FormItem>
															)}
														/>

														{/* Optionally add a remove button per card */}
														<div className="flex justify-end">
															<Button
																variant="destructive"
																type="button"
																onClick={() => {
																	const updated = [...(field.value || [])];
																	updated.splice(index, 1);
																	field.onChange(updated);
																}}
															>
																Remove
															</Button>
														</div>
													</div>
												))}
											</>
										)}
									/>
								)}
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Button
							onClick={() => {
								dispatch(
									updateLevel3({
										...formValue,
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
							{isLoading && (
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
