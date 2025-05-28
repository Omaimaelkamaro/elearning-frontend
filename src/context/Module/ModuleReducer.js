export const ModuleReducer = (state, action) => {
  switch (action.type) {
    case "SET_Modules":
      return { modules: Array.isArray(action.payload) ? action.payload : [],
      };
    case "ADD_Module":
      return { ...state, modules: [...state.modules, action.payload] };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
      case "UPDATE_Modules":
      return {
        ...state,
        modules: state.modules.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
        isSucces: true,
        error: false
      };

    case "DELETE_Module":
      return {
        ...state,
        courses: state.modules.filter((c) => c._id !== action.payload),
        isSucces: true,
        error: false
      };

    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
