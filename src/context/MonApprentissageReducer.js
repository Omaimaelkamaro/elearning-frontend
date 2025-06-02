export const MonApprentissageReducer = (state, action) => {
  switch (action.type) {
    case "SET_MES_COURS":
      return { ...state, mesCours: action.payload, loading: false };
    case "SET_PROGRESSION":
      return { ...state, progression: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
