'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';
import { } from './partner.type';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { ImageUpload } from '@/components/ui/image-upload';
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import { useAdminStoreCrmPartnerMutation } from './partner.api.slice';

// --- Zod Schema ---
export const schema = z.object({
	image: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
});

export type ZodType = z.infer<typeof schema>;

export function CrmPartnerCreate() {
	const [store, { isLoading }] = useAdminStoreCrmPartnerMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			image: undefined,
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
						toast.success(response.message || 'Profile updated successfully');
						form.reset();
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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Image Upload */}
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<ImageUpload
								label="Partner Image"
								value={field.value}
								onChange={field.onChange}
								defaultImage={null}
							/>
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Creating...' : 'Create Partner'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
