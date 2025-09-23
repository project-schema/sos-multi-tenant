'use client';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { alertConfirm } from '@/lib';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useVendorRechargeMutation } from './vendor-recharge-api-slice';

const plans = [
	{
		id: 'aamarpay', // should match backend value
		name: 'Amar Pay',
		description: 'Pay with Amar Pay',
		price: '$10',
	},
] as const;

export function VendorRecharge() {
	const [amount, setAmount] = useState('');
	const [gateway, setGateway] = useState<'aamarpay'>('aamarpay');
	const [mutate, { isLoading }] = useVendorRechargeMutation();

	const handleSubmit = () => {
		if (!amount || isNaN(Number(amount))) {
			toast.error('Please enter a valid amount');
			return;
		}

		alertConfirm({
			onOk: async () => {
				try {
					const response = await mutate({ amount, getwaya: gateway }).unwrap();

					if (response?.payment_url) {
						window.location.href = response.payment_url;
					} else {
						toast.error('Failed to retrieve payment URL');
					}
				} catch (error: any) {
					toast.error(error?.data?.message || 'Something went wrong');
				}
			},
			onCancel: () => {
				toast.info('Payment canceled');
			},
		});
	};

	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>Recharge</CardTitle>
					<CardDescription>Recharge your account balance</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<div className="flex flex-col gap-3">
						<Label htmlFor="amount">Amount</Label>
						<Input
							id="amount"
							type="number"
							placeholder="Enter amount..."
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							onWheel={(e) => e.currentTarget.blur()}
						/>
					</div>
					<fieldset className="flex flex-col gap-3">
						<legend className="text-sm font-medium">Payment Method</legend>
						<p className="text-muted-foreground text-sm">
							Select your preferred payment method.
						</p>
						<RadioGroup
							defaultValue={gateway}
							className="grid grid-cols-1 md:grid-cols-2 gap-3"
							onValueChange={(val) => setGateway(val as 'aamarpay')}
						>
							{plans.map((plan) => (
								<Label
									className="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/5 flex items-start gap-3 rounded-lg border p-3"
									key={plan.id}
								>
									<RadioGroupItem
										value={plan.id}
										id={plan.name}
										className="data-[state=checked]:border-primary"
									/>
									<div className="grid gap-1 font-normal">
										<div className="font-medium">{plan.name}</div>
										<div className="text-muted-foreground pr-2 text-xs leading-snug text-balance">
											{plan.description}
										</div>
									</div>
								</Label>
							))}
						</RadioGroup>
					</fieldset>
				</CardContent>
				<CardFooter>
					<Button
						onClick={handleSubmit}
						className="w-full"
						disabled={isLoading}
					>
						{isLoading && (
							<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading ? 'Processing...' : 'Continue'}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
