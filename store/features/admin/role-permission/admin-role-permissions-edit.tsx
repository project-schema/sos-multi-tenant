'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Pen } from 'lucide-react';
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useReducer,
	useState,
} from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Loader6 } from '@/components/dashboard';
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
import { reducer } from './role-permission-reducer';
import { initialState } from './role-permission-state';
import { iAdminRole } from './role-permission-type';
import { checkedTotal } from './role-permission-utility';
import {
	useAdminRoleWithPermissionQuery,
	useAdminUpdateRoleMutation,
} from './role-permissions-api-slice';
import RoleCard from './role-permissions-card';

// --- Zod Schema ---
const schema = z.object({
	role: z.string().min(1, 'Role name is required'),
});
type ZodType = z.infer<typeof schema>;

export function AdminRolePermissionsEdit({
	editData,
}: {
	editData: iAdminRole;
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

			<DialogContent className="w-full sm:max-w-5xl overflow-y-auto max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Update Role</DialogTitle>
					<DialogDescription>Update the information.</DialogDescription>
				</DialogHeader>
				<FORM editData={editData} setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}

const FORM = ({
	setOpen,
	editData,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
	editData: iAdminRole;
}) => {
	const { data: roles, isLoading: isLoadingCategories } =
		useAdminRoleWithPermissionQuery(
			{ id: editData.id },
			{
				skip: !editData.id,
			}
		);
	const [state, dispatch] = useReducer(reducer, initialState);
	const checkedAll = checkedTotal(state.permissionData);

	const [update, { isLoading }] = useAdminUpdateRoleMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			role: editData.name || '',
		},
	});

	useEffect(() => {
		form.reset({
			role: editData.name || '',
		});
	}, [editData]);

	useEffect(() => {
		dispatch({
			type: 'GET_USER_PERMISSION',
			payload: {
				name: roles?.name || '',
				permissions: roles?.permissions || [],
			},
		});
	}, [roles]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const res = await update({
						id: editData.id,
						permission: checkedAll.map((e) => e.path),
						role: data.role,
					}).unwrap();
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

	if (isLoadingCategories) {
		return (
			<div className="space-y-4">
				<Loader6 />
				<Loader6 />
				<Loader6 />
				<Loader6 />
			</div>
		);
	}
	return (
		<div>
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
							Update
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
		</div>
	);
};
