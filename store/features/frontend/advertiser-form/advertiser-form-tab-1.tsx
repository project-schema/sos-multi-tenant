'use client';

import { Loader6 } from '@/components/dashboard';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { notFound } from 'next/navigation';
import { toast } from 'sonner';
import { useFrontendCampaignCategoryQuery } from './advertiser-form-api-slice';
import { nextStep, updateLevel1 } from './advertiser-form-slice';
import style from './tab-1.style.module.css';
export function AdvertiserFormTab1() {
	const dispatch = useAppDispatch();
	const { data, isLoading, isError } = useFrontendCampaignCategoryQuery(
		undefined,
		{
			refetchOnFocus: false,
			refetchOnMountOrArgChange: false,
		}
	);
	const state = useAppSelector((state) => state.advertiseForm);

	if (isLoading) {
		return (
			<div className="py-10 max-w-lg mx-auto space-y-4">
				<Loader6 />
				<Loader6 />
				<Loader6 />
			</div>
		);
	}
	if (isError) {
		return notFound();
	}

	const onClick = () => {
		if (!state?.level1?.id) {
			return toast.error('Please select a campaign objective');
		}
		dispatch(nextStep());
	};
	return (
		<section
			id="objective"
			className={`${style.mainObjectForm} ${style.active}`}
		>
			<div className="layout">
				<h1 className={style.headingObjective}>Choose a campaign objective</h1>
				<div className={style.objectiveForm}>
					{data?.message?.map((e, i: number) => (
						<div
							onClick={() => dispatch(updateLevel1(e))}
							key={i}
							className={`${style.object} ${
								state.level1?.id === e?.id && style.active
							}`}
						>
							<div className={style.check}>
								<DynamicIcon icon={e?.icon} className={style.icon} />
							</div>
							<span className={style.objectContent}>{e?.name}</span>
						</div>
					))}
				</div>
				<button
					disabled={!state?.level1?.id}
					onClick={onClick}
					type="button"
					className={style.btnBg}
				>
					<span className={style.btnText}>Next</span>
				</button>
				<div className={style.btnB}></div>
			</div>
		</section>
	);
}
