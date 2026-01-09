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
import { LoaderCircle, Plus } from 'lucide-react';
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
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import { useTenantStoreServiceMutation } from './api-slice';

// --- Zod Schema ---
const schema = z.object({
	icon: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Icon is required' }),
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	status: z.enum(['active', 'inactive']),
	order: z.coerce.number().min(0, 'Order must be a positive number'),
});

type ZodType = z.infer<typeof schema>;

export function ServiceCreate() {
	const [open, setOpen] = useState(false);
	const [store, { isLoading }] = useTenantStoreServiceMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			icon: undefined,
			title: '',
			description: '',
			status: 'active',
			order: 0,
		},
	});

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						...data,
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Service created successfully');
						form.reset();
						setOpen(false);
					} else {
						const errorResponse = response as any;
						if (
							response.status === 422 &&
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
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Add Service
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Create Service</DialogTitle>
					<DialogDescription>
						Add a new service to display on the homepage.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{/* Icon Upload */}
						<FormField
							control={form.control}
							name="icon"
							render={({ field }) => (
								<FormItem>
									<ImageUpload
										label="Service Icon"
										value={field.value}
										onChange={field.onChange}
										defaultImage={null}
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
										<Input {...field} placeholder="Enter service title..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Description */}
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter service description..."
											rows={3}
										/>
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
											<Input {...field} type="number" min={0} placeholder="0" />
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
								{isLoading ? 'Creating...' : 'Create Service'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}