import { env } from '@/lib';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import { Phone } from 'lucide-react';

export function ContactInfo({ settings }: { settings: iSystem | null }) {
	const contactInfo = settings?.footer_contact_number_one;
	if (!contactInfo) {
		return null;
	}
	return (
		<div className="hidden lg:flex items-center gap-2.5">
			<div className="w-10 h-10 bg-white border border-[#DBDFE9] rounded-full flex items-center justify-center flex-shrink-0">
				<Phone
					className="w-5 h-5  "
					style={{ color: settings.color_primary || env.color_primary }}
				/>
			</div>
			<div className="flex flex-col gap-0.5">
				<span
					className="text-xs  leading-tight"
					style={{ color: settings.color_primary || env.color_primary }}
				>
					Contact
				</span>
				<span className="text-sm font-bold text-black/70 leading-tight">
					{contactInfo}
				</span>
			</div>
		</div>
	);
}
