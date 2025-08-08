'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { alertConfirm, cn } from '@/lib';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
	useAdminUpdateHomeContentMutation,
	useAdminViewHomeContentQuery,
} from '../cms/home-content/admin-home-content.api.slice';

export function ProductCreateAdvanceAmount() {
	const {
		data,
		isLoading: loading,
		refetch,
		isError,
	} = useAdminViewHomeContentQuery(undefined);

	const [store, { isLoading }] = useAdminUpdateHomeContentMutation();

	const onSubmit = async (isEnabled: boolean) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						is_advance: isEnabled ? '1' : '0',
					}).unwrap();

					if (response.status === 200) {
						refetch();
						toast.success(response.message || 'Updated successfully');
					} else {
						toast.error('Failed to update');
					}
				} catch (error: any) {
					toast.error('Something went wrong');
				}
			},
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className={cn('text-lg xl:text-xl')}>
					Product Create Advance Amount
				</CardTitle>
				<CardDescription>
					When Merchant Create a product. Merchant need minimum One product
					balance in Merchant account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center space-x-3">
					<Switch
						className={cn('scale-125')}
						id="airplane-mode"
						checked={data?.message[0]?.is_advance === 1}
						onCheckedChange={(e) => {
							onSubmit(e);
						}}
						disabled={loading || isLoading}
					/>
					<Label htmlFor="airplane-mode">
						{isLoading && <LoaderCircle className="size-4 animate-spin" />}
						{!isLoading && data?.message[0]?.is_advance === 1 ? 'ON' : 'OFF'}
					</Label>
				</div>
			</CardContent>
		</Card>
	);
}
