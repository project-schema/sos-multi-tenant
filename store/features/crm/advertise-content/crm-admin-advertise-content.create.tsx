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
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	useAdminUpdateCrmHomeContentMutation,
	useAdminViewCrmHomeContentQuery,
} from '../home-content/crm-admin-home-content.api.slice';

// --- Zod Schema ---
export const schema = z.object({
	advertise_banner_image: z
		.instanceof(File)
		.refine((file) => file.size > 0, {
			message: 'Image is required',
		})
		.optional(),
	advertise_banner_heading: z.string().min(1, 'Heading is required'),
	get_sarted_description: z.string().min(1, 'Description is required'),
	get_sarted_title: z.string().min(1, 'Title is required'),
	overview_description: z.string().min(1, 'Description is required'),
	overview_title: z.string().min(1, 'Title is required'),
	advertise_banner_description: z.string().min(1, 'Description is required'),
});

export type ZodType = z.infer<typeof schema>;

export function CrmAdvertiseContentCreate() {
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
			advertise_banner_image: undefined,
			advertise_banner_heading: '',
			get_sarted_description: '',
			get_sarted_title: '',
			overview_description: '',
			overview_title: '',
			advertise_banner_description: '',
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.message && setting) {
			form.reset({
				...setting,
				advertise_banner_image: undefined,
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
				toast.success(response.message || 'Content updated successfully');
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
				{/* About Banner Section */}
				<div>
					<h3 className="text-lg font-medium mb-4">Advertise Banner</h3>
					<div className="grid gird-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="advertise_banner_heading"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Advertise Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="advertise_banner_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Advertise description</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder="Enter description..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="advertise_banner_image"
								render={({ field }) => (
									<FormItem>
										<ImageUpload
											label="Advertise Image"
											value={field.value}
											onChange={field.onChange}
											defaultImage={`${env.baseAPI}/${setting?.advertise_banner_image}`}
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
								name="overview_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Overview Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Overview title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="overview_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Overview description</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Overview description..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="get_sarted_title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Get Started Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="get_sarted_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Get Started description</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Enter description..." />
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
