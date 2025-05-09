export const AuthReducer = (state, action) => {
    
    if (!action) {
    console.error("Missing action in AuthReducer");
    return state;
  }
    
    switch(action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true
        };
      // ... autres cas ...
    
    case 'LOGOUT':
        return {
            ...state,
            user:null,
            isAuthenticated: false,

        };
        case 'USER_UPDATE':
        return {
            ...state,
            user:{...state.user,...action.payload},
         

        };
        default:
      return state;
  }
};




