import React, { HTMLInputTypeAttribute } from 'react';
import { AppAction, AppDispatch, OnlyInputType } from '../action/type';
import style from './styles/input.module.css';
import { beZero } from '@/components/actions/action';
interface IInput {
	dispatch?: AppDispatch;
	label: string | React.ReactNode;
	type: HTMLInputTypeAttribute;
	name: string;
	placeholder: string;
	error?: string;
	subLabel?: boolean;
	disabled?: boolean;
	dispatchType?: AppAction['type'];
	input?: 'input' | 'text-area';
	defaultValue?: string | number | readonly string[] | undefined;
	onlyNumber?: boolean;
}

function Input({
	dispatch,
	label,
	type,
	name,
	placeholder,
	error,
	subLabel = false,
	dispatchType,
	input = 'input',
	defaultValue,
	disabled = false,
	onlyNumber = false,
}: IInput) {
	return (
		<div className={style.adSetFlexColumn}>
			<label
				htmlFor={name}
				className={subLabel ? style.adSetLabel : style.adSetTopHeader}
			>
				{label} {error && <span className="text-sm text-red-500">{error}</span>}
			</label>
			{input === 'input' ? (
				<input
					className={`${style.inputFieldText} ${
						error && 'border !border-red-500'
					}`}
					type={type}
					name={name}
					id={name}
					placeholder={placeholder}
					defaultValue={defaultValue}
					disabled={disabled}
					onChange={(e) =>
						dispatch &&
						dispatch({
							type: dispatchType as OnlyInputType,
							payload: {
								name: name,
								value: onlyNumber ? beZero(e.target.value) : e.target.value,
							},
						})
					}
				/>
			) : (
				<textarea
					className={`${style.adSetTextarea} ${
						error && 'border !border-red-500'
					}`}
					name={name}
					disabled={disabled}
					id={name}
					placeholder={placeholder}
					onChange={(e) =>
						dispatch &&
						dispatch({
							type: dispatchType as OnlyInputType,
							payload: {
								name,
								value: e.target.value,
							},
						})
					}
				></textarea>
			)}
		</div>
	);
}

export default Input;
