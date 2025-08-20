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
import { Input } from '@/components/ui/input';
import { alertConfirm, handleValidationError } from '@/lib';
import { toast } from 'sonner';
import { useVendorWooCommerceStoreMutation } from './vendor-woo-commerce-api-slice';

// --- Zod Schema ---
const schema = z.object({
	wc_key: z
		.string({ error: 'WooCommerce key is required' })
		.trim()
		.min(1, 'WooCommerce key is required'),
	wc_secret: z
		.string({ error: 'WooCommerce secret is required' })
		.trim()
		.min(1, 'WooCommerce secret is required'),
	wc_url: z
		.string({ error: 'WooCommerce URL is required' })
		.trim()
		.min(1, 'WooCommerce URL is required'),
});

type ZodType = z.infer<typeof schema>;

export function VendorWooCommerceCreateModal() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Plus className="h-4 w-4" />
					<span>WooCommerce</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Create WooCommerce</DialogTitle>
					<DialogDescription>Create a new WooCommerce.</DialogDescription>
				</DialogHeader>
				<FORM setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}

const FORM = ({ setOpen }: { setOpen: any }) => {
	const [store, { isLoading }] = useVendorWooCommerceStoreMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			wc_key: '',
			wc_secret: '',
			wc_url: '',
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Name */}
				<FormField
					control={form.control}
					name="wc_key"
					render={({ field }) => (
						<FormItem>
							<FormLabel>WooCommerce Key</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type WooCommerce key..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Name */}
				<FormField
					control={form.control}
					name="wc_secret"
					render={({ field }) => (
						<FormItem>
							<FormLabel>WooCommerce Secret</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type WooCommerce secret..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Name */}
				<FormField
					control={form.control}
					name="wc_url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>WooCommerce URL</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type WooCommerce URL..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Creating...' : 'Create WooCommerce'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
