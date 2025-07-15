import { ISelectValue } from '@/types/Ui-Types';
import { AppAction, AppDispatch, OnlyInputType } from '../action/type';
import style from './styles/select.module.css';
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
function Select({
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
		<div className={style.adSetFlexColumn}>
			<label
				htmlFor={name}
				className={
					subLabel === 'sm'
						? ''
						: subLabel
						? style.adSetLabel
						: style.adSetTopHeader
				}
			>
				{label} {error && <span className="text-sm text-red-500">{error}</span>}
			</label>
			<select
				onChange={(e) =>
					dispatch({
						type: dispatchName as OnlyInputType,
						payload: {
							name: name,
							value: e.target.value,
						},
					})
				}
				className={`${
					subLabel === 'sm' ? `!mt-1 ${style.selectField}` : style.selectField
				} ${error && 'border !border-red-500'}`}
				name="cars"
				id="cars"
			>
				<option
					className={style.selectOption}
					selected={selected === 'default-selected'}
					value=""
				>
					select
				</option>
				{select?.map((e, i) => (
					<option key={i} className={style.selectOption} value={e.value}>
						{e.label}
					</option>
				))}
			</select>
		</div>
	);
}

export default Select;
