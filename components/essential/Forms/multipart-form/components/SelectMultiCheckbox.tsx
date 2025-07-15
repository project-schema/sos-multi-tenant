import React, { useState } from 'react';
import { ISelectValue } from '@/types/Ui-Types';
import { AppAction, AppDispatch, OnlyInputType } from '../action/type';
import Select, { components } from 'react-select';
import { FaAngleDown } from 'react-icons/fa6';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { checkValueIsOrNot } from '@/components/actions/action';

interface ISelect {
	dispatch: AppDispatch;
	label: string;
	name: string;
	dispatchName: AppAction['type'];
	error: any;
	value: any;
	select: ISelectValue[];
	selected?: string | number;
	subLabel?: boolean | 'sm';
}

export default function SelectMultiCheckbox({
	dispatch,
	label,
	name,
	dispatchName,
	error,
	select,
	selected = 'default-selected',
	subLabel = false,
	value,
}: ISelect) {
	const [search, setSearch] = useState('');
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

			<div className="dropdown w-full">
				<div
					tabIndex={0}
					role="button"
					className="w-full  border border-stone-400 p-[10px] rounded-xl flex justify-between items-center "
				>
					<span className="text-stone-400 flex flex-wrap">
						{value &&
							value?.map((v: any, i: number) => (
								<span
									onClick={() =>
										dispatch({
											type: dispatchName as OnlyInputType,
											payload: {
												name: name,
												value: checkValueIsOrNot(value, v),
											},
										})
									}
									className="bg-blue-100 text-stone-600 mx-1 px-1 rounded mb-1"
									key={i}
								>
									{v}
								</span>
							))}

						<input
							type="text"
							onChange={(e) => setSearch(e.target.value)}
							className="w-auto focus:border-none"
							placeholder={`Select ${label}`}
						/>
					</span>
					{/* 
					{value.length > 1 && (
						<input
							type="text"
							onChange={(e) => setSearch(e.target.value)}
							className="w-full focus:border-none"
							placeholder={`Select ${label}`}
						/>
					)} */}
					<span className="border-s ps-3">
						<FaAngleDown className="text-stone-400" />
					</span>
				</div>
				<ul
					tabIndex={0}
					style={{ display: 'inherit' }}
					className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-full max-h-64 overflow-auto"
				>
					{select
						?.filter((e) =>
							e.label.toLowerCase().includes(search.toLowerCase())
						)
						?.map((e, i) => (
							<p
								className="p-2 cursor-pointer hover:bg-slate-100 rounded-lg"
								key={i}
								onClick={() =>
									dispatch({
										type: dispatchName as OnlyInputType,
										payload: {
											name: name,
											value: checkValueIsOrNot(value, e.value),
										},
									})
								}
							>
								<span className="flex justify-between active:bg-inherit">
									<span>{e.label}</span>
									<span>
										{value.includes(e.value) ? (
											<MdCheckBox className="text-xl" />
										) : (
											<MdCheckBoxOutlineBlank className="text-xl" />
										)}
									</span>
								</span>
							</p>
						))}
				</ul>
			</div>
		</div>
	);
}
