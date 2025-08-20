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
import { useEffect, useState } from 'react';

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
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, handleValidationError } from '@/lib';
import { toast } from 'sonner';
import { useVendorDeliveryChargeUpdateMutation } from './vendor-delivery-charge-api-slice';
import { iVendorDeliveryCharge } from './vendor-delivery-charge-type';

// --- Zod Schema ---
const schema = z.object({
	charge: z.string().min(1, 'Charge is required'),
	area: z.string().optional(),
	status: z.enum(['active', 'deactive']),
});

type ZodType = z.infer<typeof schema>;

export function VendorDeliveryChargeEdit({
	editData,
}: {
	editData: iVendorDeliveryCharge;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Pen className="h-4 w-4" />
					<span className="sr-only">Edit</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Edit Delivery Charge</DialogTitle>
					<DialogDescription>Update the information.</DialogDescription>
				</DialogHeader>
				<FORM editData={editData} setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}

const FORM = ({
	editData,
	setOpen,
}: {
	editData: iVendorDeliveryCharge;
	setOpen: any;
}) => {
	const [updateProfile, { isLoading }] =
		useVendorDeliveryChargeUpdateMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			charge: editData?.charge || '',
			area: editData?.area || '',
			status: editData?.status || 'active',
		},
	});

	useEffect(() => {
		form.reset({
			status: editData?.status || 'active',
			charge: editData?.charge || '',
			area: editData?.area || '',
		});
	}, [editData]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await updateProfile({
						...data,
						id: editData.id,
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Updated successfully');
						setOpen(false);
					} else {
						const errorResponse = response as any;
						if (response.status === 400) {
							handleValidationError(errorResponse, form.setError, toast.error);
						} else {
							toast.error(response.message || 'Something went wrong');
						}
					}
				} catch (error: any) {
					if (error?.status === 400) {
						handleValidationError(error, form.setError, toast.error);
					} else {
						toast.error('Something went wrong');
					}
				}
			},
		});
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Name */}
				<FormField
					control={form.control}
					name="charge"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Charge</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Type Delivery Charge charge..."
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Description */}

				<FormField
					control={form.control}
					name="area"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Area</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Type Delivery Charge area..."
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Status */}
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="deactive">Deactive</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Updating...' : 'Update Delivery Charge'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
