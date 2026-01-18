'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm } from '@/lib';
import { LoaderCircle, Upload, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState, type ChangeEvent } from 'react';
import { toast } from 'sonner';
import { iAdminService } from '../../admin/service';

type Gateway = 'aamarpay' | 'my-wallet';
type ValidationErrors = Partial<Record<'details' | 'files', string>>;

export const ServiceOrderCheckout = ({
	service,
	mutate,
	isLoading,
}: {
	service: iAdminService;
	mutate: (data: FormData) => any;
	isLoading: boolean;
}) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { id } = useParams<{ id: string }>();
	const { data: session } = useSession();

	const packageId = searchParams.get('package_id') || '';
	const rawPrice = Number(searchParams.get('price') || 0);
	const price = useMemo(
		() => (Number.isFinite(rawPrice) ? rawPrice : 0),
		[rawPrice]
	);

	const [details, setDetails] = useState('');
	const [files, setFiles] = useState<File[]>([]);
	const [gateway, setGateway] = useState<Gateway>('aamarpay');
	const [errors, setErrors] = useState<ValidationErrors>({});
	const selectedPackage = useMemo(
		() =>
			service?.servicepackages?.find(
				(pkg) => String(pkg.id) === String(packageId)
			),
		[service?.servicepackages, packageId]
	);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selected = Array.from(event.target.files || []);
		if (!selected.length) return;

		setFiles((prev) => [...prev, ...selected]);
		setErrors((prev) => ({ ...prev, files: undefined }));
		event.target.value = '';
	};

	const handleRemoveFile = (index: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = () => {
		if (!packageId || !id) {
			toast.error(
				'Package information is missing. Please go back and select a package.'
			);
			return;
		}

		// client-side validation
		const validation: ValidationErrors = {};
		if (!details.trim()) {
			validation.details = 'Details are required.';
		}
		if (!files.length) {
			validation.files = 'At least one file is required.';
		}

		if (validation.details || validation.files) {
			setErrors(validation);
			toast.error('Please fix the highlighted fields.');
			return;
		}

		alertConfirm({
			onOk: async () => {
				try {
					const tenant_type =
						session?.tenant_type === 'user' ? 'user' : 'tenant';
					const formData = new FormData();
					formData.append('payment_type', gateway);
					formData.append('service_package_id', packageId);
					formData.append('vendor_service_id', String(id));
					formData.append('details', details);
					formData.append('tenant_type', tenant_type);
					formData.append('tenant_id', service?.tenant_id);

					files.forEach((file) => formData.append('files[]', file));

					const response: any = await mutate(formData).unwrap();
					const paymentUrl =
						response?.payment_url || response?.message?.payment_url;

					if (paymentUrl) {
						window.location.href = paymentUrl;
						return;
					}

					if (response?.status === 200) {
						toast.success(response?.message || 'Order placed successfully');
						setErrors({});
						if (session) {
							router.push('/user/order');
						}
					} else {
						toast.error(response?.message || 'Failed to place order');
					}
				} catch (error: any) {
					const validationErrors = error?.data?.data as
						| Record<string, string[]>
						| undefined;
					if (validationErrors) {
						setErrors({
							details: validationErrors?.details?.[0],
							files: validationErrors?.files?.[0],
						});
					}
					toast.error(
						error?.data?.message || error?.message || 'Failed to place order'
					);
				}
			},
		});
	};

	const formattedPrice = useMemo(
		() =>
			price.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}),
		[price]
	);

	const gateways: { id: Gateway; name: string; description: string }[] = [
		{
			id: 'aamarpay',
			name: 'Amar Pay',
			description: 'Secure payment with Amar Pay gateway',
		},
		{
			id: 'my-wallet',
			name: 'My Wallet',
			description: 'Use your available wallet balance',
		},
	];

	if (!packageId) {
		return (
			<Alert>
				<AlertTitle>Package not selected</AlertTitle>
				<AlertDescription>
					Please choose a package before proceeding to checkout.
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<section className="py-8">
			<div className="grid gap-6  lg:grid-cols-[2fr_1fr]">
				<Card className="order-2 lg:order-1">
					<CardHeader>
						<CardTitle>Complete your order</CardTitle>
						<CardDescription>
							Add any details for the vendor, attach reference files, and pick
							your payment option.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="details">Message / requirements</Label>
							<Textarea
								id="details"
								name="details"
								rows={5}
								placeholder="Share any specific instructions for this service package..."
								value={details}
								onChange={(e) => {
									setDetails(e.target.value);
									setErrors((prev) => ({ ...prev, details: undefined }));
								}}
							/>
							{errors.details && (
								<p className="text-sm text-destructive">{errors.details}</p>
							)}
						</div>

						<div className="space-y-3">
							<Label htmlFor="files">Attachments </Label>
							<div className="flex flex-col gap-3 rounded-lg border border-dashed border-border p-4">
								<div className="flex flex-wrap items-center gap-3">
									<Button
										type="button"
										variant="outline"
										className="gap-2"
										onClick={() =>
											document.getElementById('service-files')?.click()
										}
									>
										<Upload className="h-4 w-4" />
										Upload files
									</Button>
									<span className="text-xs text-muted-foreground">
										You can attach multiple images or documents.
									</span>
								</div>

								<Input
									id="service-files"
									type="file"
									multiple
									onChange={handleFileChange}
									className="hidden"
									accept=".jpg,.jpeg,.png,.pdf"
								/>

								{files.length > 0 && (
									<div className="space-y-2">
										<p className="text-sm font-medium">Selected files</p>
										<div className="flex flex-col gap-2">
											{files.map((file, idx) => (
												<div
													key={`${file.name}-${idx}`}
													className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2 text-sm"
												>
													<div className="flex flex-col">
														<span className="font-medium">{file.name}</span>
														<span className="text-xs text-muted-foreground">
															{(file.size / 1024 / 1024).toFixed(2)} MB
														</span>
													</div>
													<Button
														type="button"
														variant="ghost"
														size="icon"
														onClick={() => handleRemoveFile(idx)}
														aria-label={`Remove ${file.name}`}
													>
														<X className="h-4 w-4" />
													</Button>
												</div>
											))}
										</div>
									</div>
								)}
								{errors.files && (
									<p className="text-sm text-destructive">{errors.files}</p>
								)}
							</div>
						</div>

						<Separator />

						<div className="space-y-3">
							<Label>Payment method</Label>
							<RadioGroup
								value={gateway}
								onValueChange={(val) => setGateway(val as Gateway)}
								className="grid gap-3 md:grid-cols-2"
							>
								{gateways.map((option) => (
									<label
										key={option.id}
										className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:border-primary"
									>
										<RadioGroupItem value={option.id} />
										<div className="space-y-1">
											<p className="text-sm font-medium">{option.name}</p>
											<p className="text-xs text-muted-foreground">
												{option.description}
											</p>
										</div>
									</label>
								))}
							</RadioGroup>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end">
						<Button
							onClick={handleSubmit}
							disabled={isLoading}
							className="w-full sm:w-auto"
						>
							{isLoading && (
								<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
							)}
							{isLoading ? 'Processing...' : 'Process to pay'}
						</Button>
					</CardFooter>
				</Card>

				<Card className="self-start order-1 lg:order-2">
					<CardHeader>
						<CardTitle>Order summary</CardTitle>
						<CardDescription>
							Review your selected package before checkout.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-1 rounded-lg border bg-muted/40 p-3">
							<p className="text-xs text-muted-foreground">Service title</p>
							<p className="text-sm font-semibold leading-snug">
								{service?.title || 'Service'}
							</p>
						</div>
						{selectedPackage && (
							<div className="space-y-2 rounded-lg border p-3">
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">Package</span>
									<span className="text-sm font-medium">
										{selectedPackage.package_title}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										Delivery
									</span>
									<span className="text-sm font-medium">
										{selectedPackage.time} days
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										Revision
									</span>
									<span className="text-sm font-medium">
										{selectedPackage.revision_max_time} times
									</span>
								</div>
							</div>
						)}

						<Separator />
						<div className="flex items-center justify-between">
							<span className="font-medium">Total</span>
							<span className="text-lg font-semibold">৳ {formattedPrice}</span>
						</div>
						<p className="text-xs text-muted-foreground">
							Charges will be processed via the selected payment method.
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};
