'use client';

import { Loader5 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { env, ErrorAlert } from '@/lib';
import { IconInput } from '@/lib/icon/icon-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	useAdminUpdateCrmHomeContentMutation,
	useAdminViewCrmHomeContentQuery,
} from './crm-admin-home-content.api.slice';

// --- Zod Schema ---
export const schema = z.object({
	home_banner_heading: z.string().min(1, 'Banner heading is required'),
	home_banner_description: z.string().min(1, 'Banner description is required'),
	service_one_title: z.string().min(1, 'Service one title is required'),
	service_one_heading: z.string().min(1, 'Service one heading is required'),
	org_one_title: z.string().min(1, 'Organization one title is required'),
	org_one_heading: z.string().min(1, 'Organization one heading is required'),
	org_one_photo: z
		.instanceof(File)
		.refine((file) => file.size > 0, {
			message: 'Organization one image is required',
		})
		.optional(),
	org_one_video_link: z.string().url('Invalid video URL').optional(),
	count_one: z.string().min(1, 'Count one is required'),
	one_title: z.string().min(1, 'Title one is required'),
	count_two: z.string().min(1, 'Count two is required'),
	count_two_title: z.string().min(1, 'Count two title is required'),
	count_three: z.string().min(1, 'Count three is required'),
	count_three_title: z.string().min(1, 'Count three title is required'),
	count_four: z.string().min(1, 'Count four is required'),
	count_four_title: z.string().min(1, 'Count four title is required'),
	service_two_title: z.string().min(1, 'Service two title is required'),
	service_two_heading: z.string().min(1, 'Service two heading is required'),
	org_title: z.string().min(1, 'Organization title is required'),
	org_photo: z
		.instanceof(File)
		.refine((file) => file.size > 0, {
			message: 'Organization image is required',
		})
		.optional(),
	org_heading: z.string().min(1, 'Organization heading is required'),
	chose_us_title: z.string().min(1, 'Choose us title is required'),
	chose_us_heading: z.string().min(1, 'Choose us heading is required'),
	chose_description: z.string().min(1, 'Choose description is required'),
	progress_title: z.string().min(1, 'Progress title is required'),
	progress_value: z.string().min(1, 'Progress value is required'),
	progres_two_title: z.string().min(1, 'Progress two title is required'),
	progres_two_value: z.string().min(1, 'Progress two value is required'),
	progres_three_title: z.string().min(1, 'Progress three title is required'),
	progres_three_value: z.string().min(1, 'Progress three value is required'),
	progres_four_title: z.string().min(1, 'Progress four title is required'),
	progres_four_value: z.string().min(1, 'Progress four value is required'),
	chose_card_one_icon: z.string().min(1, 'Card one icon is required'),
	chose_card_one_title: z.string().min(1, 'Card one title is required'),
	chose_card_one_description: z
		.string()
		.min(1, 'Card one description is required'),
	chose_card_two_icon: z.string().min(1, 'Card two icon is required'),
	chose_card_two_title: z.string().min(1, 'Card two title is required'),
	chose_card_two_description: z
		.string()
		.min(1, 'Card two description is required'),
	chose_card_three_icon: z.string().min(1, 'Card three icon is required'),
	chose_card_three_title: z.string().min(1, 'Card three title is required'),
	chose_card_three_description: z
		.string()
		.min(1, 'Card three description is required'),
	chose_card_four_icon: z.string().min(1, 'Card four icon is required'),
	chose_card_four_title: z.string().min(1, 'Card four title is required'),
	chose_card_four_description: z
		.string()
		.min(1, 'Card four description is required'),
	partner_title: z.string().min(1, 'Partner title is required'),
	partner_heading: z.string().min(1, 'Partner heading is required'),
});

export type ZodType = z.infer<typeof schema>;

