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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { alertConfirm } from '@/lib';
import { useVendorCategoryAllActiveQuery } from '@/store/features/vendor/category';
import { toast } from 'sonner';
import { useTenantStoreHomePageCategoryMutation } from './api-slice';

// --- Zod Schema ---
const schema = z.object({
	category_id: z.string().min(1, 'Please select a category'),
	status: z.enum(['active', 'inactive']),
	order: z.coerce.number().min(0, 'Order must be a positive number'),
});

type ZodType = z.infer<typeof schema>;

export function CategoryCreate() {
	const [open, setOpen] = useState(false);
	const [store, { isLoading }] = useTenantStoreHomePageCategoryMutation();

	// Fetch available categories
	const { data: categoriesData } = useVendorCategoryAllActiveQuery(undefined);

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			category_id: '',
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
						category_id: parseInt(data.category_id),
					}).unwrap();
					if (response.status === 200) {
						toast.success(
							response.message || 'Category added to home page successfully'
						);
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
					Add Category to Home Page
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Add Category to Home Page</DialogTitle>
					<DialogDescription>
						Select a category to display on the home page.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{/* Category Selection */}
						<FormField
							control={form.control}
							name="category_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Select Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Choose a category..." />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categoriesData?.categories?.map((category) => (
												<SelectItem
													key={category.id}
													value={category.id.toString()}
												>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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
								{isLoading ? 'Adding...' : 'Add to Home Page'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
