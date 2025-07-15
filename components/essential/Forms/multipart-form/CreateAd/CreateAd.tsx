import { FaArrowRight, FaPlus } from 'react-icons/fa';
import style from './CreateAdd.style.module.css';
import { AppDispatch, AppState } from '../action/type';
import { useEffect, useState } from 'react';
import { USER } from '@/all-api/auth-headers';
import axios from 'axios';
import { fetchData, matchingArrayElements } from '@/components/actions/action';
import { L3_RequitedField } from '../action/common-action';
import Select from '../components/Select';
import Input from '../components/Input';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BASE_URL } from '@/lib/env';
import Radio from '../components/Radio';
// import httpI, { multipartConfig } from '../../../../all-api/axios-instance';
const CreateAd = ({
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
	const [all, setAll] = useState<any>(null);
	const [loading2, setLoading2] = useState(false);

	useEffect(() => {
		const getAll = async () => {
			// http://127.0.0.1:8000/api/front-dynamic-data/add_format/
			const api = `/api/front-dynamic-data/`;

			const add_format = await fetchData(
				api + 'add_format/' + state.level1.selected
			);
			const call_to_action = await fetchData(api + 'call_to_action');
			setAll({
				add_format: add_format?.message,
				call_to_action: call_to_action?.message,
			});
		};
		if (state?.level1?.selected) {
			getAll();
		}
	}, [state.level1.selected]);
 
	const formData = {
		...state.level1,
		...state.level2,
		...state.level3,
		ad_creative:
			state?.level3.format === 'Existing Add'
				? [{ postid: state?.level3?.postid }]
				: state.cardsCreate.cards,
		placements: [
			{ feeds: state.level2.feeds || null },
			{ story_reels: state.level2.story_reels || null },
			{ adds_video_and_reels: state.level2.adds_video_and_reels || null },
			{ search_result: state.level2.search_result || null },
			{ messages: state.level2.messages || null },
			{ apps_and_sites: state.level2.apps_and_sites || null },
		],
	};
	const { token } = USER();
	const [loading, setLoading] = useState(false);

	const submitFormThree = async () => {
		if (!data) {
			return router.push('/login');
		}
		dispatch({
			payload: {
				errorL3: false,
			},
			type: 'CLEAR_VALIDATION_ERROR',
		});
		setLoading(true);
		const url = BASE_URL + '/api/create-advertise';
		try {
			const response = await axios.post(url, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: token,
					withCredentials: true,
				},
			});
			const dataA = response.data;

			if (dataA?.message === 'Validation errors' && !dataA?.success) {
				let validationField = Object.keys(dataA.data);
				const matchingElements = matchingArrayElements(
					validationField,
					L3_RequitedField
				);
				if (matchingElements.length > 0) {
					dispatch({
						payload: {
							data: dataA?.data,
							error: {
								errorL3: true,
							},
						},
						type: 'VALIDATION_RES',
					});
					setLoading(false);
					return;
				}
				dispatch({
					payload: { errorL3: false },
					type: 'CLEAR_VALIDATION_RES',
				});
				setLoading(false);

				router.push('/advertiserForm#top-advertise');
				return controlSlides(true, { num: 4, value: true });
			}
		} catch (error) {
			setLoading(false);

			if (axios.isAxiosError(error)) {
				if (error.response?.data.message === 'Unauthenticated.') {
					router.push('/login');
				}
				return error.message;
			} else {
				return 'An unexpected error occurred';
			}
		}
		setLoading(false);
	};
	return (
		<section className={`${style.createAdSection} ${active && style.active}`}>
			<div className="layout">
				<h1 className={style.headingCreateAd}>Create Ad</h1>
				<div className={style.createAd}>
					<div className={style.formSection}>
						{/* format start */}
						<div className={style.format}>
							{/* <h1 className={style.topHeader}>Format</h1> */}
							<Radio
								name="format"
								label="Format"
								dispatch={dispatch}
								dispatchName="INPUT_L3"
								error={state.apiResponse.format ? state.apiResponse.format : ''}
								defaultValue={state.level3.format}
								select={[
									{ value: 'Existing Add', label: 'Existing Add' },
									{ value: 'New Add', label: 'New Add' },
								]}
							/>
							{/* <Select
								dispatch={dispatch}
								dispatchName="INPUT_L3"
								error={state.apiResponse.format ? state.apiResponse.format : ''}
								name="format"
								select={[
									{ value: 'format-1', label: 'Format-1' },
									{ value: 'format-2', label: 'Format-2' },
									{ value: 'format-3', label: 'Format-3' },
									{ value: 'format-4', label: 'Format-4' },
								]}
								label="Conversion Location"
								subLabel
							/> */}
						</div>
						{/* format end */}

						{/* ad creative start */}
						<div className={style.format}>
							<h1 className={style.topHeader}>
								Ad Creative{' '}
								{state.apiResponse.ad_creative && (
									<span className="text-sm text-red-500">
										{state.apiResponse.ad_creative[0]}
									</span>
								)}
							</h1>
							{state?.level3.format === 'Existing Add' ? (
								<div className={style.inputFieldGap}>
									<label className={style.labelText}>Post Id</label>
									<textarea
										onChange={(e) =>
											dispatch({
												type: 'INPUT_L3',
												payload: {
													name: 'postid',
													value: e.target.value,
												},
											})
										}
										className={style.textArea}
										name=""
										id=""
										placeholder="Post Id"
									></textarea>
								</div>
							) : (
								<>
									<div className={style.inputFieldGap}>
										<label className={style.labelText}>Format</label>
										<select
											onChange={(e) =>
												dispatch({
													type: 'INPUT_CARD',
													payload: {
														name: 'format',
														value: e.target.value,
													},
												})
											}
											className={style.selectField}
										>
											<option
												className={style.selectOption}
												selected={state.cardsCreate.init.call_to_action === ''}
												disabled
											>
												select
											</option>
											{all?.add_format?.map((e: any, i: number) => (
												<option
													key={i}
													className={style.options}
													value={e?.add_format}
												>
													{e?.add_format}
												</option>
											))}
										</select>
									</div>
									<div className={style.inputFieldGap}>
										<label className={style.labelText}>Primary Text</label>
										<textarea
											onChange={(e) =>
												dispatch({
													type: 'INPUT_CARD',
													payload: {
														name: 'primary_text',
														value: e.target.value,
													},
												})
											}
											className={style.textArea}
											name=""
											id=""
											placeholder="Drive Link"
											value={state.cardsCreate.init.primary_text}
										></textarea>
									</div>
									<div className={style.inputFieldGap}>
										<label className={style.labelText}>Media</label>
										<input
											onChange={(e) =>
												dispatch({
													type: 'INPUT_CARD',
													payload: {
														name: 'media',
														value: e.target.value,
													},
												})
											}
											className={style.selectField}
											type="text"
											name=""
											id=""
											placeholder="Drive Link"
											value={state.cardsCreate.init.media}
										/>
									</div>
									<div className={style.inputFieldGap}>
										<label className={style.labelText}>Headline</label>
										<input
											onChange={(e) =>
												dispatch({
													type: 'INPUT_CARD',
													payload: {
														name: 'heading',
														value: e.target.value,
													},
												})
											}
											className={style.selectField}
											type="text"
											name=""
											id=""
											placeholder="Type here ..."
											value={state.cardsCreate.init.heading}
										/>
									</div>
									<div className={style.inputFieldGap}>
										<label className={style.labelText}>Description</label>
										<textarea
											onChange={(e) =>
												dispatch({
													type: 'INPUT_CARD',
													payload: {
														name: 'description',
														value: e.target.value,
													},
												})
											}
											className={style.textArea}
											name=""
											id=""
											placeholder="Type here ..."
											value={state.cardsCreate.init.description}
										></textarea>
									</div>
									<div className={style.inputFieldGap}>
										<label className={style.labelText}>Call To Action</label>
										<select
											onChange={(e) =>
												dispatch({
													type: 'INPUT_CARD',
													payload: {
														name: 'call_to_action',
														value: e.target.value,
													},
												})
											}
											className={style.selectField}
										>
											<option
												className={style.selectOption}
												selected={state.cardsCreate.init.call_to_action === ''}
												disabled
											>
												select
											</option>
											{all?.call_to_action?.map((e: any, i: number) => (
												<option
													key={i}
													className={style.options}
													value={e?.call_to_action}
												>
													{e?.call_to_action}
												</option>
											))}
										</select>
									</div>
									<div className={`${style.button} lg:justify-end`}>
										<button
											onClick={() =>
												dispatch({
													type: 'CARD_CREATE',
													payload: {
														id: state.cardsCreate.cards.length
															? state.cardsCreate.cards.length
															: 0,
													},
												})
											}
											className={`${style.saveBtn} lg:!w-1/2`}
										>
											<span className={style.saveText}>
												{state.cardsCreate.cards.length <= 0
													? 'Add One'
													: 'Add Another'}
											</span>
										</button>
									</div>
								</>
							)}
						</div>
						{/* ad format end */}

						{/* destination start */}
						<div className={style.format}>
							<Input
								dispatch={dispatch}
								dispatchType="INPUT_L3"
								error={
									state.apiResponse.destination
										? state.apiResponse.destination
										: ''
								}
								label="Destination"
								name="destination"
								placeholder="Type Here..."
								type="text"
							/>
						</div>

						{/* destination end */}

						{/* Tracking start */}
						<div className={style.format}>
							<Input
								dispatch={dispatch}
								dispatchType="INPUT_L3"
								error={
									state.apiResponse.tracking ? state.apiResponse.tracking : ''
								}
								label="Tracking"
								name="tracking"
								placeholder="Type Here..."
								type="text"
							/>
						</div>
						{/* Tracking end */}

						{/* URL perimeter start */}
						<div className={style.format}>
							<Input
								dispatch={dispatch}
								dispatchType="INPUT_L3"
								error={
									state.apiResponse.url_perimeter
										? state.apiResponse.url_perimeter
										: ''
								}
								label="URL perimeter"
								name="url_perimeter"
								placeholder="Type Here..."
								type="text"
							/>
						</div>
						{/* URL perimeter end */}

						{/* Number start */}
						<div className={style.format}>
							<Input
								dispatch={dispatch}
								dispatchType="INPUT_L3_NUMBER"
								error={state.apiResponse.number ? state.apiResponse.number : ''}
								label="Whatsapp Number"
								name="number"
								placeholder="Type Here..."
								type="text"
							/>
						</div>

						{/* <span className={style.optional}>( Optional )</span> */}
						{/* URL description start */}
						<div className={style.format}>
							<Input
								dispatch={dispatch}
								dispatchType="INPUT_L3"
								label={
									<>
										<span>Description</span>{' '}
										<span className={style.optional}>( Optional )</span>
									</>
								}
								name="last_description"
								placeholder="Type Here..."
								type="text"
								error={
									state.apiResponse.last_description
										? state.apiResponse.last_description
										: ''
								}
								input="text-area"
							/>
						</div>
						{/* URL perimeter end */}
						{state.errorMessage.errorL3 && (
							<div className="alert alert-error mb-2">
								<svg
									onClick={() =>
										dispatch({
											type: 'CLEAR_VALIDATION_ERROR',
											payload: null,
										})
									}
									xmlns="http://www.w3.org/2000/svg"
									className="stroke-current shrink-0 h-6 w-6 cursor-pointer"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>Error! Please fill up all required fields.</span>
							</div>
						)}
						<button
							// onClick={() => controlSlides(true, { num: 1, value: true })}
							onClick={submitFormThree}
							className={style.checkoutBtn}
							disabled={loading}
						>
							<span className={style.checkoutText}>
								{loading ? 'Checkout....' : 'Checkout'}
							</span>
							<FaArrowRight className={style.arrowIcon} />
						</button>
					</div>
					<div className={style.rightContent_wrap}>
						<div className={style.rightContent}>
							{/* first card start */}
							{state.level3.format !== 'Existing Add' &&
								state.cardsCreate.cards.map((e, i) => (
									<div key={e.id} className={`${style.rightColumns} relative`}>
										<button
											onClick={() => {
												dispatch({
													type: 'CARD_REMOVE',
													payload: e.id,
												});
											}}
											className="absolute right-2 top-2 btn-sm text-white bg-red-500 outline-none rounded-lg"
										>
											<RiDeleteBin6Line />
										</button>
										<h5 className={style.CreateAdTopHeader}>Preview</h5>
										<hr className={style.hrLine} />
										<button className={style.CreateAdButton}>
											<span className={style.createAdButtonText}>
												Add Creative {i + 1}
											</span>
										</button>
										<p className="text-sm">Format</p>
										<p className={style.createAdParagraph}>{e.format}</p>
										<hr className={style.hrLine} />
										<p className="text-sm">Primary Text</p>
										<p className={style.createAdParagraph}>{e.primary_text}</p>
										<hr className={style.hrLine} />
										<p className="text-sm">Media</p>
										<p className={style.createAdParagraph}>{e.media}</p>

										<hr className={style.hrLine} />
										<p className="text-sm">Heading</p>
										<h4 className={style.createAdMiddleHeader}>{e.heading}</h4>
										<hr className={style.hrLine} />
										<p className="text-sm">Description</p>
										<p className={style.createAdParagraph}>{e.description}</p>
										<hr className={style.hrLine} />
										<p className="text-sm">Call TO Action</p>
										<p className={style.createAdParagraph}>
											{e.call_to_action}
										</p>
									</div>
								))}
							{/* first card end */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CreateAd;
