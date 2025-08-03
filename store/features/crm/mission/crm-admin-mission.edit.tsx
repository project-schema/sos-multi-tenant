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
import { useAdminUpdateCrmMissionMutation } from './crm-admin-mission.api.slice';
import { iCrmMission } from './crm-admin-mission.type';

// --- Zod Schema ---
const schema = z.object({
	title: z.string().min(1, 'Title is required'),
	icon_class: z.string().min(1, 'Icon is required'),
});

type ZodType = z.infer<typeof schema>;

export function CrmMissionEdit({ editData }: { editData: iCrmMission }) {
	const [open, setOpen] = useState(false);

	const [update, { isLoading }] = useAdminUpdateCrmMissionMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: editData.title || '',
			icon_class: editData.icon_class || 'Zap',
		},
	});

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await update({
				...data,
				id: editData.id,
			}).unwrap();
			if (response.status === 200) {
				toast.success(response.message || 'Mission updated successfully');
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
					<DialogTitle>Edit CrmMission</DialogTitle>
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
							name="title"
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
								{isLoading ? 'Updating...' : 'Update Mission'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
