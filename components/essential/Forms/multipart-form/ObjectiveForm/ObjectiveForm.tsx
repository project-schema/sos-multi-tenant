// import { AppDispatch, AppState } from '../action/type';
// import style from './ObjectiveForm.style.module.css';
// import { FaMousePointer, FaArrowRight } from 'react-icons/fa';
// const ObjectiveForm = ({
// 	active,
// 	controlSlides,
// 	state,
// 	dispatch,
// }: {
// 	active: boolean;
// 	controlSlides: Function;
// 	state: AppState;
// 	dispatch: AppDispatch;
// }) => {
// 	return (
// 		<>
// 			<section className={`${style.mainObjectForm} ${active && style.active}`}>
// 				<div className="layout">
// 					<h1 className={style.headingObjective}>Choose a campaign objective</h1>
// 				</div>
// 			</section>
// 			<section className={style.fr}>
// 				<form className={style.objectiveForm}>
// 					<div
// 						onClick={() =>
// 							dispatch({
// 								type: 'INPUT_L1',
// 								payload: {
// 									name: 'campaign_objective',
// 									value: 'awareness',
// 								},
// 							})
// 						}
// 						className={`${style.object} ${state.level1.campaign_objective === 'awareness' && style.active
// 							}`}
// 					>
// 						<div className={style.check}>
// 							<svg
// 								className={style.formIcon}
// 								xmlns="http://www.w3.org/2000/svg"
// 								width="24"
// 								height="24"
// 								viewBox="0 0 24 24"
// 							>
// 								<path
// 									fill="currentColor"
// 									d="M13 14h3.5c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5h-13C2.673 2 2 2.673 2 3.5V18l5.333-4H13zm-9-.1l.154-.016L4 14v-.1z"
// 								/>
// 								<path
// 									fill="currentColor"
// 									d="M20.5 8H20v6.001c0 1.1-.893 1.993-1.99 1.999H8v.5c0 .827.673 1.5 1.5 1.5h7.167L22 22V9.5c0-.827-.673-1.5-1.5-1.5z"
// 								/>
// 							</svg>
// 						</div>
// 						<span className={style.objectContent}>Awareness</span>
// 					</div>
// 					<div
// 						onClick={() =>
// 							dispatch({
// 								type: 'INPUT_L1',
// 								payload: {
// 									name: 'campaign_objective',
// 									value: 'traffic',
// 								},
// 							})
// 						}
// 						className={`${style.object} ${state.level1.campaign_objective === 'traffic' && style.active
// 							}`}
// 					>
// 						<FaMousePointer className={style.formIcon} />
// 						<span className={style.objectContent}>Traffic</span>
// 					</div>
// 					<div
// 						onClick={() =>
// 							dispatch({
// 								type: 'INPUT_L1',
// 								payload: {
// 									name: 'campaign_objective',
// 									value: 'engagement',
// 								},
// 							})
// 						}
// 						className={`${style.object} ${state.level1.campaign_objective === 'engagement' && style.active
// 							}`}
// 					>
// 						<svg
// 							className={style.formIcon}
// 							xmlns="http://www.w3.org/2000/svg"
// 							width="24"
// 							height="24"
// 							viewBox="0 0 24 24"
// 						>
// 							<path
// 								fill="currentColor"
// 								d="M13 14h3.5c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5h-13C2.673 2 2 2.673 2 3.5V18l5.333-4H13zm-9-.1l.154-.016L4 14v-.1z"
// 							/>
// 							<path
// 								fill="currentColor"
// 								d="M20.5 8H20v6.001c0 1.1-.893 1.993-1.99 1.999H8v.5c0 .827.673 1.5 1.5 1.5h7.167L22 22V9.5c0-.827-.673-1.5-1.5-1.5z"
// 							/>
// 						</svg>
// 						<span className={style.objectContent}>Engagement</span>
// 					</div>
// 					<div
// 						onClick={() =>
// 							dispatch({
// 								type: 'INPUT_L1',
// 								payload: {
// 									name: 'campaign_objective',
// 									value: 'app promotion',
// 								},
// 							})
// 						}
// 						className={`${style.object} ${state.level1.campaign_objective === 'app promotion' &&
// 							style.active
// 							}`}
// 					>
// 						<svg
// 							className={style.formIcon}
// 							xmlns="http://www.w3.org/2000/svg"
// 							width="1024"
// 							height="1024"
// 							viewBox="0 0 1024 1024"
// 						>
// 							<path
// 								fill="currentColor"
// 								d="m64 448l832-320l-128 704l-446.08-243.328L832 192L242.816 545.472L64 448zm256 512V657.024L512 768L320 960z"
// 							/>
// 						</svg>
// 						<span className={style.objectContent}>App Promotion</span>
// 					</div>
// 					<div
// 						onClick={() =>
// 							dispatch({
// 								type: 'INPUT_L1',
// 								payload: {
// 									name: 'campaign_objective',
// 									value: 'leads',
// 								},
// 							})
// 						}
// 						className={`${style.object} ${state.level1.campaign_objective === 'leads' && style.active
// 							}`}
// 					>
// 						<svg
// 							className={style.formIcon}
// 							xmlns="http://www.w3.org/2000/svg"
// 							width="1024"
// 							height="1024"
// 							viewBox="0 0 1024 1024"
// 						>
// 							<path
// 								fill="currentColor"
// 								d="m64 448l832-320l-128 704l-446.08-243.328L832 192L242.816 545.472L64 448zm256 512V657.024L512 768L320 960z"
// 							/>
// 						</svg>
// 						<span className={style.objectContent}>Leads</span>
// 					</div>
// 					<div
// 						onClick={() =>
// 							dispatch({
// 								type: 'INPUT_L1',
// 								payload: {
// 									name: 'campaign_objective',
// 									value: 'sales',
// 								},
// 							})
// 						}
// 						className={`${style.object} ${state.level1.campaign_objective === 'sales' && style.active
// 							}`}
// 					>
// 						<svg
// 							className={style.formIcon}
// 							xmlns="http://www.w3.org/2000/svg"
// 							width="24"
// 							height="24"
// 							viewBox="0 0 24 24"
// 						>
// 							<path
// 								fill="currentColor"
// 								d="m18.65 2.85l.61 3.86l3.51 1.79L21 12l1.78 3.5l-3.54 1.79l-.61 3.86l-3.89-.61l-2.77 2.76l-2.78-2.8l-3.86.64l-.62-3.89l-3.49-1.78L3 11.97L1.23 8.5l3.51-1.81l.61-3.83l3.87.64L12 .69l2.77 2.77l3.88-.61M9.5 7A1.5 1.5 0 0 0 8 8.5A1.5 1.5 0 0 0 9.5 10A1.5 1.5 0 0 0 11 8.5A1.5 1.5 0 0 0 9.5 7m5 7a1.5 1.5 0 0 0-1.5 1.5a1.5 1.5 0 0 0 1.5 1.5a1.5 1.5 0 0 0 1.5-1.5a1.5 1.5 0 0 0-1.5-1.5m-6.09 3L17 8.41L15.59 7L7 15.59L8.41 17Z"
// 							/>
// 						</svg>
// 						<span className={style.objectContent}>Sales</span>
// 					</div>
// 				</form>
// 				<button
// 					type="button"
// 					onClick={() => controlSlides(true, { num: 2, value: true })}
// 					className={style.btnBg}
// 					disabled={!state.level1.complete}
// 				>
// 					<span className={style.btnText}>Next</span>
// 					<FaArrowRight className={style.arrowIcon} />
// 				</button>
// 			</section>
// 		</>

