'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox'; // Assuming you have this
import { Label } from '@/components/ui/label';
import { alertConfirm, cn } from '@/lib';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

import {
	useAdminUpdateHomeContentMutation,
	useAdminViewHomeContentQuery,
} from '../cms/home-content/admin-home-content.api.slice';

import { useEffect, useState } from 'react';

const options = ['off', 'sms', 'email'] as const;

type OtpType = (typeof options)[number];

export function SendOtpMessageBy() {
	const {
		data,
		isLoading: loading,
		refetch,
	} = useAdminViewHomeContentQuery(undefined);

	const [store, { isLoading }] = useAdminUpdateHomeContentMutation();
	const [selected, setSelected] = useState<OtpType>('off');

	useEffect(() => {
		const current = data?.message?.[0]?.otp_type;
		if (current && options.includes(current as OtpType)) {
			setSelected(current as OtpType);
		}
	}, [data]);

	const handleChange = (value: OtpType) => {
		if (value === selected) return; // No change
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({ otp_type: value }).unwrap();
					if (response.status === 200) {
						setSelected(value);
						refetch();
						toast.success(response.message || 'OTP type updated successfully');
					} else {
						toast.error('Failed to update OTP type');
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
					Send OTP Message By
				</CardTitle>
				<CardDescription>
					Choose how OTP should be delivered to users — via SMS, Email, or turn
					off.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-3">
				{loading ? (
					<div className="flex items-center space-x-2 text-muted-foreground">
						<LoaderCircle className="size-4 animate-spin" />
						<span>Loading current setting...</span>
					</div>
				) : (
					options.map((option) => (
						<div key={option} className="flex items-center space-x-3">
							<Checkbox
								id={`otp-${option}`}
								checked={selected === option}
								onCheckedChange={() => handleChange(option)}
								disabled={isLoading}
								className="scale-125"
							/>
							<Label htmlFor={`otp-${option}`} className="capitalize">
								{option}
							</Label>
						</div>
					))
				)}
			</CardContent>
		</Card>
	);
}
