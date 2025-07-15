import style from './style.module.css';
import AdSetForm from './AdSetForm/AdSetForm';
import CreateAd from './CreateAd/CreateAd';
import Progressbar from './multipartFormItem/Progressbar';
import { useReducer, useState } from 'react';
import ObjectiveForm from './ObjectiveForm/ObjectiveForm';
import { initialState, reducer } from './action/common-action';
import Checkout from './checkout/Checkout';

function MultipartForm() {
	const [state, dispatch] = useReducer(reducer, initialState);

	// top initial progress bar
	const [init, setInit] = useState({
		1: true,
		2: false,
		3: false,
		4: false,
	});

	// active status form
	const [active, setActive] = useState({
		1: true,
		2: false,
		3: false,
		4: false,
	});
	const controlSlides = (
		next: boolean,
		update: {
			num: 1 | 2 | 3 | 4;
			value: boolean;
		},
		active: boolean
	) => {
		setInit((prevInit) => ({
			...prevInit,
			[update.num]: update.value,
		}));

		const newInit = {
			1: false,
			2: false,
			3: false,
			4: false,
		};
		newInit[update.num] = update.value;
		setActive(newInit);
	};
	return (
		<div className="layout">
			{active[4] !== true && (
				<div id="top-advertise" className={style.itemsSuccessBox}>
					<Progressbar line={true} text="Objective" value="1" init={init[1]} />
					<Progressbar line={true} text="Ad Set" value="2" init={init[2]} />
					<Progressbar line={false} text="Create Ad" value="3" init={init[3]} />
				</div>
			)}
			<ObjectiveForm
				state={state}
				active={active[1]}
				dispatch={dispatch}
				controlSlides={controlSlides}
			/>
			<AdSetForm
				state={state}
				active={active[2]}
				dispatch={dispatch}
				controlSlides={controlSlides}
			/>
			<CreateAd
				state={state}
				active={active[3]}
				dispatch={dispatch}
				controlSlides={controlSlides}
			/>
			<Checkout
				state={state}
				active={active[4]}
				dispatch={dispatch}
				controlSlides={controlSlides}
			/>
		</div>
	);
}

export default MultipartForm;
