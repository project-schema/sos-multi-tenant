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
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import { useAdminCampaignCategoryQuery } from '../campaign-category';
import { useAdminUpdateConversionLocationMutation } from './conversion-location.api.slice';
import { iConversionLocation } from './conversion-location.type';

// --- Zod Schema ---
const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	campaign_category_id: z.string().min(1, 'Category is required'),
});

type ZodType = z.infer<typeof schema>;

export function ConversionLocationEdit({
	editData,
}: {
	editData: iConversionLocation;
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
					<DialogTitle>Edit Category</DialogTitle>
					<DialogDescription>
						Update the category information.
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
	editData: iConversionLocation;
	setOpen: any;
}) => {
	const { data: categories, isLoading: categoryLoading } =
		useAdminCampaignCategoryQuery({ page: 1 });
	const [updateProfile, { isLoading }] =
		useAdminUpdateConversionLocationMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: editData.name || '',
			campaign_category_id: editData.category.id.toString() || '',
		},
	});

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await updateProfile({
						...data,
						id: editData.id,
					}).unwrap();
					if (response.success || response.status === 200) {
						toast.success('Updated successfully');
						form.reset();
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
			},
		});
	};
	return (
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

				{/* Select Category */}
				<FormField
					control={form.control}
					name="campaign_category_id"
					render={({ field }) => (
						<SearchableSelect
							field={field}
							label="Select Campaign Category"
							options={
								categories?.message?.data?.map((cat) => ({
									label: cat.name,
									value: cat.id.toString(),
								})) ?? []
							}
							placeholder={categoryLoading ? 'Loading...' : 'Select Category'}
						/>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Updating...' : 'Update Category'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
