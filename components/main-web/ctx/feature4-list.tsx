import { getApiData } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iOrgOneType } from '@/types';
import { IconEle } from '../icons/icon-ele';

export default async function Feature4List() {
	const data = await getApiData<iOrgOneType>('/org-one');
	return (
		<ul className="flex flex-col gap-[15px]">
			{data?.message?.map((e, i) => (
				<li key={e.id}>
					<MotionFadeIn
						delay={i * 0.03}
						className="flex items-center gap-[10px]"
					>
						<div className="w-10">
							<IconEle />
						</div>

						<p className="text-[#969696] text-[18px]">{e.description}</p>
					</MotionFadeIn>
				</li>
			))}
		</ul>
	);
}
