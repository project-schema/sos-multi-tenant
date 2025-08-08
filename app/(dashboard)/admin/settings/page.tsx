'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useAdminViewHomeContentQuery } from '@/store/features/admin/cms/home-content/admin-home-content.api.slice';
import {
	CouponSettingsForm,
	ExtraChargeSettingForm,
	ProductCreateAdvanceAmount,
	SendOtpMessageBy,
	SetDollarRate,
	TutorialLinksForm,
	VendorAffiliateTextForm,
	WithdrawSettingForm,
} from '@/store/features/admin/settings';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Settings' },
];
export default function Page() {
	const { isLoading, isError } = useAdminViewHomeContentQuery(undefined);
	return (
		<div>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isLoading={isLoading}
				isError={isError}
				header={<CardTitle>Settings</CardTitle>}
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<ProductCreateAdvanceAmount />
					<SetDollarRate />
					<SendOtpMessageBy />
					<TutorialLinksForm />
					<CouponSettingsForm />
					<WithdrawSettingForm />
					<ExtraChargeSettingForm />
					<VendorAffiliateTextForm />
				</div>
			</Container1>
		</div>
	);
}
