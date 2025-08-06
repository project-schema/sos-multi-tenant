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

import { Loader6 } from '@/components/dashboard';
import { SearchableSelect } from '@/components/dashboard/form';
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
import { toast } from 'sonner';
import { useAdminViewSupportCategoryQuery } from '../support-category';
import { useAdminUpdateSupportSubCategoryMutation } from './support-sub-category.api.slice';
import { iSupportSubCategory } from './support-sub-category.type';

// --- Zod Schema ---
const schema = z.object({
	name: z
		.string({ error: 'Name is required' })
		.trim()
		.min(1, 'Name is required'),
	support_box_category_id: z.string().min(1, 'Category is required'),
});

type ZodType = z.infer<typeof schema>;

export function SupportSubCategoryEdit({
	editData,
}: {
	editData: iSupportSubCategory;
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
					<DialogTitle>Edit Problem Topic</DialogTitle>
					<DialogDescription>
						Update the problem topic information.
					</DialogDescription>
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
	editData: iSupportSubCategory;
	setOpen: Function;
}) => {
	const { data: categories, isLoading: isLoadingCategories } =
		useAdminViewSupportCategoryQuery({ page: '' });

	const [updateProfile, { isLoading }] =
		useAdminUpdateSupportSubCategoryMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: editData.name,
			support_box_category_id: editData.support_box_category_id.toString(),
		},
	});

	useEffect(() => {
		form.reset({
			name: editData.name,
			support_box_category_id: editData.support_box_category_id.toString(),
		});
	}, [editData]);

	const onSubmit = async (data: ZodType) => {
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
				if (!response.success && typeof errorResponse.data === 'object') {
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

	if (isLoadingCategories) {
		return (
			<div className="space-y-4">
				<Loader6 />
			</div>
		);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Select Category */}
				<FormField
					control={form.control}
					name="support_box_category_id"
					render={({ field }) => (
						<SearchableSelect
							field={field}
							label="Select Category"
							options={
								categories?.message?.map((cat) => ({
									label: cat.name,
									value: cat.id.toString(),
								})) ?? []
							}
							placeholder="Select category"
						/>
					)}
				/>

				{/* Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sub Category Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Topic name..." />
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
						{isLoading ? 'Updating...' : 'Update '}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
