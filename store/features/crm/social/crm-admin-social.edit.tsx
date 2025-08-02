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
import { IconInput } from '@/lib/icon/icon-input';
import { toast } from 'sonner';
import { useAdminUpdateCrmSocialMutation } from './crm-admin-social.api.slice';
import { iCrmSocial } from './crm-admin-social.type';

// --- Zod Schema ---
const schema = z.object({
	icon_class: z.string().min(1, 'Icon is required'),
	media_link: z.string().min(1, 'Description is required'),
});

type ZodType = z.infer<typeof schema>;

export function CrmSocialEdit({ editData }: { editData: iCrmSocial }) {
	const [open, setOpen] = useState(false);

	const [update, { isLoading }] = useAdminUpdateCrmSocialMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			icon_class: editData.icon_class || 'Zap',
			media_link: editData.media_link || '',
		},
	});

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await update({
				...data,
				id: editData.id,
			}).unwrap();
			if (response.status === 200) {
				toast.success(response.message || 'Social updated successfully');
				setOpen(false);
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
					<DialogTitle>Edit CrmSocial</DialogTitle>
					<DialogDescription>
						Update the category information.
					</DialogDescription>
				</DialogHeader>

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
								{isLoading ? 'Updating...' : 'Update Social'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
