import { initialState } from './role-permission-state';
import { Action, State } from './role-permission-type';

export const reducer = (state: State = initialState, action: Action): State => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
				apiRes: {
					...state.apiRes,
					[action.payload.name]: null,
				},
			};

		case 'GET_USER_PERMISSION': {
			const userPermissions = action.payload?.permissions;

			const ifMatched = state.permissionData.map((group) => {
				const routes = group.routes.map((route) =>
					userPermissions?.some((perm) => perm.name === route.path)
						? { ...route, checked: true }
						: route
				);
				const anyChecked = routes.some((r) => r.checked);
				const allChecked = routes.every((r) => r.checked);

				return {
					...group,
					routes,
					checked: allChecked || anyChecked,
				};
			});

			return {
				...state,
				permissionData: ifMatched,
				role: action.payload?.name,
			};
		}

		case 'CHECKED': {
			const { id, value } = action.payload;

			const updated = state.permissionData.map((group) => {
				const routes = group.routes.map((r) =>
					r.id === id ? { ...r, checked: value } : r
				);

				const allChecked = routes.every((r) => r.checked);
				const anyChecked = routes.some((r) => r.checked);

				return {
					...group,
					routes,
					checked: allChecked || anyChecked,
				};
			});

			return {
				...state,
				permissionData: updated,
				apiRes: {
					...state.apiRes,
					permission: null,
				},
			};
		}

		case 'CLEAR_ALL_CHECKED':
			return {
				...state,
				permissionData: state.permissionData.map((group) => ({
					...group,
					checked: false,
					routes: group.routes.map((r) => ({ ...r, checked: false })),
				})),
			};

		case 'CHECKED_PARENT': {
			const { parentId, value } = action.payload;

			const updated = state.permissionData.map((group) => {
				const isTargetGroup = group.id === parentId;
				const routes = group.routes.map((r) =>
					isTargetGroup ? { ...r, checked: value } : r
				);

				return {
					...group,
					checked: isTargetGroup ? value : group.checked,
					routes,
				};
			});

			return {
				...state,
				permissionData: updated,
				apiRes: {
					...state.apiRes,
					permission: null,
				},
			};
		}

		case 'API_VALIDATION':
			return {
				...state,
				apiRes: action.payload,
			};

		default:
			return state;
	}
};
