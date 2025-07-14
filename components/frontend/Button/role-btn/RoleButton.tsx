import style from './Register.style.module.css';

function RoleButton({
	dispatch,
	state,
	label = 'User',
}: {
	dispatch: any;
	state: any;
	label?: string | null;
}) {
	let value = '4';
	if (label === 'Merchant') {
		value = '2';
	} else if (label === 'Drop Shipper') {
		value = '3';
	} else {
		value = '4';
	}

	return (
		<button
			onClick={() => {
				dispatch({
					type: 'INPUT',
					payload: {
						value: value,
						name: 'role',
					},
				});
			}}
			type="button"
			className={`${style.userItems} ${
				state.data.role === value && style.active
			}`}
		>
			{label}
		</button>
	);
}

export default RoleButton;
