'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';
import {} from './admin-social.type';

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
import { alertConfirm } from '@/lib';
import { IconInput } from '@/lib/icon/icon-input';
import { toast } from 'sonner';
import { useAdminStoreCrmSocialMutation } from './admin-social.api.slice';

// --- Zod Schema ---
export const schema = z.object({
	icon_class: z.string().min(1, 'Icon is required'),
	media_link: z.string().min(1, 'Media Link is required'),
});

export type ZodType = z.infer<typeof schema>;

export function CrmSocialCreate() {
	const [store, { isLoading }] = useAdminStoreCrmSocialMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			icon_class: 'Zap',
			media_link: '',
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
						toast.success(response.message || 'Social Created successfully');
						form.reset();
					} else {
						const errorResponse = response as any;
						if (
							response.status === 400 &&
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
					if (error?.status === 400 && typeof error.message === 'object') {
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
				{/* Icon */}
				<IconInput methods={form} name="icon_class" />

				{/* Title */}
				<FormField
					control={form.control}
					name="media_link"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type a title..." />
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
						{isLoading ? 'Creating...' : 'Create Social'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
