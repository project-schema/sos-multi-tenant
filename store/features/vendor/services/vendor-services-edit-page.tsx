'use client';

import { Container1 } from '@/components/dashboard';
import { SearchableSelect } from '@/components/dashboard/form/searchable-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { ImageUploadForProduct } from '@/components/ui/image-upload-for-product';
import { MultiImageUpload } from '@/components/ui/image-upload-multiple';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, env, handleValidationError } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	useVendorServiceCategoryAndSubCategoryQuery,
	useVendorServicesUpdateMutation,
} from './vendor-services-api-slice';
import { iVendorServices } from './vendor-services-type';

// ----- Zod Schemas -----
const Step1Schema = z.object({
	service_category_id: z
		.string({ error: 'Service category is required' })
		.min(1, 'Service category is required'),
	service_sub_category_id: z
		.string({ error: 'Service sub-category is required' })
		.min(1, 'Service sub-category is required'),
	title: z.string({ error: 'Title is required' }).min(1, 'Title is required'),
	tags: z.array(z.string()),
	description: z.string().min(1, 'Description is required'),
	contract: z.string(),
	commission: z
		.number({ error: 'Commission is required' })
		.min(1, { message: 'Commission must be at least 1' })
		.max(10000000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Commission must be a number',
		}),
	commission_type: z.enum(['flat', 'percent']),
	image: z.instanceof(File).optional(),
	images: z.array(z.instanceof(File)).optional(),
});

const Step2Schema = z.object({
	package_title__1: z.string().min(1, 'Required'),
	package_title__2: z.string().min(1, 'Required'),
	package_title__3: z.string().min(1, 'Required'),

	price__1: z
		.number({ error: 'Price is required' })
		.min(1, { message: 'Price must be at least 1' })
		.max(10000000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Price must be a number',
		}),
	price__2: z
		.number({ error: 'Price is required' })
		.min(1, { message: 'Price must be at least 1' })
		.max(10000000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Price must be a number',
		}),
	price__3: z
		.number({ error: 'Price is required' })
		.min(1, { message: 'Price must be at least 1' })
		.max(10000000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Price must be a number',
		}),

	times__1: z.string().min(1, 'Required'),
	times__2: z.string().min(1, 'Required'),
	times__3: z.string().min(1, 'Required'),

	revision_max_time__1: z
		.string({ error: 'Revision max time is required' })
		.min(1, 'Required'),
	revision_max_time__2: z.string().min(1, 'Required'),
	revision_max_time__3: z.string().min(1, 'Required'),

	package_description__1: z.string().min(1, 'Required'),
	package_description__2: z.string().min(1, 'Required'),
	package_description__3: z.string().min(1, 'Required'),
});

const FormSchema = Step1Schema.extend(Step2Schema.shape);

type FormType = z.infer<typeof FormSchema>;

