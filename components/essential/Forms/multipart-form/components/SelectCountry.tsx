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

export default function SelectCountry({
	dispatch,
	label,
	name,
	dispatchName,
	error,
	select,
	selected = 'default-selected',
	subLabel = false,
}: ISelect) {
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
				onChange={(e: any) => {
					dispatch({
						type: 'SELECT_COUNTRY',
						payload: {
							name: 'country',
							value: e.label,
							countryID: e.value,
							countryID_field: 'countryID',
						},
					});
				}}
				id={name}
				closeMenuOnSelect={true}
				components={animatedComponents}
				options={select}
			/>
		</div>
	);
}
