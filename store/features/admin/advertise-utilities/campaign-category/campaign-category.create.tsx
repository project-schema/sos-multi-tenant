'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';

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
import { IconInput } from '@/lib/icon/icon-input';
import { toast } from 'sonner';
import { useAdminStoreCampaignCategoryMutation } from './campaign-category.api.slice';

// --- Zod Schema ---
const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	icon: z.string().min(1, 'Icon is required'),
});

type ZodType = z.infer<typeof schema>;

export function CampaignCategoryCreate() {
	const [store, { isLoading }] = useAdminStoreCampaignCategoryMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			icon: 'Zap',
		},
	});

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await store({
				...data,
			}).unwrap();
			if (response.success || response.status === 200) {
				toast.success(response.message || 'Category created successfully');
				form.reset();
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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Icon */}
				<IconInput methods={form} name="icon" />

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

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Creating...' : 'Create Category'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
