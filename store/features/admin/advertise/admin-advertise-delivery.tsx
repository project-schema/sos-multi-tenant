'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { MultiImageUpload } from '@/components/ui/image-upload-multiple';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Truck } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAdminAdvertiseDeliveryMutation } from './admin.advertise.api.slice';
import { iAdminAdvertise } from './admin.advertise.type';

const schema = z.object({
	images: z
		.array(
			z
				.instanceof(File)
				.refine((file) => file.size > 0, { message: 'Empty file detected' })
		)
		.min(1, { message: 'At least one image is required' }),
});

type ZodType = z.infer<typeof schema>;

//  Component
export function AdminAdvertiseDelivery({ data }: { data: iAdminAdvertise }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<Truck className="size-4" />
					</DropdownMenuShortcut>
					Delivery Advertise
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-2xl w-full')}>
				<DialogHeader>
					<DialogTitle>Delivery Advertise</DialogTitle>
				</DialogHeader>

				<FORM setOpen={setOpen} editData={data} />
			</DialogContent>
		</Dialog>
	);
}

const FORM = ({
	setOpen,
	editData,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	editData: iAdminAdvertise;
}) => {
	const [update, { isLoading }] = useAdminAdvertiseDeliveryMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			images: [],
		},
	});

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await update({
				...data,
				advertise_id: editData.id,
				images: data.images,
			}).unwrap();

			if (response.status === 200) {
				toast.success(response.message || 'Delivery successfully');
				form.reset();
				setOpen(false);
			} else {
				const errorResponse = response as any;
				if (typeof errorResponse.data === 'object') {
					Object.entries(errorResponse.data).forEach(([field, value]) => {
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
				{/* Image Upload */}
				<FormField
					control={form.control}
					name="images"
					render={({ field }) => (
						<FormItem>
							<MultiImageUpload
								label="Upload Screenshots"
								value={field.value}
								onChange={field.onChange}
							/>
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
					{isLoading ? 'Submitting...' : 'Submit'}
				</Button>
			</form>
		</Form>
	);
};