export function VendorServicesEdit({
	editData,
}: {
	editData: iVendorServices;
}) {
	const router = useRouter();
	const [step, setStep] = useState<1 | 2>(1);
	const [update, { isLoading }] = useVendorServicesUpdateMutation();
	const {
		data: categoryAndSubCategory,
		isLoading: isLoadingCategoryAndSubCategory,
	} = useVendorServiceCategoryAndSubCategoryQuery();

	const p1 = editData.servicepackages?.[0];
	const p2 = editData.servicepackages?.[1];
	const p3 = editData.servicepackages?.[2];

	const form = useForm<FormType>({
		defaultValues: {
			service_category_id: editData.service_category_id?.toString() || '',
			service_sub_category_id:
				editData.service_sub_category_id?.toString() || '',
			title: editData.title || '',
			tags: editData.tags || [],
			description: editData.description || '',
			contract: editData.contract || '',
			image: undefined,
			commission: Number(editData.commission) || 0,
			commission_type:
				(editData.commission_type as 'flat' | 'percent') || 'flat',
			images: [],

			package_title__1: p1?.package_title || '',
			package_title__2: p2?.package_title || '',
			package_title__3: p3?.package_title || '',

			price__1: Number(p1?.price || 0),
			price__2: Number(p2?.price || 0),
			price__3: Number(p3?.price || 0),

			times__1: p1?.time || '',
			times__2: p2?.time || '',
			times__3: p3?.time || '',

			revision_max_time__1: String(p1?.revision_max_time ?? ''),
			revision_max_time__2: String(p2?.revision_max_time ?? ''),
			revision_max_time__3: String(p3?.revision_max_time ?? ''),

			package_description__1: p1?.package_description || '',
			package_description__2: p2?.package_description || '',
			package_description__3: p3?.package_description || '',
		},
		resolver: zodResolver(FormSchema),
		mode: 'onChange',
	});

	useEffect(() => {
		form.reset({
			service_category_id: editData.service_category_id?.toString() || '',
			service_sub_category_id:
				editData.service_sub_category_id?.toString() || '',
			title: editData.title || '',
			tags: editData.tags || [],
			description: editData.description || '',
			contract: editData.contract || '',
			image: undefined,
			commission: Number(editData.commission) || 0,
			commission_type:
				(editData.commission_type as 'flat' | 'percent') || 'flat',
			images: [],

			package_title__1: p1?.package_title || '',
			package_title__2: p2?.package_title || '',
			package_title__3: p3?.package_title || '',

			price__1: Number(p1?.price || 0),
			price__2: Number(p2?.price || 0),
			price__3: Number(p3?.price || 0),

			times__1: p1?.time || '',
			times__2: p2?.time || '',
			times__3: p3?.time || '',

			revision_max_time__1: String(p1?.revision_max_time ?? ''),
			revision_max_time__2: String(p2?.revision_max_time ?? ''),
			revision_max_time__3: String(p3?.revision_max_time ?? ''),

			package_description__1: p1?.package_description || '',
			package_description__2: p2?.package_description || '',
			package_description__3: p3?.package_description || '',
		});
	}, [editData]);

	const categoryId = form.watch('service_category_id');

	const nextStep = async () => {
		const valid = await form.trigger([
			'service_category_id',
			'service_sub_category_id',
			'title',
			'tags',
			'description',
			'contract',
			'image',
			'commission',
			'commission_type',
			'images',
		]);
		if (!valid) return;
		setStep(2);
	};

	const prevStep = () => setStep(1);

	const onSubmit = async (data: FormType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await update({
						id: editData.id,
						service_category_id: data.service_category_id,
						service_sub_category_id: data.service_sub_category_id,
						title: data.title,
						tags: data.tags,
						description: data.description,
						contract: data.contract,
						image: data.image,
						commission: data.commission,
						commission_type: data.commission_type,
						images: data.images,
						time: [data.times__1, data.times__2, data.times__3],
						revision_max_time: [
							data.revision_max_time__1,
							data.revision_max_time__2,
							data.revision_max_time__3,
						],
						package_description: [
							data.package_description__1,
							data.package_description__2,
							data.package_description__3,
						],
						package_title: [
							data.package_title__1,
							data.package_title__2,
							data.package_title__3,
						],
						price: [data.price__1, data.price__2, data.price__3],
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Service updated successfully');
						form.reset();
						router.push(`/services`);
					} else {
						if (response.status === 400) {
							handleValidationError(response as any, form.setError);
						} else {
							toast.error(response.message || 'Something went wrong');
						}
					}
				} catch (error: any) {
					if (error?.status === 400) {
						handleValidationError(error, form.setError);
					} else {
						toast.error('Something went wrong');
					}
				}
			},
		});
	};

	const [tagInput, setTagInput] = useState('');
	const addTag = () => {
		const t = tagInput.trim();
		if (!t) return;
		form.setValue('tags', [...(form.getValues('tags') ?? []), t], {
			shouldDirty: true,
			shouldValidate: true,
		});
		setTagInput('');
	};
	const removeTag = (i: number) => {
		const current = form.getValues('tags') ?? [];
		current.splice(i, 1);
		form.setValue('tags', [...current], {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	return (
		<Container1
			header={
				<>
					<div className="pb-2 lg:pb-3 flex items-center justify-between">
						<CardTitle>Update Service</CardTitle>
						<div className="text-sm text-muted-foreground">
							Step {step} of 2
						</div>
					</div>
				</>
			}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* STEP 1 */}
					{step === 1 && (
						<Card>
							<CardContent className="space-y-6 pt-6">
								<div className="grid lg:grid-cols-3 gap-4">
									{/* Left: images */}
									<div className="space-y-6">
										<FormField
											control={form.control}
											name="image"
											render={({ field }) => (
												<FormItem>
													<ImageUploadForProduct
														label="Feature Image"
														value={field.value ?? null}
														onChange={field.onChange}
														defaultImage={
															editData.image
																? `${env.baseAPI}/${editData.image}`
																: '/placeholder.svg'
														}
													/>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="images"
											render={({ field }) => (
												<FormItem>
													<MultiImageUpload
														label="Gallery Images"
														value={field.value ?? []}
														onChange={field.onChange}
														defaultImages={(editData.serviceimages || []).map(
															(img) => `${env.baseAPI}/${img.images}`
														)}
													/>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									{/* Right: details */}
									<div className="lg:col-span-2 space-y-6">
										<div className="grid md:grid-cols-2 gap-4">
											<FormField
												control={form.control}
												name="service_category_id"
												render={({ field }) => (
													<SearchableSelect
														field={field}
														label="Service Category"
														options={
															(categoryAndSubCategory &&
																categoryAndSubCategory?.message &&
																categoryAndSubCategory?.message?.map(
																	(item) => ({
																		label: item.name,
																		value: item.id.toString(),
																	})
																)) ??
															[]
														}
														placeholder="Select category"
													/>
												)}
											/>
											<FormField
												control={form.control}
												name="service_sub_category_id"
												render={({ field }) => (
													<SearchableSelect
														field={field}
														label="Service Sub Category"
														options={
															(categoryAndSubCategory &&
																categoryAndSubCategory?.message &&
																categoryAndSubCategory?.message
																	?.find(
																		(item) =>
																			item.id.toString() ===
																			categoryId?.toString()
																	)
																	?.servicesub_categories?.map((subItem) => ({
																		label: subItem.name,
																		value: subItem.id.toString(),
																	}))) ??
															[]
														}
														placeholder="Select sub category"
													/>
												)}
											/>
										</div>

										<FormField
											control={form.control}
											name="title"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input placeholder="Enter title" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Tags */}
										<FormField
											control={form.control}
											name="tags"
											render={() => (
												<FormItem>
													<FormLabel>Tags</FormLabel>
													<div className="flex gap-2">
														<Input
															placeholder="Type a tag and press Add"
															value={tagInput}
															onChange={(e) => setTagInput(e.target.value)}
															onKeyDown={(e) => {
																if (e.key === 'Enter') {
																	e.preventDefault();
																	addTag();
																}
															}}
														/>
														<Button
															type="button"
															onClick={addTag}
															variant="secondary"
														>
															Add
														</Button>
													</div>
													<div className="flex flex-wrap gap-2 mt-2">
														{(form.watch('tags') ?? []).map((t, i) => (
															<span
																key={`${t}-${i}`}
																className="px-2 py-1 rounded-full text-xs bg-secondary"
															>
																{t}{' '}
																<button
																	type="button"
																	className="ml-1 text-muted-foreground"
																	onClick={() => removeTag(i)}
																>
																	×
																</button>
															</span>
														))}
													</div>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="description"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Description</FormLabel>
													<FormControl>
														<Textarea
															rows={5}
															placeholder="Write description..."
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className="grid md:grid-cols-3 gap-4">
											<FormField
												control={form.control}
												name="commission_type"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Commission Type</FormLabel>
														<Select
															value={field.value}
															onValueChange={(v) => field.onChange(v)}
														>
															<FormControl>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Select type" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="flat">Flat</SelectItem>
																<SelectItem value="percent">Percent</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="commission"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Commission</FormLabel>
														<FormControl>
															<Input
																type="number"
																inputMode="decimal"
																placeholder="0.00"
																value={field.value as any}
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
												name="contract"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Contract </FormLabel>
														<FormControl>
															<Input {...field} placeholder="Contract " />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								</div>

								<div className="flex items-center justify-end gap-2">
									<Button type="button" onClick={nextStep}>
										Next
									</Button>
								</div>
							</CardContent>
						</Card>
					)}

					{/* STEP 2 */}
					{step === 2 && (
						<Card>
							<CardContent className="space-y-6 pt-6">
								<div className="grid md:grid-cols-3 gap-6">
									{/* Package 1 */}
									<div className="space-y-4">
										<FormField
											control={form.control}
											name="package_title__1"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Package 1 Title</FormLabel>
													<FormControl>
														<Input placeholder="Basic" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="price__1"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Price 1</FormLabel>
													<FormControl>
														<Input
															type="number"
															inputMode="decimal"
															placeholder="0.00"
															value={field.value as any}
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
											name="times__1"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Time 1</FormLabel>
													<FormControl>
														<Input placeholder="e.g., 7 days" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="revision_max_time__1"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Revision Limit 1</FormLabel>
													<FormControl>
														<Input placeholder="e.g., 2 revisions" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="package_description__1"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Package 1 Description</FormLabel>
													<FormControl>
														<Textarea
															rows={5}
															placeholder="Describe package 1..."
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									{/* Package 2 */}
									<div className="space-y-4">
										<FormField
											control={form.control}
											name="package_title__2"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Package 2 Title</FormLabel>
													<FormControl>
														<Input placeholder="Standard" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="price__2"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Price 2</FormLabel>
													<FormControl>
														<Input
															type="number"
															inputMode="decimal"
															placeholder="0.00"
															value={field.value as any}
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
											name="times__2"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Time 2</FormLabel>
													<FormControl>
														<Input placeholder="e.g., 14 days" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="revision_max_time__2"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Revision Limit 2</FormLabel>
													<FormControl>
														<Input placeholder="e.g., 4 revisions" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="package_description__2"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Package 2 Description</FormLabel>
													<FormControl>
														<Textarea
															rows={5}
															placeholder="Describe package 2..."
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									{/* Package 3 */}
									<div className="space-y-4">
										<FormField
											control={form.control}
											name="package_title__3"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Package 3 Title</FormLabel>
													<FormControl>
														<Input placeholder="Premium" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="price__3"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Price 3</FormLabel>
													<FormControl>
														<Input
															type="number"
															inputMode="decimal"
															placeholder="0.00"
															value={field.value as any}
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
											name="times__3"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Time 3</FormLabel>
													<FormControl>
														<Input placeholder="e.g., 30 days" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="revision_max_time__3"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Revision Limit 3</FormLabel>
													<FormControl>
														<Input placeholder="e.g., unlimited" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="package_description__3"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Package 3 Description</FormLabel>
													<FormControl>
														<Textarea
															rows={5}
															placeholder="Describe package 3..."
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								<div className="flex items-center justify-between gap-2">
									<Button type="button" variant="outline" onClick={prevStep}>
										Back
									</Button>
									<Button type="submit">Update</Button>
								</div>
							</CardContent>
						</Card>
					)}
				</form>
			</Form>
		</Container1>
	);
}
