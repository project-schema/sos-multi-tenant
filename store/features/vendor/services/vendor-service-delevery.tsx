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
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { LoaderCircle, ScrollText } from 'lucide-react';
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
import { MultiImageUpload } from '@/components/ui/image-upload-multiple';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import { iAdminServiceOrder } from '../../admin/service';
import { useVendorServiceOrderDeliveryMutation } from './vendor-services-api-slice';

/*

service_order_id 32
description test
files[] (binary)
*/

// --- Schema for note ---
const noteSchema = z.object({
	description: z
		.string()
		.min(1, 'Note is required')
		.max(1000, 'Note must be less than 1000 characters'),
	files: z.array(z.instanceof(File)),
});

type NoteFormValues = z.infer<typeof noteSchema>;

export function VendorServiceDelivery({
	order,
}: {
	order: iAdminServiceOrder;
}) {
	const [open, setOpen] = useState(false);
	const [mutation, { isLoading }] = useVendorServiceOrderDeliveryMutation();
	console.log(order);
	const form = useForm<NoteFormValues>({
		resolver: zodResolver(noteSchema),
		defaultValues: {
			description: '',
			files: [],
		},
	});

	const onSubmit = async (values: NoteFormValues) => {
		alertConfirm({
			title: 'Confirm Delivery',
			content: 'Are you sure you want to deliver this service?',
			onOk: async () => {
				try {
					const response = await mutation({
						service_order_id: order.id,
						description: values.description,
						files: values.files,
						tenant_id: order.tenant_id,
					}).unwrap();

					if (response.status === 200) {
						toast.success(response.message || 'Delivery saved successfully');
						form.reset();
						setOpen(false);
					}
				} catch (error: any) {
					if (error?.status === 422 && typeof error.errors === 'object') {
						Object.entries(error.errors).forEach(([field, value]) => {
							form.setError(field as keyof NoteFormValues, {
								type: 'server',
								message: (value as string[])[0],
							});
						});
					} else {
						toast.error('Failed to save delivery');
					}
				}
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<ScrollText className="size-4" />
					</DropdownMenuShortcut>
					Add Delivery
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent
				className="sm:max-w-[400px]"
				onInteractOutside={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>Add Delivery</DialogTitle>
					<DialogDescription>test</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											rows={4}
											placeholder="Write your description here..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="files"
							render={({ field }) => (
								<FormItem>
									<MultiImageUpload
										label="Service Images (multiple choose)"
										value={field.value ?? []}
										onChange={field.onChange}
										defaultImages={[]}
									/>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Saving...' : 'Save Delivery'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
