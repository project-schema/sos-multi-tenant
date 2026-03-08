import { getApiData } from '@/lib';
import { iOrgOneType } from '@/types';
import { IconEle } from '../icons/icon-ele';

export default async function Feature4List() {
	const data = await getApiData<iOrgOneType>('/org-one');
	return (
		<ul
			className="flex flex-col gap-[15px]"
			data-aos="fade-up"
			data-aos-duration="600"
		>
			{data?.message?.map((e) => (
				<li key={e.id} className="flex items-center gap-[10px]">
					<IconEle />

					<p className="text-[#969696] text-[18px]">{e.description}</p>
				</li>
			))}
		</ul>
	);
}
