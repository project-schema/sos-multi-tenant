'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
	useFrontendApplyCouponMutation,
	useFrontendBuySubscriptionMutation,
	useFrontendBuySubscriptionPayMutation,
} from './api-slice';

interface SubscriptionBuyModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	subscription: any;
}

export default function SubscriptionBuyModal({
	open,
	onOpenChange,
	subscription,
}: SubscriptionBuyModalProps) {
	const { data: session } = useSession();
	const [couponCode, setCouponCode] = useState('');
	const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const [buySubscription] = useFrontendBuySubscriptionMutation();
	const [applyCoupon] = useFrontendApplyCouponMutation();
	const [buySubscriptionPay] = useFrontendBuySubscriptionPayMutation();

	const handleApplyCoupon = async () => {
		if (!couponCode.trim()) return;

		setIsProcessing(true);
		try {
			const result = await applyCoupon({ name: couponCode }).unwrap();
			setAppliedCoupon(result);
			setCouponCode('');
		} catch (error) {
			console.error('Failed to apply coupon:', error);
			// Handle error (show toast or alert)
		} finally {
			setIsProcessing(false);
		}
	};

	const handlePurchase = async () => {
		setIsProcessing(true);
		try {
			if (subscription.subscription_amount === '0') {
				// Free subscription
				await buySubscription({ id: subscription.id.toString() });
				onOpenChange(false);
				// Redirect or show success message
				window.location.href = '/dashboard'; // or wherever appropriate
			} else {
				// Paid subscription
				const paymentData = {
					subscription_id: subscription.id.toString(),
					payment_type: 'aamarpay' as const,
					coupon_id: appliedCoupon?.data?.id || null,
				};

				const result: any = await buySubscriptionPay(paymentData).unwrap();
				console.log(result);
				// Handle payment redirect or success
				if (result?.payment_url) {
					window.location.href = result.payment_url;
				}
			}
		} catch (error) {
			console.error('Purchase failed:', error);
			// Handle error (show toast or alert)
		} finally {
			setIsProcessing(false);
		}
	};

	const calculateDiscountedPrice = () => {
		const originalPrice = parseFloat(subscription.subscription_amount);
		if (appliedCoupon?.data?.discount_type === 'percentage') {
			return originalPrice * (1 - appliedCoupon.data.discount_value / 100);
		} else if (appliedCoupon?.data?.discount_type === 'fixed') {
			return Math.max(0, originalPrice - appliedCoupon.data.discount_value);
		}
		return originalPrice;
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Subscribe to {subscription.card_heading}</DialogTitle>
					<DialogDescription>
						Choose your subscription plan and complete your purchase.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* Price Section */}
					<div className="text-center p-5 bg-muted rounded-lg">
						<div className="flex items-baseline justify-center text-2xl font-bold">
							<span className="text-xl mr-1">৳</span>
							<span className="text-4xl">
								{appliedCoupon
									? calculateDiscountedPrice()
									: subscription.subscription_amount}
							</span>
							<span className="text-base font-normal text-muted-foreground ml-1">
								/{subscription.subscription_package_type.replace(/_/, ' ')}
							</span>
						</div>
						{appliedCoupon && (
							<div className="line-through text-muted-foreground text-lg mt-2">
								৳{subscription.subscription_amount}
							</div>
						)}
					</div>

					{/* Features */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Features Included:</h3>
						<ul className="space-y-2">
							{subscription.card_facilities_title.map((feature: any) => (
								<li
									key={feature.id}
									className={`flex items-center gap-2 ${
										feature.key === 'yes'
											? 'text-foreground'
											: 'text-muted-foreground'
									}`}
								>
									<span
										className={`text-sm ${
											feature.key === 'yes' ? 'text-green-500' : 'text-red-500'
										}`}
									>
										{feature.key === 'yes' ? '✓' : '✗'}
									</span>
									{feature.value}
								</li>
							))}
						</ul>
					</div>

					{/* Coupon Section */}
					{subscription.subscription_amount !== '0' && (
						<div className="p-5 bg-muted rounded-lg">
							<h3 className="text-lg font-semibold mb-3">Have a coupon?</h3>
							<div className="flex gap-3">
								<Input
									type="text"
									placeholder="Enter coupon code"
									value={couponCode}
									onChange={(e) => setCouponCode(e.target.value)}
									disabled={isProcessing}
									className="flex-1"
								/>
								<Button
									onClick={handleApplyCoupon}
									disabled={!couponCode.trim() || isProcessing}
									variant="default"
								>
									Apply
								</Button>
							</div>
							{appliedCoupon && (
								<div className="mt-3 p-2 bg-green-100 text-green-800 rounded-md text-sm">
									Coupon applied: {appliedCoupon.data?.code} (
									{appliedCoupon.data?.discount_value}
									{appliedCoupon.data?.discount_type === 'percentage'
										? '%'
										: '৳'}{' '}
									off)
								</div>
							)}
						</div>
					)}
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isProcessing}
					>
						Cancel
					</Button>
					<Button
						onClick={handlePurchase}
						disabled={isProcessing}
						className="bg-green-600 hover:bg-green-700"
					>
						{isProcessing
							? 'Processing...'
							: subscription.subscription_amount === '0'
							? 'Get Free'
							: 'Buy Now'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
