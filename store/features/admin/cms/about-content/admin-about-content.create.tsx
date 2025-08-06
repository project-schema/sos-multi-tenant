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
import { alertConfirm, env, ErrorAlert } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	useAdminUpdateHomeContentMutation,
	useAdminViewHomeContentQuery,
} from '../home-content/admin-home-content.api.slice';

// --- Zod Schema ---
export const schema = z.object({
	about_banner_image: z
		.instanceof(File)
		.refine((file) => file.size > 0, {
			message: 'Image is required',
		})
		.optional(),
	about_banner_title: z.string().min(1, 'Banner title is required'),
	about_banner_heading: z.string().min(1, 'Banner heading is required'),
	about_banner_description: z.string().min(1, 'Banner description is required'),

	about_banner_increment_one_count: z.string().min(1, 'Count one is required'),
	about_banner_increment_one_title: z
		.string()
		.min(1, 'Count one title is required'),
	about_banner_increment_two_count: z.string().min(1, 'Count two is required'),
	about_banner_increment_otwo_title: z
		.string()
		.min(1, 'Count two title is required'),
	about_banner_increment_othree_count: z
		.string()
		.min(1, 'Count three is required'),
	about_banner_increment_three_title: z
		.string()
		.min(1, 'Count three title is required'),

	vision_image_one: z
		.instanceof(File)
		.refine((file) => file.size > 0, {
			message: 'Image is required',
		})
		.optional(),
	vision_image_two: z
		.instanceof(File)
		.refine((file) => file.size > 0, {
			message: 'Image is required',
		})
		.optional(),
	vision_image_three: z
		.instanceof(File)
		.refine((file) => file.size > 0, {
			message: 'Image is required',
		})
		.optional(),

	vision_title: z.string().min(1, 'Vision title is required'),
	vision_heading: z.string().min(1, 'Vision heading is required'),
	vision_description: z.string().min(1, 'Vision description is required'),

	mission_image: z
		.instanceof(File)
		.refine((file) => file.size > 0, {
			message: 'Image is required',
		})
		.optional(),
	mission_title: z.string().min(1, 'Mission title is required'),
	mission_heading: z.string().min(1, 'Mission heading is required'),
	mission_description: z.string().min(1, 'Mission description is required'),

	chose_us_two_title: z.string().min(1, 'Chose us two title is required'),
	chose_us_two_heading: z.string().min(1, 'Chose us two heading is required'),
	testimonial_title: z.string().min(1, 'Testimonial title is required'),
	testimonial_heading: z.string().min(1, 'Testimonial heading is required'),
	member_title: z.string().min(1, 'Member title is required'),
	member_heading: z.string().min(1, 'Member heading is required'),
});

export type ZodType = z.infer<typeof schema>;

export function AboutContentCreate() {
	const [store, { isLoading }] = useAdminUpdateHomeContentMutation();
	const {
		data,
		isLoading: loading,
		isError,
		refetch,
	} = useAdminViewHomeContentQuery(undefined);
	const setting = data?.message[0];

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			about_banner_image: undefined,
			about_banner_description: '',
			about_banner_title: '',
			about_banner_heading: '',

			about_banner_increment_one_count: '',
			about_banner_increment_one_title: '',
			about_banner_increment_two_count: '',
			about_banner_increment_otwo_title: '',
			about_banner_increment_othree_count: '',
			about_banner_increment_three_title: '',
			vision_image_one: undefined,
			vision_image_two: undefined,
			vision_image_three: undefined,
			vision_title: '',
			vision_heading: '',
			vision_description: '',

			mission_image: undefined,
			mission_title: '',
			mission_heading: '',
			mission_description: '',

			chose_us_two_title: '',
			chose_us_two_heading: '',
			testimonial_title: '',
			testimonial_heading: '',
			member_title: '',
			member_heading: '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.message && setting) {
			form.reset({
				...setting,
				about_banner_image: undefined,
				vision_image_one: undefined,
				vision_image_two: undefined,
				vision_image_three: undefined,
				mission_image: undefined,
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
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store(data).unwrap();

					if (response.status === 200) {
						refetch();
						toast.success(
							response.message || 'Home content updated successfully'
						);
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
			},
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
				{/* About Banner Section */}
				<div>
					<h3 className="text-lg font-medium mb-4">About Banner</h3>
					<div className="grid gird-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="about_banner_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Banner Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter banner title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="about_banner_heading"
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
								name="about_banner_description"
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
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="about_banner_image"
								render={({ field }) => (
									<FormItem>
										<ImageUpload
											label="Banner Image"
											value={field.value}
											onChange={field.onChange}
											defaultImage={`${env.baseAPI}/${setting?.about_banner_image}`}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Others section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Others</h3>
					<div className="grid gird-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="about_banner_increment_one_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Experience Status</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="about_banner_increment_one_count"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Experience Count</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter count..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="about_banner_increment_otwo_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Merchant Status</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="about_banner_increment_two_count"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Merchant Count</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter count..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="about_banner_increment_three_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Dropshipper Status</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="about_banner_increment_othree_count"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Dropshipper Count</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter count..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Vision section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Vision</h3>
					<div className="grid gird-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="vision_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Vision Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter vision title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="vision_heading"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Vision Heading</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter vision heading..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="vision_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Vision Description</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder="Enter vision description..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex gap-4 flex-wrap">
							<FormField
								control={form.control}
								name="vision_image_one"
								render={({ field }) => (
									<FormItem>
										<ImageUpload
											label="Vision Image One"
											value={field.value}
											onChange={field.onChange}
											defaultImage={`${env.baseAPI}/${setting?.vision_image_one}`}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="vision_image_two"
								render={({ field }) => (
									<FormItem>
										<ImageUpload
											label="Vision Image Two"
											value={field.value}
											onChange={field.onChange}
											defaultImage={`${env.baseAPI}/${setting?.vision_image_two}`}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="vision_image_three"
								render={({ field }) => (
									<FormItem>
										<ImageUpload
											label="Vision Image Three"
											value={field.value}
											onChange={field.onChange}
											defaultImage={`${env.baseAPI}/${setting?.vision_image_three}`}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Mission Section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Mission Banner</h3>
					<div className="grid gird-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="mission_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mission Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter mission title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="mission_heading"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mission Heading</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter mission heading..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="mission_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mission Description</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder="Enter mission description..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="mission_image"
								render={({ field }) => (
									<FormItem>
										<ImageUpload
											label="Mission Image"
											value={field.value}
											onChange={field.onChange}
											defaultImage={`${env.baseAPI}/${setting?.mission_image}`}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Others section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Others</h3>
					<div className="grid gird-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="chose_us_two_heading"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Chose Us Heading</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter heading..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="chose_us_two_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Chose Us Title</FormLabel>
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
								name="testimonial_heading"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Testimonial Heading</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter heading..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="testimonial_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Testimonial Title</FormLabel>
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
								name="member_heading"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Member Heading</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter heading..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="member_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Member Title</FormLabel>
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
