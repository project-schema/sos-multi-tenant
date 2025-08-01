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
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useAdminUpdateServiceCategoryMutation } from './service-category.api.slice';
import { iServiceCategory } from './service-category.type';

// --- Zod Schema ---
const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	status: z.enum(['active', 'deactivate']),
});

type ZodType = z.infer<typeof schema>;

export function ServiceCategoryEdit({
	editData,
}: {
	editData: iServiceCategory;
}) {
	const [open, setOpen] = useState(false);

	const [updateProfile, { isLoading }] =
		useAdminUpdateServiceCategoryMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: editData.name || '',
			status: editData.status,
		},
	});

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await updateProfile({
				...data,
				id: editData.id,
			}).unwrap();
			if (response.data === 'success') {
				toast.success(response.message || 'Category updated successfully');
				setOpen(false);
			} else {
				toast.error(response.message || 'Something went wrong');
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
	};

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
					<DialogTitle>Edit ServiceCategory</DialogTitle>
					<DialogDescription>
						Update the category information.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Type category name..." />
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
											<SelectItem value="deactivate">Deactivate</SelectItem>
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
								{isLoading ? 'Updating...' : 'Update Service Category'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
