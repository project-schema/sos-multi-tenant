interface AppState {
	data: {
		email: null;
		password: null;
	};
	error: {
		email: boolean;
		password: boolean;
	};
}

type AppAction =
	| { type: 'INPUT'; payload: any }
	| { type: 'DEC'; payload: any }
	| { type: 'REMENT'; payload: any };

export const initialState = {
	data: {
		email: null,
		password: null,
	},
	error: {
		email: false,
		password: false,
	},
};

export const reducer = (state: AppState, action: AppAction): AppState => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value,
				},
				error: {
					...state.error,
					[action.payload.name]: false,
				},
			};

		default:
			return state;
	}
};
