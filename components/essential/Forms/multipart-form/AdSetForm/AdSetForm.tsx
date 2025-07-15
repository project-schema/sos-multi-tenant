/* eslint-disable @next/next/no-img-element */
import { FaArrowRight } from 'react-icons/fa';
import style from './AdSetForm.style.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-country-state-city/dist/react-country-state-city.css';
import Input from '../components/Input';
import { AppDispatch, AppState } from '../action/type';
import Select from '../components/Select';
import FileUpLoad from '../components/FileUpLoad';
import { L2_RequitedField } from '../action/common-action';
import axios from 'axios';
import {
	beZero,
	calculateBudgetWidthTimeDifference,
	convertDate,
	fetchData,
	matchingArrayElements,
} from '@/components/actions/action';
import { USER } from '@/all-api/auth-headers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ImageView from '../components/ImageView';
import { BASE_URL } from '@/lib/env';
import Radio from '../components/Radio';
import SelectMultiCheckbox from '../components/SelectMultiCheckbox';
import SelectCountry from '../components/SelectCountry';
const AdSetForm = ({
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
	const { token } = USER();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { data } = useSession();
	const [conLocation, setConLocation] = useState<any>(null);
	const [performanceGoal, setPerformanceGoal] = useState<any>(null);
	const [all, setAll] = useState<any>(null);
	const [city, setCity] = useState<any>(null);
	const [loading2, setLoading2] = useState(false);
	const [dollar, setDollar] = useState('0');
	useEffect(() => {
		const getDollarRate = async () => {
			try {
				const res = await axios.get(BASE_URL + '/api/doller-rate');
				setDollar(res.data.message.amount);
			} catch (error) {
 			}
		};

		getDollarRate();
	}, []);
	const api = `/api/front-campaign-converstion-location/${state?.level1?.selected}`;
	const api2 = `/api/front-campaign-performance-goal/${state?.level1?.selected}`;
	useEffect(() => {
		const getAll = async () => {
			// http://127.0.0.1:8000/api/front-dynamic-data/device
			const api = `/api/front-dynamic-data/`;
			const audience_age = await fetchData(api + 'audience_age');
			const audience_age_to = await fetchData(api + 'audience_age_to');
			const device = await fetchData(api + 'device');
			const platform = await fetchData(api + 'platform');
			const feed = await fetchData(api + 'feed');
			const store_reel = await fetchData(api + 'store_reel');
			const video_reel = await fetchData(api + 'video_reel');
			const search_reel = await fetchData(api + 'search_reel');
			const messages_reel = await fetchData(api + 'messages_reel');
			const apps_web = await fetchData(api + 'apps_web');
			const country = await fetchData('/api/countries');

			setAll({
				audience_age: audience_age?.message,
				audience_age_to: audience_age_to?.message,
				device: device?.message,
				store_reel: store_reel?.message,
				platform: platform?.message,
				feed: feed?.message,
				video_reel: video_reel?.message,
				search_reel: search_reel?.message,
				messages_reel: messages_reel?.message,
				apps_web: apps_web?.message,
				country: country,
			});
		};

		getAll();
	}, []);

	useEffect(() => {
		const getData = async () => {
			// http://127.0.0.1:8000/api/front-campaign-converstion-location/1
			const res = await fetchData(api);
			setConLocation(res?.message);
			dispatch({
				type: 'INPUT_L2',
				payload: {
					name: 'conversion_location',
					value: res?.message?.[0]?.name,
				},
			});
		};

		const getData2 = async () => {
			// http://127.0.0.1:8000/api/front-campaign-converstion-location/1
			const res = await fetchData(api2);
			setPerformanceGoal(res?.message);
			dispatch({
				type: 'INPUT_L2',
				payload: {
					name: 'performance_goal',
					value: res?.message?.[0]?.name,
				},
			});
		};

		if (state?.level1?.campaign_objective) {
			getData();
			getData2();
		}
	}, [state?.level1?.selected]);

	// get sub city
	useEffect(() => {
		const getCityData = async () => {
			setLoading2(true);
			const res = await fetchData(`/api/cities/${state.level2.countryID}`);
			setCity(res);
			setLoading2(false);
		};
		if (state.level2.countryID) {
			getCityData();
			dispatch({
				type: 'INPUT_L2',
				payload: {
					name: 'city',
					value: [],
				},
			});
		}
	}, [state.level2.countryID]);
	const submitFormTwo = async () => {
		if (!data) {
			return router.push('/login');
		}
		dispatch({
			payload: {
				errorL2: false,
			},
			type: 'CLEAR_VALIDATION_ERROR',
		});
		setLoading(true);
		const formData = {
			...state.level2,
			end_date: convertDate(state.level2.end_date_view as Date),
			start_date: convertDate(state.level2.start_date_view as Date),

			placements: [
				{ feeds: state.level2.feeds || null },
				{ story_reels: state.level2.story_reels || null },
				{ adds_video_and_reels: state.level2.adds_video_and_reels || null },
				{ search_result: state.level2.search_result || null },
				{ messages: state.level2.messages || null },
				{ apps_and_sites: state.level2.apps_and_sites || null },
			],
			advertise_audience_files: state.level2.advertise_audience_files.map(
				(e) => e.url
			),
			location_files: state.level2.location_files.map((e) => e.url),
		};
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
					L2_RequitedField
				);
				if (matchingElements.length > 0) {
					dispatch({
						payload: {
							data: dataA?.data,
							error: {
								errorL2: true,
							},
						},
						type: 'VALIDATION_RES',
					});
					setLoading(false);
					return;
				}
				dispatch({
					payload: { errorL2: false },
					type: 'CLEAR_VALIDATION_RES',
				});
				setLoading(false);

				router.push('/advertiserForm#top-advertise');
				return controlSlides(true, { num: 3, value: true });
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
		<section className={`${style.adSetSectin} ${active && style.active}`}>
			<h1 className={style.headingAdSet}>Ad Set</h1>
			<form>
				{/* companing name */}
				<div className={style.adSet}>
					<Input
						dispatch={dispatch}
						dispatchType="INPUT_L2"
						error={
							state.apiResponse.campaign_name
								? state.apiResponse.campaign_name
								: ''
						}
						label="Campaign Name"
						name="campaign_name"
						placeholder="Campaign..."
						type="text"
					/>
				</div>

				<div className={style.adSet}>
					{/* Conversion Location */}

					<Radio
						grid="sm:grid-cols-1"
						name="conversion_location"
						label="Conversion Location"
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						error={
							state.apiResponse.conversion_location
								? state.apiResponse.conversion_location
								: ''
						}
						defaultValue={state.level2.conversion_location}
						select={conLocation?.map((e: any) => ({
							value: e?.name,
							label: e?.name,
						}))}
					/>
					<Radio
						grid="sm:grid-cols-1"
						name="performance_goal"
						label="Performance Goal"
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						error={
							state.apiResponse.performance_goal
								? state.apiResponse.performance_goal
								: ''
						}
						defaultValue={state.level2.performance_goal}
						select={performanceGoal?.map((e: any) => ({
							value: e?.name,
							label: e?.name,
						}))}
					/>
					{/* <Select
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						error={
							state.apiResponse.conversion_location
								? state.apiResponse.conversion_location
								: ''
						}
						name="conversion_location"
						select={[
							{ value: 'Website', label: 'Website' },
							{ value: 'Website-2', label: 'Website-2' },
							{ value: 'Website-3', label: 'Website-3' },
							{ value: 'Website-4', label: 'Website-4' },
						]}
						label="Conversion Location"
					/> */}

					{/* Performance Goal */}
					{/* <Select
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						error={
							state.apiResponse.performance_goal
								? state.apiResponse.performance_goal
								: ''
						}
						name="performance_goal"
						select={[
							{ value: 'performance_goal-1', label: 'performance_goal-1' },
							{ value: 'performance_goal-2', label: 'performance_goal-2' },
							{ value: 'performance_goal-3', label: 'performance_goal-3' },
							{ value: 'performance_goal-4', label: 'performance_goal-4' },
						]}
						label="Performance Goal"
					/> */}
				</div>
				{/* Platforms */}
				<div className={style.adSet}>
					<h1 className={`${style.adSetHeader} w-full !mb-0`}>Platforms</h1>

					{/* Budget */}
					{/* <Select
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						label="Budget"
						name="budget"
						subLabel={true}
						select={[
							{ value: 'budget-1', label: 'Budget-1' },
							{ value: 'budget-2', label: 'Budget-2' },
							{ value: 'budget-3', label: 'Budget-3' },
							{ value: 'budget-4', label: 'Budget-4' },
						]}
						error={state.apiResponse.budget ? state.apiResponse.budget : ''}
					/> */}
					<Radio
						name="budget"
						label="Budget"
						subLabel
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						error={state.apiResponse.budget ? state.apiResponse.budget : ''}
						defaultValue={state.level2.budget}
						select={[
							{ value: 'Daily Budget', label: 'Daily Budget' },
							{ value: 'Lifetime Budget', label: 'Lifetime Budget' },
						]}
					/>

					<Input
						dispatch={dispatch}
						dispatchType="INPUT_L2"
						label="Budget Amount"
						name="budget_amount"
						placeholder="Add budget..."
						type="number"
						defaultValue={state.level2.budget_amount}
						error={
							state.apiResponse.budget_amount
								? state.apiResponse.budget_amount
								: ''
						}
						subLabel
						onlyNumber
					/>

					<div className={style.adSetFlexColumn}>
						<label className={style.adSetLabel}>
							Start Date{' '}
							{state.apiResponse.start_date && (
								<span className="!text-sm !text-red-500">
									{state.apiResponse.start_date}
								</span>
							)}
						</label>
						{/* <MyDatePicker  /> */}

						<DatePicker
							className={`${style.inputFieldText} ${
								state.apiResponse.start_date && 'border !border-red-500'
							} w-full block`}
							selected={state.level2.start_date_view}
							onChange={(e) =>
								dispatch({
									type: 'DATE_CREATE',
									payload: {
										name: 'start_date',
										value: e,
										view: 'start_date_view',
									},
								})
							}
							dateFormat="dd-MM-yyyy" // You can customize the date format
							placeholderText="Select a date"
						/>
					</div>
					<div className={style.adSetFlexColumn}>
						<label className={style.adSetLabel}>
							End Date{' '}
							{state.apiResponse.end_date && (
								<span className="!text-sm !text-red-500">
									{state.apiResponse.end_date}
								</span>
							)}
						</label>
						<DatePicker
							className={`${style.inputFieldText} ${
								state.apiResponse.end_date && 'border !border-red-500'
							} w-full block`}
							selected={state.level2.end_date_view}
							onChange={(e) =>
								dispatch({
									type: 'DATE_CREATE',
									payload: {
										name: 'end_date',
										value: e,
										view: 'end_date_view',
									},
								})
							}
							dateFormat="dd-MM-yyyy" // You can customize the date format
							placeholderText="Select a date"
						/>
					</div>
					<p className="font-medium text-blue-500">
						Total Cost:{' '}
						{calculateBudgetWidthTimeDifference(
							state.level2.start_date_view,
							state.level2.end_date_view,
							state.level2.budget_amount,
							dollar,
							state.level2.budget
						)}
					</p>
				</div>

				{/* Audience */}
				<div className={style.adSet}>
					<h1 className={`${style.adSetHeader} w-full !mb-0`}>Audience</h1>

					{/* Audience */}
					{/* <Select
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						label="Audience"
						name="audience"
						subLabel={true}
						
						select={[
							{ value: 'audience-1', label: 'Audience-1' },
							{ value: 'audience-2', label: 'Audience-2' },
							{ value: 'audience-3', label: 'Audience-3' },
							{ value: 'audience-4', label: 'Audience-4' },
						]}
						error=""
						 
					/> */}

					{/* Age */}

					<div className={`w-full ${style.addSetOptions}`}>
						<Select
							dispatch={dispatch}
							dispatchName="INPUT_L2"
							label="Age From"
							name="age"
							subLabel={true}
							select={all?.audience_age?.map((e: any) => ({
								value: e?.audience_age,
								label: e?.audience_age,
							}))}
							error={state.apiResponse.age ? state.apiResponse.age : ''}
						/>
						<Select
							dispatch={dispatch}
							dispatchName="INPUT_L2"
							label="To"
							name="ageto"
							subLabel={true}
							select={all?.audience_age_to?.map((e: any) => ({
								value: e?.audience_age_to,
								label: e?.audience_age_to,
							}))}
							error={state.apiResponse.ageto ? state.apiResponse.ageto : ''}
						/>
					</div>
					{/* <Select
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						label="Gender"
						name="gender"
						subLabel={true}
						select={[
							{ value: 'male', label: 'Male' },
							{ value: 'female', label: 'Female' },
							{ value: 'others', label: 'Others' },
						]}
						error={state.apiResponse.gender ? state.apiResponse.gender : ''}
					/> */}
					<Radio
						subLabel
						name="gender"
						label="Gender"
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						error={state.apiResponse.gender ? state.apiResponse.gender : ''}
						defaultValue={state.level2.gender}
						grid="sm:grid-cols-3"
						select={[
							{ value: 'Male', label: 'Male' },
							{ value: 'Female', label: 'Female' },
							{ value: 'All', label: 'All' },
						]}
					/>

					<Input
						dispatch={dispatch}
						dispatchType="INPUT_L2"
						label="Detail Targeting"
						name="detail_targeting"
						placeholder="Type Here..."
						type="text"
						error={
							state.apiResponse.detail_targeting
								? state.apiResponse.detail_targeting
								: ''
						}
						subLabel
						input="text-area"
					/>

					<FileUpLoad
						label="Detail Targeting  Image"
						dispatch={dispatch}
						state={state}
						name="advertise_audience_files"
						error={
							state.apiResponse.advertise_audience_files
								? state.apiResponse.advertise_audience_files
								: ''
						}
					/>
					<ImageView
						dispatch={dispatch}
						state={state}
						name={'advertise_audience_files'}
					/>
				</div>

				{/* location */}
				<div className={style.adSet}>
					<div className={style.adSetFlexColumn}>
						<h1 className={style.adSetHeader}>Location</h1>
						<SelectCountry
							dispatch={dispatch}
							dispatchName="INPUT_L2_PLACEMENT"
							label="Country"
							name="country"
							subLabel="sm"
							select={all?.country?.map((e: any) => ({
								value: e?.id,
								label: e?.name,
							}))}
							error={state.apiResponse.country ? state.apiResponse.country : ''}
						/>
						{/* <label className={style.adSetLabel}>
							Country{' '}
							{state.apiResponse.country && (
								<span className="!text-sm !text-red-500">
									{state.apiResponse.country}
								</span>
							)}
						</label>
						<CountrySelect
							onChange={(e: any) => {
								dispatch({
									type: 'SELECT_COUNTRY',
									payload: {
										name: 'country',
										value: e.name,
										countryID: e.id,
										countryID_field: 'countryID',
									},
								});
							}}
							placeHolder="Select Country"
							containerClassName={`CounrtyClassForMultiFrom ${
								state.apiResponse.country && 'error'
							}`}
						/> */}
					</div>
					<SelectMultiCheckbox
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						label="City"
						name="city"
						subLabel={true}
						select={city?.map((e: any) => ({
							value: e?.name,
							label: e?.name,
						}))}
						value={state.level2.city}
						error={state.apiResponse.city ? state.apiResponse.city : ''}
					/>
					{/* <div className={style.adSetFlexColumn}>
						<label className={style.adSetLabel}>
							City{' '}
							{state.apiResponse.city && (
								<span className="!text-sm !text-red-500">
									{state.apiResponse.city}
								</span>
							)}
						</label>
						<StateSelect
							countryid={state.level2.countryID}
							stateid={state.level2.stateid}
							onChange={(e: any) => {
								dispatch({
									type: 'SELECT_COUNTRY',
									payload: {
										name: 'city',
										value: e.name,
										countryID: e.id,
										countryID_field: 'stateid',
									},
								});
							}}
							placeHolder="Select State"
							containerClassName={`CounrtyClassForMultiFrom ${
								state.apiResponse.city && 'error'
							}`}
						/>
					</div> */}
					<FileUpLoad
						label="Add Image"
						dispatch={dispatch}
						state={state}
						name="location_files"
						error={
							state.apiResponse.location_files
								? state.apiResponse.location_files
								: ''
						}
					/>
					<ImageView
						dispatch={dispatch}
						state={state}
						name={'location_files'}
					/>
				</div>
				{/* Placement */}
				<div className={style.adSet}>
					<h1 className={`${style.adSetHeader} w-full !mb-0`}>Placement </h1>
					<SelectMultiCheckbox
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						label="Devices"
						name="device"
						subLabel={true}
						select={all?.device?.map((e: any) => ({
							value: e?.device,
							label: e?.device,
						}))}
						value={state.level2.device}
						error={state.apiResponse.device ? state.apiResponse.device : ''}
					/>

					<SelectMultiCheckbox
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						label="Platform"
						name="platform"
						subLabel={true}
						select={all?.platform?.map((e: any) => ({
							value: e?.platform,
							label: e?.platform,
						}))}
						value={state.level2.platform}
						error={state.apiResponse.platform ? state.apiResponse.platform : ''}
					/>

					<div className={style.adSetFlexColumn}>
						<label className={style.adSetLabel}>
							Placements{' '}
							{state.apiResponse.placements && (
								<span className="!text-sm !text-red-500">
									{state.apiResponse.placements[0]}
								</span>
							)}
						</label>
						<div className="mt-4 grid grid-cols-1 gap-3">
							<SelectMultiCheckbox
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="Feeds"
								name="feeds"
								subLabel="sm"
								select={all?.feed?.map((e: any) => ({
									value: e?.feed,
									label: e?.feed,
								}))}
								value={state.level2.feeds}
								error=""
							/>
							{/* <SelectMulti
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="Feeds"
								name="feeds"
								subLabel="sm"
								select={all?.feed?.map((e: any) => ({
									value: e?.feed,
									label: e?.feed,
								}))}
								error=""
								// error={
								// 	state.apiResponse.feeds
								// 		? state.apiResponse.feeds
								// 		: ''
								// }
							/> */}

							<SelectMultiCheckbox
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="Stories & Reels"
								name="story_reels"
								subLabel="sm"
								select={all?.store_reel?.map((e: any) => ({
									value: e?.store_reel,
									label: e?.store_reel,
								}))}
								error=""
								value={state.level2.story_reels}
							/>
							<SelectMultiCheckbox
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="In-stream ads videos & reels"
								name="adds_video_and_reels"
								subLabel="sm"
								select={all?.video_reel?.map((e: any) => ({
									value: e?.video_reel,
									label: e?.video_reel,
								}))}
								error=""
								value={state.level2.adds_video_and_reels}
							/>

							<SelectMultiCheckbox
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="Search Result"
								name="search_result"
								subLabel="sm"
								select={all?.search_reel?.map((e: any) => ({
									value: e?.search_reel,
									label: e?.search_reel,
								}))}
								error=""
								value={state.level2.search_result}
							/>
							<SelectMultiCheckbox
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="Messages"
								name="messages"
								subLabel="sm"
								select={all?.messages_reel?.map((e: any) => ({
									value: e?.messages_reel,
									label: e?.messages_reel,
								}))}
								error=""
								value={state.level2.messages}
							/>
							<SelectMultiCheckbox
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="Apps & Sites"
								name="apps_and_sites"
								subLabel="sm"
								select={all?.apps_web?.map((e: any) => ({
									value: e?.apps_web,
									label: e?.apps_web,
								}))}
								error=""
								value={state.level2.apps_and_sites}
							/>
						</div>
						{/* <div className={style.addSetOptions}>
							<Select
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="Feeds"
								name="feeds"
								subLabel="sm"
								select={all?.feed?.map((e: any) => ({
									value: e?.feed,
									label: e?.feed,
								}))}
								error=""
								// error={
								// 	state.apiResponse.feeds
								// 		? state.apiResponse.feeds
								// 		: ''
								// }
							/>
							<Select
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="Stories & Reels"
								name="story_reels"
								subLabel="sm"
								select={all?.store_reel?.map((e: any) => ({
									value: e?.store_reel,
									label: e?.store_reel,
								}))}
								error=""
								// error={
								// 	state.apiResponse.story_reels
								// 		? state.apiResponse.story_reels
								// 		: ''
								// }
							/>
							<Select
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="In-stream ads videos & reels"
								name="adds_video_and_reels"
								subLabel="sm"
								select={all?.video_reel?.map((e: any) => ({
									value: e?.video_reel,
									label: e?.video_reel,
								}))}
								error=""

								// error={
								// 	state.apiResponse.adds_video_and_reels
								// 		? state.apiResponse.adds_video_and_reels
								// 		: ''
								// }
							/>
							<Select
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="Search Result"
								name="search_result"
								subLabel="sm"
								select={all?.search_reel?.map((e: any) => ({
									value: e?.search_reel,
									label: e?.search_reel,
								}))}
								error=""

								// error={
								// 	state.apiResponse.search_result
								// 		? state.apiResponse.search_result
								// 		: ''
								// }
							/>
							<Select
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="Messages"
								name="messages"
								subLabel="sm"
								select={all?.messages_reel?.map((e: any) => ({
									value: e?.messages_reel,
									label: e?.messages_reel,
								}))}
								error=""

								// error={
								// 	state.apiResponse.messages
								// 		? state.apiResponse.messages
								// 		: ''
								// }
							/>
							<Select
								dispatch={dispatch}
								dispatchName="INPUT_L2_PLACEMENT"
								label="Apps & Sites"
								name="apps_and_sites"
								subLabel="sm"
								select={all?.apps_web?.map((e: any) => ({
									value: e?.apps_web,
									label: e?.apps_web,
								}))}
								error=""
								// error={
								// 	state.apiResponse.apps_and_sites
								// 		? state.apiResponse.apps_and_sites
								// 		: ''
								// }
							/>
						</div> */}
					</div>
				</div>
				{/* Inventory */}
				<div className={style.adSet}>
					{/* <Select
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						label="Inventory"
						name="inventory"
						select={[
							{ value: 'full-inventory-1', label: 'Full Inventory-1' },
							{ value: 'full-inventory-2', label: 'Full Inventory-2' },
							{ value: 'full-inventory-3', label: 'Full Inventory-3' },
						]}
						error={
							state.apiResponse.inventory ? state.apiResponse.inventory : ''
						}
					/> */}
					<Radio
						name="inventory"
						label="Inventory"
						dispatch={dispatch}
						dispatchName="INPUT_L2"
						grid="sm:grid-cols-3"
						error={
							state.apiResponse.inventory ? state.apiResponse.inventory : ''
						}
						defaultValue={state.level2.inventory}
						select={[
							{
								value: 'Expanded Inventory',
								label: 'Expanded Inventory',
								extraText:
									'Show ads on all content that adhere to our Content Monetisation Policies so that you get the most reach.',
							},
							{
								value: 'Moderate Inventory',
								label: 'Moderate Inventory',
								extraText: 'Exclude Moderately sensitive content.',
							},
							{
								value: 'Limited Inventory',
								label: 'Limited Inventory',
								extraText:
									'Exclude additional sensitive content, as well as all live videos. This lowers reach and can increase costs.',
							},
						]}
					/>
				</div>
				{state.errorMessage.errorL2 && (
					<div className="alert alert-error">
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
					type="button"
					onClick={submitFormTwo}
					// onClick={() => controlSlides(true, { num: 4, value: true })}
					className={style.adSetButton}
					disabled={loading}
				>
					{loading ? (
						<span className={style.adSetButtonText}>Next......</span>
					) : (
						<>
							<span className={style.adSetButtonText}>Next</span>
							<FaArrowRight className={style.addSetIcon} />
						</>
					)}
				</button>
			</form>
		</section>
	);
};

export default AdSetForm;
