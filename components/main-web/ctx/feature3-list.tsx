import { getApiData } from '@/lib';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iItServicesType } from '@/types';

export default async function Feature3List() {
	const data = await getApiData<iItServicesType>('/it-services');
	return (
		<div>
			{data?.message?.map((e, i) => (
				<MotionFadeIn
					key={e.id}
					delay={i * 0.03}
					className="inline-flex items-center border border-[#0000001d] rounded-[100px] py-[9px] px-[20px] mb-[15px] mr-[15px]"
				>
					{/* <IconEle /> */}
					<DynamicIcon icon={e.icon} className="size-5" />
					<p className="font-medium">{e.title}</p>
				</MotionFadeIn>
			))}
		</div>
	);
}
