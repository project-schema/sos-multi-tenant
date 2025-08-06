'use client';

import { SearchableSelect } from '@/components/dashboard/form';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Form, FormField } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

//  Zod Schema
const schema = z.object({
	user_id: z.string().min(1, 'User is required'),
});

type ZodType = z.infer<typeof schema>;

import { Loader6 } from '@/components/dashboard';
import { Headphones } from 'lucide-react';
import { useGetAdminMangerQuery } from '../manager/admin.manager.api.slice';
import { useAdminSupportAssignMutation } from './admin.support.api.slice';
import { iAdminSupport } from './admin.support.type';

//  Component
export function AdminSupportAssignModal({ data }: { data: iAdminSupport }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<Headphones className="size-4" />
					</DropdownMenuShortcut>
					Support Assign
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-xl w-full')}>
				<DialogHeader>
					<DialogTitle>Support Assign</DialogTitle>
				</DialogHeader>

				<FORM setOpen={setOpen} editData={data} />
			</DialogContent>
		</Dialog>
	);
}

const FORM = ({
	setOpen,
	editData,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	editData: iAdminSupport;
}) => {
	const { data, isLoading } = useGetAdminMangerQuery(undefined);
	const [update, { isLoading: isLoadingUpdate }] =
		useAdminSupportAssignMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			user_id: '',
		},
	});

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await update({
				...data,
				support_box_id: editData?.id,
			}).unwrap();

			if (response.success) {
				toast.success(response.message || 'Assigned successfully');
				form.reset();
				setOpen(false);
			} else {
				toast.error(response.message || 'Something went wrong');
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
	if (isLoading) {
		return <Loader6 />;
	}
	if (!data) {
		return <p>Error</p>;
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
				{/* Manager */}
				<FormField
					control={form.control}
					name="user_id"
					render={({ field }) => (
						<SearchableSelect
							field={field}
							label="Manager"
							options={data?.map((user) => ({
								label: `${user?.name} || ${user?.email}`,
								value: user?.id?.toString(),
							}))}
							placeholder={'Select Manager'}
						/>
					)}
				/>

				<Button disabled={isLoadingUpdate} type="submit" className="w-full">
					{isLoadingUpdate && (
						<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
					)}
					{isLoadingUpdate ? 'Assigning...' : 'Assign Support'}
				</Button>
			</form>
		</Form>
	);
};