export function CrmHomeContentCreate() {
	const [store, { isLoading }] = useAdminUpdateCrmHomeContentMutation();
	const {
		data,
		isLoading: loading,
		isError,
		refetch,
	} = useAdminViewCrmHomeContentQuery(undefined);
	const setting = data?.message[0];

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			home_banner_heading: '',
			home_banner_description: '',
			service_one_title: '',
			service_one_heading: '',
			org_one_title: '',
			org_one_heading: '',
			org_one_photo: undefined,
			org_one_video_link: '',
			count_one: '',
			one_title: '',
			count_two: '',
			count_two_title: '',
			count_three: '',
			count_three_title: '',
			count_four: '',
			count_four_title: '',
			service_two_title: '',
			service_two_heading: '',
			org_title: '',
			org_photo: undefined,
			org_heading: '',
			chose_us_title: '',
			chose_us_heading: '',
			chose_description: '',
			progress_title: '',
			progress_value: '',
			progres_two_title: '',
			progres_two_value: '',
			progres_three_title: '',
			progres_three_value: '',
			progres_four_title: '',
			progres_four_value: '',
			chose_card_one_icon: '',
			chose_card_one_title: '',
			chose_card_one_description: '',
			chose_card_two_icon: '',
			chose_card_two_title: '',
			chose_card_two_description: '',
			chose_card_three_icon: '',
			chose_card_three_title: '',
			chose_card_three_description: '',
			chose_card_four_icon: '',
			chose_card_four_title: '',
			chose_card_four_description: '',
			partner_title: '',
			partner_heading: '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.message && setting) {
			form.reset({
				...setting,
				org_one_photo: undefined,
				org_photo: undefined,
			});
		}
	}, [data, form, setting]);

	if (isError) return <ErrorAlert />;
	if (loading) {
		return (
			<>
				<Loader5 />
				<Loader5 />
				<Loader5 />
				<Loader5 />
			</>
		);
	}

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await store(data).unwrap();

			if (response.status === 200) {
				refetch();
				toast.success(response.message || 'Home content updated successfully');
			} else {
				const errorResponse = response as any;
				if (
					response.status === 400 &&
					typeof errorResponse.errors === 'object'
				) {
					Object.entries(errorResponse.errors).forEach(([field, value]) => {
						form.setError(field as keyof ZodType, {
							type: 'server',
							message: (value as string[])[0],
						});
					});
				} else {
					toast.error(response.message || 'Something went wrong');
				}
			}
		} catch (error: any) {
			if (error?.status === 400 && typeof error.message === 'object') {
				Object.entries(error.message).forEach(([field, value]) => {
					form.setError(field as keyof ZodType, {
						type: 'server',
						message: (value as string[])[0],
					});
				});
			} else {
				toast.error('Something went wrong');
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
				{/* Home Banner Section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Home Banner</h3>
					<div className="grid gird-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="home_banner_heading"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Banner Heading</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter banner heading..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="home_banner_description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Banner Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter banner description..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Services Section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Services</h3>
					<div className="grid gird-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="service_one_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Service One Title</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter service one title..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="service_one_heading"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Service One Heading</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter service one heading..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="service_two_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Service Two Title</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter service two title..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="service_two_heading"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Service Two Heading</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter service two heading..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Organization Section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Organization</h3>
					<div className="grid gird-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="org_one_photo"
								render={({ field }) => (
									<FormItem>
										<ImageUpload
											label="Organization One Photo"
											value={field.value}
											onChange={field.onChange}
											defaultImage={`${env.baseAPI}/${setting?.org_one_photo}`}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="org_one_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Organization One Title</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter organization one title..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="org_one_heading"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Organization One Heading</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter organization one heading..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="org_one_video_link"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Organization One Video Link</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter video URL..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="org_photo"
								render={({ field }) => (
									<FormItem>
										<ImageUpload
											label="Organization Two Image"
											value={field.value}
											onChange={field.onChange}
											defaultImage={`${env.baseAPI}/${setting?.org_photo}`}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="org_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Organization Two Title</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter organization title..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="org_heading"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Organization Two Header</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter organization heading..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>
				{/* Choose Us Section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Choose Us</h3>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="chose_us_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Choose Us Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter choose us title..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="chose_us_heading"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Choose Us Heading</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter choose us heading..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="chose_description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Choose Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter choose description..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Progress Items */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
						<FormField
							control={form.control}
							name="progress_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Progress One Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter title..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="progress_value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Progress One Value</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter value..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="progres_two_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Progress Two Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter title..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="progres_two_value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Progress Two Value</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter value..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="progres_three_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Progress Three Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter title..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="progres_three_value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Progress Three Value</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter value..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="progres_four_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Progress Four Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter title..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="progres_four_value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Progress Four Value</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter value..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				{/* Choose Cards */}
				<div className="mt-6 col-span-2 ">
					<h4 className="text-md font-medium mb-4">Choose Cards</h4>
					<div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
						{/* Card One */}
						<div className="border p-4 rounded-lg space-y-4">
							<FormField
								control={form.control}
								name="chose_card_one_icon"
								render={() => (
									<FormItem>
										<FormLabel>Card One Icon</FormLabel>
										<IconInput methods={form} name="chose_card_one_icon" />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="chose_card_one_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card One Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="chose_card_one_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card One Description</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder="Enter description..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Card Two */}
						<div className="border p-4 rounded-lg space-y-4">
							<FormField
								control={form.control}
								name="chose_card_two_icon"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card Two Icon</FormLabel>
										<IconInput methods={form} name="chose_card_two_icon" />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="chose_card_two_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card Two Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="chose_card_two_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card Two Description</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder="Enter description..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Card Three */}
						<div className="border p-4 rounded-lg space-y-4">
							<FormField
								control={form.control}
								name="chose_card_three_icon"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card Three Icon</FormLabel>
										<IconInput methods={form} name="chose_card_three_icon" />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="chose_card_three_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card Three Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="chose_card_three_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card Three Description</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder="Enter description..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Card Four */}
						<div className="border p-4 rounded-lg space-y-4">
							<FormField
								control={form.control}
								name="chose_card_four_icon"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card Four Icon</FormLabel>
										<IconInput methods={form} name="chose_card_four_icon" />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="chose_card_four_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card Four Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="chose_card_four_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card Four Description</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder="Enter description..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Counters Section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Counters</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="count_one"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Count One</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter count..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="one_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Count One Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="count_two"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Count Two</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter count..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="count_two_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Count Two Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="count_three"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Count Three</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter count..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="count_three_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Count Three Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="count_four"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Count Four</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter count..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="count_four_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Count Four Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Partners Section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Partners</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="partner_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Partner Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter partner title..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="partner_heading"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Partner Heading</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter partner heading..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<DialogFooter className="col-span-2">
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Updating...' : 'Update Content'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
