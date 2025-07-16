export const initialState = {
  data: {
    first_name: null,
    last_name: null,
    email: null,
    number: null,
    message: null,
  },
  apiRes: {
    first_name: null,
    last_name: null,
    email: null,
    number: null,
    message: null,
  },
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "INPUT":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: action.payload.value,
        },
        apiRes: {
          ...state.apiRes,
          [action.payload.name]: null,
        },
      };
    case "VALIDATION_ERROR":
      return {
        ...state,
        apiRes: {
          ...state.apiRes,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
