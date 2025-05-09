import { createContext, useReducer } from 'react';
import { useEffect } from 'react';
import { AuthReducer } from './AuthReducer';


 
  const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),
  };
  
  export const AuthContext = createContext(INITIAL_STATE);
  
  
  

  export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: storedUser });
        }
      }, []);
      
  
  return (
    <AuthContext.Provider value={{ 
        user: state.user,
        isAuthenticated: state.isAuthenticated, 
        dispatch
        }}
        >
      {children}
    </AuthContext.Provider>
  );
};
  