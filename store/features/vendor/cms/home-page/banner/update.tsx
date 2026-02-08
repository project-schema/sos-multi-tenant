'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { LoaderCircle, Pen } from 'lucide-react';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, imageFormat } from '@/lib';
import { toast } from 'sonner';
import { useTenantUpdateBannerMutation } from './api-slice';
import { iBanner } from './type';

// --- Zod Schema ---
const schema = z.object({
	image: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	title: z.string().min(1, 'Title is required'),
	subtitle: z.string().optional(),
	link: z.string().optional(),
	status: z.enum(['active', 'inactive']),
	order: z.number().min(0, 'Order must be a positive number'),
});

type ZodType = z.infer<typeof schema>;

export function BannerUpdate({ editData }: { editData: iBanner }) {
	const [open, setOpen] = useState(false);
	const [updateBanner, { isLoading }] = useTenantUpdateBannerMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			image: undefined,
			title: editData.title || '',
			subtitle: editData.subtitle || '',
			link: editData.link || '',
			status: editData.status || 'active',
			order: Number(editData.order) || 0,
		},
	});

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await updateBanner({
						...data,
						id: editData.id,
					}).unwrap();
					if ((response as any).status === 'success') {
						toast.success(response.message || 'Slider updated successfully');
						setOpen(false);
					} else {
						const errorResponse = response as any;
						if (
							response.status === 'error' &&
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
					if (error?.status === 422 && typeof error.message === 'object') {
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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Pen className="h-4 w-4" />
					<span className="sr-only">Edit</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit Slider</DialogTitle>
					<DialogDescription>Update the slider information.</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{/* Image Upload */}
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<ImageUpload
										label="Slider Image"
										value={field.value}
										onChange={field.onChange}
										defaultImage={imageFormat(editData.image)}
									/>
								</FormItem>
							)}
						/>

						{/* Title */}
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter slider title..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Subtitle */}
						<FormField
							control={form.control}
							name="subtitle"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subtitle</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter slider subtitle..."
											rows={2}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Link */}
						<FormField
							control={form.control}
							name="link"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Link URL</FormLabel>
									<FormControl>
										<Input {...field} placeholder="https://example.com/page" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							{/* Status */}
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="active">Active</SelectItem>
												<SelectItem value="inactive">Inactive</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Order */}
							<FormField
								control={form.control}
								name="order"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Display Order</FormLabel>
										<FormControl>
											<Input
												{...field}
												onChange={(e) =>
													field.onChange(e.target.valueAsNumber || 0)
												}
												type="number"
												min={0}
												placeholder="0"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Updating...' : 'Update Slider'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
