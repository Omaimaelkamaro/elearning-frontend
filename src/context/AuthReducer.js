const  AuthReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {
              ...state,
              user: action.payload,
              isAuthenticated: true,
    };
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
export default AuthReducer;



