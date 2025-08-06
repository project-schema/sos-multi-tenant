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
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
import { toast } from 'sonner';
import { useAdminCampaignCategoryQuery } from '../campaign-category';
import { useAdminGetConversionLocationQuery } from '../conversion-location';
import { useAdminUpdatePerformanceGoalMutation } from './performance-goal.api.slice';
import { iPerformanceGoal } from './performance-goal.type';

// --- Zod Schema ---
const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	campaign_category_id: z.string().min(1, 'Category is required'),
	conversion_location_id: z.string().min(1, 'Conversion location is required'),
});

type ZodType = z.infer<typeof schema>;

export function PerformanceGoalEdit({
	editData,
}: {
	editData: iPerformanceGoal;
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
	editData: iPerformanceGoal;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const { data: categories, isLoading: categoryLoading } =
		useAdminCampaignCategoryQuery({ page: 1 });
	const [updateProfile, { isLoading }] =
		useAdminUpdatePerformanceGoalMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: editData.name || '',
			campaign_category_id: editData?.category?.id?.toString() || '',
			conversion_location_id:
				editData?.conversion_location?.id?.toString() || '',
		},
	});

	useEffect(() => {
		form.reset({
			name: editData.name || '',
			campaign_category_id: editData?.category?.id?.toString() || '',
			conversion_location_id:
				editData?.conversion_location?.id?.toString() || '',
		});
	}, [editData]);

	const { data: conversionLocation, isLoading: conversionLocationLoading } =
		useAdminGetConversionLocationQuery(
			{
				id: form.watch('campaign_category_id'),
			},
			{
				skip: !form.watch('campaign_category_id'),
			}
		);

	const selectedCategory = form.watch('campaign_category_id');
	const selectedLocation = form.watch('conversion_location_id');

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
				{/* Select Category */}
				<FormField
					control={form.control}
					name="campaign_category_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Campaign Category</FormLabel>
							<Select
								onValueChange={(e) => {
									field.onChange(e);
									form.setValue('conversion_location_id', '');
								}}
								defaultValue={field.value.toString()}
							>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue
											placeholder={
												categoryLoading ? 'Loading...' : 'Select Category'
											}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories?.message?.data?.map((location) => (
										<SelectItem
											key={location.id}
											value={location.id.toString()}
										>
											{location.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Select Category */}

				<FormField
					control={form.control}
					name="conversion_location_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Conversion Location</FormLabel>
							{conversionLocationLoading ? (
								<p>Loading...</p>
							) : (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value.toString()}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue
												placeholder={
													conversionLocationLoading
														? 'Loading...'
														: 'Select Category'
												}
											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{conversionLocation?.locations?.map((location) => (
											<SelectItem
												key={location.id}
												value={location.id.toString()}
											>
												{location.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}

							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Name */}

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type name..." />
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
						{isLoading ? 'Updating...' : 'Update Category'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