// 	);
// };

// export default ObjectiveForm;

import { useRouter } from 'next/router';
import { AppDispatch, AppState } from '../action/type';
import style from './ObjectiveForm.style.module.css';
import { FaArrowRight } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { IconPickerItem } from 'react-fa-icon-picker';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/actions/action';

const ObjectiveForm = ({
	active,
	controlSlides,
	state,
	dispatch,
}: {
	active: boolean;
	controlSlides: Function;
	state: AppState;
	dispatch: AppDispatch;
}) => {
	const router = useRouter();
	const { data } = useSession();

	const handleNext = () => {
		if (data) {
			controlSlides(true, { num: 2, value: true });
			return router.push('/advertiserForm#top-advertise');
		}
		return router.push('/login');
	};
	const [category, setCategory] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			// http://127.0.0.1:8000/api/front-campaign-category
			// Awareness Traffic Engagement  App Promotion  Leads  Sales
			const res = await fetchData('/api/front-campaign-category');
			setCategory(res?.message);
			setLoading(false);
		};
		getData();
	}, []);
	return (
		<section
			id="objective"
			className={`${style.mainObjectForm} ${active && style.active}`}
		>
			<div className="layout">
				<h1 className={style.headingObjective}>Choose a campaign objective</h1>
				<form className={style.objectiveForm}>
					{category?.map((e: any, i: number) => (
						<div
							key={i}
							onClick={() =>
								dispatch({
									type: 'INPUT_L1',
									payload: {
										name: 'campaign_objective',
										selected: e?.id,
										value: e?.name,
									},
								})
							}
							className={`${style.object} ${
								state.level1.selected === e?.id && style.active
							}`}
						>
							<div className={style.check}>
								<IconPickerItem icon={e?.icon} size={30} color="#969696" />
							</div>
							<span className={style.objectContent}>{e?.name}</span>
						</div>
					))}
					{/* <div
						onClick={() =>
							dispatch({
								type: 'INPUT_L1',
								payload: {
									name: 'campaign_objective',
									value: 'awareness',
								},
							})
						}
						className={`${style.object} ${
							state.level1.campaign_objective === 'awareness' && style.active
						}`}
					>
						<div className={style.check}>
							<svg
								className={style.formIcon}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M13 14h3.5c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5h-13C2.673 2 2 2.673 2 3.5V18l5.333-4H13zm-9-.1l.154-.016L4 14v-.1z"
								/>
								<path
									fill="currentColor"
									d="M20.5 8H20v6.001c0 1.1-.893 1.993-1.99 1.999H8v.5c0 .827.673 1.5 1.5 1.5h7.167L22 22V9.5c0-.827-.673-1.5-1.5-1.5z"
								/>
							</svg>
						</div>
						<span className={style.objectContent}>Awareness</span>
					</div>
					<div
						onClick={() =>
							dispatch({
								type: 'INPUT_L1',
								payload: {
									name: 'campaign_objective',
									value: 'traffic',
								},
							})
						}
						className={`${style.object} ${
							state.level1.campaign_objective === 'traffic' && style.active
						}`}
					>
						<FaMousePointer className={style.formIcon} />
						<span className={style.objectContent}>Traffic</span>
					</div>
					<div
						onClick={() =>
							dispatch({
								type: 'INPUT_L1',
								payload: {
									name: 'campaign_objective',
									value: 'engagement',
								},
							})
						}
						className={`${style.object} ${
							state.level1.campaign_objective === 'engagement' && style.active
						}`}
					>
						<svg
							className={style.formIcon}
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M13 14h3.5c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5h-13C2.673 2 2 2.673 2 3.5V18l5.333-4H13zm-9-.1l.154-.016L4 14v-.1z"
							/>
							<path
								fill="currentColor"
								d="M20.5 8H20v6.001c0 1.1-.893 1.993-1.99 1.999H8v.5c0 .827.673 1.5 1.5 1.5h7.167L22 22V9.5c0-.827-.673-1.5-1.5-1.5z"
							/>
						</svg>
						<span className={style.objectContent}>Engagement</span>
					</div>
					<div
						onClick={() =>
							dispatch({
								type: 'INPUT_L1',
								payload: {
									name: 'campaign_objective',
									value: 'app promotion',
								},
							})
						}
						className={`${style.object} ${
							state.level1.campaign_objective === 'app promotion' &&
							style.active
						}`}
					>
						<svg
							className={style.formIcon}
							xmlns="http://www.w3.org/2000/svg"
							width="1024"
							height="1024"
							viewBox="0 0 1024 1024"
						>
							<path
								fill="currentColor"
								d="m64 448l832-320l-128 704l-446.08-243.328L832 192L242.816 545.472L64 448zm256 512V657.024L512 768L320 960z"
							/>
						</svg>
						<span className={style.objectContent}>App Promotion</span>
					</div>
					<div
						onClick={() =>
							dispatch({
								type: 'INPUT_L1',
								payload: {
									name: 'campaign_objective',
									value: 'leads',
								},
							})
						}
						className={`${style.object} ${
							state.level1.campaign_objective === 'leads' && style.active
						}`}
					>
						<svg
							className={style.formIcon}
							xmlns="http://www.w3.org/2000/svg"
							width="1024"
							height="1024"
							viewBox="0 0 1024 1024"
						>
							<path
								fill="currentColor"
								d="m64 448l832-320l-128 704l-446.08-243.328L832 192L242.816 545.472L64 448zm256 512V657.024L512 768L320 960z"
							/>
						</svg>
						<span className={style.objectContent}>Leads</span>
					</div>
					<div
						onClick={() =>
							dispatch({
								type: 'INPUT_L1',
								payload: {
									name: 'campaign_objective',
									value: 'sales',
								},
							})
						}
						className={`${style.object} ${
							state.level1.campaign_objective === 'sales' && style.active
						}`}
					>
						<svg
							className={style.formIcon}
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="m18.65 2.85l.61 3.86l3.51 1.79L21 12l1.78 3.5l-3.54 1.79l-.61 3.86l-3.89-.61l-2.77 2.76l-2.78-2.8l-3.86.64l-.62-3.89l-3.49-1.78L3 11.97L1.23 8.5l3.51-1.81l.61-3.83l3.87.64L12 .69l2.77 2.77l3.88-.61M9.5 7A1.5 1.5 0 0 0 8 8.5A1.5 1.5 0 0 0 9.5 10A1.5 1.5 0 0 0 11 8.5A1.5 1.5 0 0 0 9.5 7m5 7a1.5 1.5 0 0 0-1.5 1.5a1.5 1.5 0 0 0 1.5 1.5a1.5 1.5 0 0 0 1.5-1.5a1.5 1.5 0 0 0-1.5-1.5m-6.09 3L17 8.41L15.59 7L7 15.59L8.41 17Z"
							/>
						</svg>
						<span className={style.objectContent}>Sales</span>
					</div> */}
				</form>
				<button
					type="button"
					onClick={handleNext}
					className={style.btnBg}
					disabled={!state.level1.complete}
				>
					<span className={style.btnText}>Next</span>
					<FaArrowRight className={style.arrowIcon} />
				</button>
				<div className={style.btnB}></div>
			</div>
		</section>
	);
};

export default ObjectiveForm;
