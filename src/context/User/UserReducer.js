export const UserReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: Array.isArray(action.payload) ? action.payload : [], loading: false, error: null };

    case "FETCH_USERS_ERROR":
      return { ...state, users: [], loading: false, error: action.payload };

    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };

    case "DELETE_USER":
      return { ...state, users: state.users.filter(user => user._id !== action.payload) };

    default:
      return state;
  }
};
