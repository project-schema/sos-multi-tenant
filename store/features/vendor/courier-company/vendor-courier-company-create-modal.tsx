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
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import style from './courier.module.css';
import { useVendorCourierCompanyStoreMutation } from './vendor-courier-company-api-slice';

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
import { alertConfirm, handleValidationError } from '@/lib';

// --- Zod Schema ---
const Base = z.object({
	api_key: z
		.string({ error: 'API key is required' })
		.trim()
		.min(1, 'API key is required'),
	status: z.enum(['active', 'deactive']),
});

const Pathao = Base.extend({
	courier_name: z.literal('pathao'),
	secret_key: z
		.string({ error: 'Secret key is required' })
		.trim()
		.min(1, 'Secret key is required'),
	client_email: z.email('Invalid email address'),
	client_password: z
		.string({ error: 'Client password is required' })
		.trim()
		.min(1, 'Client password is required'),
	store_id: z
		.string({ error: 'Store ID is required' })
		.trim()
		.min(1, 'Store ID is required'),
});

const Steadfast = Base.extend({
	courier_name: z.literal('steadfast'),
	secret_key: z
		.string({ error: 'Secret key is required' })
		.trim()
		.min(1, 'Secret key is required'),
});

const Redx = Base.extend({
	courier_name: z.literal('redx'),
});

const schema = z.discriminatedUnion('courier_name', [Pathao, Steadfast, Redx]);

type ZodType = z.infer<typeof schema>;

export function VendorCourierCompanyCreateModal({
	courier_name,
}: {
	courier_name: 'pathao' | 'redx' | 'steadfast';
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className={`${style.btn} ${style['btn-3']}`}>Install</button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[700px] overflow-y-auto max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Install {courier_name} courier</DialogTitle>
					<DialogDescription>
						Install {courier_name} courier in your store.
					</DialogDescription>
				</DialogHeader>
				<FORM setOpen={setOpen} courier_name={courier_name} />
			</DialogContent>
		</Dialog>
	);
}

const FORM = ({
	setOpen,
	courier_name,
}: {
	setOpen: any;
	courier_name: 'pathao' | 'redx' | 'steadfast';
}) => {
	const [store, { isLoading }] = useVendorCourierCompanyStoreMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			courier_name: courier_name,
			api_key: '',
			secret_key: '',
			client_email: '',
			store_id: '',
			client_password: '',
			status: 'active',
		},
	});

	useEffect(() => {
		if (courier_name) {
			form.setValue('courier_name', courier_name);
		}
	}, [courier_name]);

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						...data,
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Installed successfully');
						setOpen(false);
						form.reset();
					} else {
						const errorResponse = response as any;
						if (
							response.status === 400 &&
							typeof errorResponse.errors === 'object'
						) {
							handleValidationError(errorResponse, form.setError);
						} else {
							toast.error(response.message || 'Something went wrong');
						}
					}
				} catch (error: any) {
					if (error?.status === 400) {
						handleValidationError(error, form.setError);
					} else {
						toast.error('Something went wrong');
					}
				}
			},
		});
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`grid gap-6 ${
					courier_name === 'redx' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
				} `}
			>
				{/* Courier Name */}
				<FormField
					control={form.control}
					name="courier_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Courier Name</FormLabel>
							<FormControl>
								<Input readOnly {...field} placeholder="Type Courier name..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* API Key */}
				<FormField
					control={form.control}
					name="api_key"
					render={({ field }) => (
						<FormItem>
							<FormLabel>API Key</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Type API Key..." />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Secret Key */}
				{(courier_name === 'pathao' || courier_name === 'steadfast') && (
					<FormField
						control={form.control}
						name="secret_key"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Secret Key</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Type Secret Key..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{/* Client Email */}
				{courier_name === 'pathao' && (
					<FormField
						control={form.control}
						name="client_email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Client Email</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Type Client Email..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{/* Client Password */}
				{courier_name === 'pathao' && (
					<FormField
						control={form.control}
						name="client_password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Client Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										{...field}
										placeholder="Type Client Password..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{/* Store ID */}
				{courier_name === 'pathao' && (
					<FormField
						control={form.control}
						name="store_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Store ID</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Type Store ID..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{/* Status */}
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="deactive">Deactive</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter
					className={`${
						courier_name === 'redx' ? 'col-span-1' : 'col-span-1 md:col-span-2'
					}`}
				>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Installing...' : 'Install Courier'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
