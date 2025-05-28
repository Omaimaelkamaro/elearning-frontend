export const courseReducer = (state, action) => {
  switch (action.type) {
    case "SET_COURSES":
      return { ...state, courses: action.payload };

    case "ADD_COURSE":
      return { 
        ...state, 
        courses: [action.payload, ...state.courses],
        isSucces: true,
        error: false 
      };

    case "UPDATE_COURSE":
      return {
        ...state,
        courses: state.courses.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
        isSucces: true,
        error: false
      };

    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter((c) => c._id !== action.payload),
        isSucces: true,
        error: false
      };

    case "Archive_COURSE":
      return {
        ...state,
        courses: state.courses.map((c) =>
          c._id === action.payload ? { ...c, archived: true } : c
        ),
        isSucces: true,
        error: false
      };

    case "Desarchive_COURSE":
      return {
        ...state,
        courses: state.courses.map((c) =>
          c._id === action.payload ? { ...c, archived: false } : c
        ),
        isSucces: true,
        error: false
      };
      case "PUBLISH_COURSE":
  return {
    ...state,
    courses: state.courses.map((course) =>
      course._id === action.payload._id ? action.payload : course
    ),
  };


    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: true, isSucces: false };

    case "RESET_STATUS":
      return { ...state, error: false, isSucces: false };

    default:
      return state;
  }
  
};

