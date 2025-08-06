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
import { useAdminUpdateAdvertiseCommonUtilitiesMutation } from './common-utility.api.slice';
import {
	iAdvertiseCommonPath,
	iAdvertiseCommonUtilities,
} from './common-utility.type';

export function AdvertiseCommonUtilitiesEdit({
	editData,
	path,
}: {
	path: iAdvertiseCommonPath;
	editData: iAdvertiseCommonUtilities<iAdvertiseCommonPath>;
}) {
	const formatText = path?.replace(/_/g, '  ');
	// --- Zod Schema ---
	const schema = z.object({
		name: z.string().min(1, `${formatText} is required`),
	});

	type ZodType = z.infer<typeof schema>;

	const [open, setOpen] = useState(false);

	const [update, { isLoading }] =
		useAdminUpdateAdvertiseCommonUtilitiesMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: editData[path] || '',
		},
	});

	useEffect(() => {
		form.reset({
			name: editData[path] || '',
		});
	}, [editData]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await update({
						...data,
						colum_name: path,
						[path]: data.name,
						id: editData.id,
					}).unwrap();
					if (response.success || response.status === 200) {
						toast.success(response.message || 'Updated successfully');
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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Pen className="h-4 w-4" />
					<span className="sr-only">Edit</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Edit {formatText}</DialogTitle>
					<DialogDescription>
						Update the {formatText} information.
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
									<FormLabel className="capitalize">
										{' '}
										{formatText} Name
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={`Type ${formatText} name...`}
										/>
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
								{isLoading ? 'Updating...' : `Update`}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
