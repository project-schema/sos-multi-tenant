import React from 'react';
import { ISelectValue } from '@/types/Ui-Types';
import { AppAction, AppDispatch, OnlyInputType } from '../action/type';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
interface ISelect {
	dispatch: AppDispatch;
	label: string;
	name: string;
	dispatchName: AppAction['type'];
	error: any;
	select: ISelectValue[];
	selected?: string | number;
	subLabel?: boolean | 'sm';
}
const animatedComponents = makeAnimated();

export default function SelectMulti({
	dispatch,
	label,
	name,
	dispatchName,
	error,
	select,
	selected = 'default-selected',
	subLabel = false,
}: ISelect) {
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];
	return (
		<div className="w-full">
			<label
				style={{
					color: '#6a6a6a',
					fontFamily: 'Inter',
					fontSize: '16px',
					fontStyle: 'normal',
					fontWeight: '500',
					lineHeight: 'normal',
					marginBottom: '15px',

					display: 'inline-block',
				}}
				htmlFor={name}
			>
				{label} {error && <span className="text-sm text-red-500">{error}</span>}
			</label>
			<Select
				styles={{
					control: (baseStyles, state) => ({
						...baseStyles,
						borderRadius: '10px',
						paddingTop: '4px',
						paddingBottom: '4px',
						borderColor: state.isFocused ? '#969696' : '#969696',
					}),
				}}
				onChange={(e) =>
					dispatch({
						type: dispatchName as OnlyInputType,
						payload: {
							name: name,
							value: e.length > 0 ? e?.map((e: any) => e.value) : null,
						},
					})
				}
				id={name}
				closeMenuOnSelect={false}
				components={animatedComponents}
				isMulti
				options={select}
			/>
		</div>
	);
}
