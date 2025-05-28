export const FormateurReducer = (state, action) => {
  switch (action.type) {
    case "SET_formateurs":
      return { ...state, formateurs: action.payload };
    case "ADD_formateur":
      return { ...state, formateurs: [...state.formateurs, action.payload] };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
