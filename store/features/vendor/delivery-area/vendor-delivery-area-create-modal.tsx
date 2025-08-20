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
import { useVendorPickAndDeliveryAddressStoreMutation } from './vendor-delivery-area-api-slice';

// --- Zod Schema ---
const schema = z.object({
	address: z
		.string({ error: 'Address is required' })
		.min(1, 'Address is required'),
	status: z.enum(['active', 'deactive']),
});

type ZodType = z.infer<typeof schema>;

export function VendorPickAndDeliveryAddressCreateModal({
	type,
}: {
	type: 'pickup' | 'delivery';
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Plus className="h-4 w-4" />
					<span>{type}</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Create {type}</DialogTitle>
					<DialogDescription>Create a new {type}.</DialogDescription>
				</DialogHeader>
				<FORM setOpen={setOpen} type={type} />
			</DialogContent>
		</Dialog>
	);
}

const FORM = ({
	setOpen,
	type,
}: {
	setOpen: any;
	type: 'pickup' | 'delivery';
}) => {
	const [store, { isLoading }] = useVendorPickAndDeliveryAddressStoreMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			status: 'active',
			address: '',
		},
	});

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						...data,
						type,
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Created successfully');
						setOpen(false);
						form.reset();
					} else {
						const errorResponse = response as any;
						if (
							response.status === 400 &&
							typeof errorResponse.errors === 'object'
						) {
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
				{/* Address */}

				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder={`Type ${type} address...`} />
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
						{isLoading ? 'Creating...' : `Create Address`}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
