import React from 'react';
import style from './styles/select.module.css';

import { AppAction, AppDispatch, OnlyInputType } from '../action/type';
import { ISelectValue } from '@/types/Ui-Types';
interface ISelect {
	dispatch: AppDispatch;
	label: string;
	name: string;
	defaultValue: string;
	dispatchName: OnlyInputType;
	error: any;
	select: i_newSelect[];
	selected?: string | number;
	subLabel?: boolean | 'sm';
	grid?: string;
}
interface i_newSelect extends ISelectValue {
	extraText?: string;
}
function Radio({
	dispatch,
	label,
	name,
	dispatchName,
	defaultValue,
	error,
	select,
	selected = 'default-selected',
	subLabel = false,
	grid = 'sm:grid-cols-2',
}: ISelect) {
	return (
		<div className="w-full">
			<div
				className={
					subLabel === 'sm'
						? ''
						: subLabel
						? style.adSetLabel
						: style.adSetTopHeader
				}
			>
				{label} {error && <span className="text-sm text-red-500">{error}</span>}
			</div>
			<div className={`grid gap-4 mt-5 ${grid}`}>
				{select?.map((e, i) => (
					<Input
						key={i + 1}
						defaultValue={defaultValue}
						data={e}
						name={name}
						dispatch={dispatch}
						dispatchName={dispatchName}
					/>
				))}
			</div>
		</div>
	);
}
const Input = ({
	name,
	defaultValue,
	data,
	dispatch,
	dispatchName,
}: {
	data: i_newSelect;
	name: string;
	defaultValue: string;
	dispatch: AppDispatch;
	dispatchName: OnlyInputType;
}) => {
	return (
		<div className="form-control ">
			<label
				className={`${
					data?.value === defaultValue && '!border !border-blue-600'
				} label cursor-pointer justify-start items-start border border-transparent bg-sky-100 rounded-lg h-full px-2 shadow ${
					name === 'inventory' && 'flex-col'
				} ${name === 'inventory' ? ' gap-2' : ' gap-5'} `}
			>
				<input
					onChange={(e) =>
						dispatch({
							type: dispatchName,
							payload: {
								name: name,
								value: e.target.checked ? data?.value : null,
							},
						})
					}
					type="radio"
					name={name}
					className="radio checked:bg-blue-500"
					checked={data?.value === defaultValue}
				/>
				<span
					className={`flex flex-col justify-center self-stretch ${
						name === 'inventory' ? '' : 'items-center '
					}`}
				>
					<span
						className={`label-text text-md ${
							name === 'inventory' && 'font-semibold'
						}`}
					>
						{data?.label}
					</span>
					{name === 'inventory' && (
						<span className="label-text">{data?.extraText}</span>
					)}
				</span>
			</label>
		</div>
	);
};
export default Radio;
