import { createContext, useReducer } from 'react';
import { AuthReducer } from './AuthReducer';

const INITIAL_STATE = {
    user: null,
    isAuthenticated: false,
  };
  

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch({ type: 'LOGIN', payload: storedUser });
        }
      }, []);
      
  
  return (
    <AuthContext.Provider value={{ 
        user: state.user,
        isAuthenticated: state.isAuthenticated, 
        }}
        >
      {children}
    </AuthContext.Provider>
  );
};
  