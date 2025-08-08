'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
// schema.ts
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import { z } from 'zod';
import { reducer } from './role-permission-reducer';
import { initialState } from './role-permission-state';
import { checkedTotal } from './role-permission-utility';
import { useAdminRoleCreateMutation } from './role-permissions-api-slice';
import RoleCard from './role-permissions-card';

const schema = z.object({
	role: z.string().min(1, 'Role name is required'),
});
type ZodType = z.infer<typeof schema>;

function CreateRole() {
	const [open, setOpen] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);
	const [store, { isLoading }] = useAdminRoleCreateMutation();

	const checkedAll = checkedTotal(state.permissionData);

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			role: '',
		},
	});

	const onSubmit = (data: ZodType) => {
		if (checkedAll.length === 0) {
			dispatch({
				type: 'API_VALIDATION',
				payload: {
					role: null,
					permission: 'At least one permission is required',
				},
			});
			return;
		}

		alertConfirm({
			onOk: async () => {
				dispatch({
					type: 'API_VALIDATION',
					payload: { role: null, permission: null },
				});

				const formData = {
					role: data.role,
					permission: checkedAll.map((e) => e.path),
				};

				try {
					const res = await store(formData).unwrap(); // RTK mutation

					if (res?.message === 'Validation errors') {
						dispatch({
							type: 'API_VALIDATION',
							payload: res?.data,
						});
						toast.error('Required! Please fill in all fields');
						Object.entries(res.data).forEach(([field, value]) => {
							form.setError(field as keyof ZodType, {
								type: 'server',
								message: (value as string[])[0],
							});
						});
						return;
					}

					if (res?.success || res?.data === 'success') {
						toast.success(res?.message);
						form.reset();
						setOpen(false);
					}
				} catch (error: any) {
					console.error('Failed to create role:', error);
					toast.error(
						error?.data?.message ||
							'Something went wrong Please try again later'
					);
				}
			},

			onCancel: () => {
				// Optional: log or notify
				console.log('Role creation canceled by user');
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="">
				<Button>Create User Role</Button>
			</DialogTrigger>

			<DialogContent className="w-full sm:max-w-5xl overflow-y-auto max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Create User Role </DialogTitle>
					<DialogDescription>Create the role </DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4 max-w-2xl"
					>
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter Role Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center gap-2">
							<Button type="submit" disabled={isLoading}>
								Save
							</Button>
						</div>
					</form>
				</Form>

				<div className="flex justify-between items-center mt-6 mb-3">
					<h1 className="text-md font-semibold">
						Select Permissions
						{state.apiRes?.permission && (
							<span className="text-red-500 text-sm ml-2">
								{state.apiRes.permission}
							</span>
						)}
					</h1>
					{checkedAll.length > 0 && (
						<Button
							variant="destructive"
							onClick={() => dispatch({ type: 'CLEAR_ALL_CHECKED' })}
							size="sm"
						>
							Clear {checkedAll.length > 1 && 'All'}{' '}
							<span className="ml-1 bg-white text-black px-2 rounded-full">
								{checkedAll.length}
							</span>
						</Button>
					)}
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   gap-4">
					{state.permissionData.map((e, i) => (
						<RoleCard key={i} dispatch={dispatch} data={e} />
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default CreateRole;
