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
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useVendorSupplierStoreMutation } from './vendor-supplier-api-slice';

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

// --- Zod Schema ---
const schema = z.object({
	supplier_name: z
		.string({ error: 'Name is required' })
		.trim()
		.min(1, 'Name is required'),
	business_name: z.string().optional(),
	phone: z
		.string({ error: 'Phone number is required' })
		.trim()
		.min(1, 'Phone number is required'),
	email: z.union([
		z.string().email('Invalid email address').trim(),
		z.literal(''),
	]),
	address: z.string().optional(),
	description: z.string().optional(),
	status: z.enum(['active', 'deactive']),
});

type ZodType = z.infer<typeof schema>;

export function VendorSupplierCreateModal() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Plus className="h-4 w-4" />
					<span>Supplier</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[700px] overflow-y-auto max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Create Supplier</DialogTitle>
					<DialogDescription>Create a new supplier.</DialogDescription>
				</DialogHeader>
				<FORM setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}

const FORM = ({ setOpen }: { setOpen: any }) => {
	const [store, { isLoading }] = useVendorSupplierStoreMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			supplier_name: '',
			business_name: '',
			phone: '',
			email: '',
			address: '',
			status: 'active',
			description: '',
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
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				{/* Supplier Name */}
				<FormField
					control={form.control}
					name="supplier_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Supplier Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type Supplier name..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Company Name */}
				<FormField
					control={form.control}
					name="business_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type Company name..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Phone Number */}
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type phone number..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type email..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Address */}
				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder="Type address..." />
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
									placeholder="Type Supplier description..."
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

				<DialogFooter className="col-span-1 md:col-span-2">
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Creating...' : 'Create Supplier'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
