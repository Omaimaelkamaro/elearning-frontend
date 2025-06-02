import { createContext, useContext, useReducer } from "react";
import { apprentissageService } from "@/service/apiApprentissage";
import { MonApprentissageReducer } from "./MonApprentissageReducer";



const MonApprentissageContext = createContext();

const initialState = {
  mesCours: [],
  progression: {},
  loading: false,
  error: null,
};

export const MonApprentissageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MonApprentissageReducer, initialState);

  const fetchMesCours = async (userId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const data = await apprentissageService.getMesCours(userId);
      dispatch({ type: "SET_MES_COURS", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const fetchProgression = async (coursId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const data = await apprentissageService.getProgressionCours(coursId);
      dispatch({ type: "SET_PROGRESSION", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  return (
    <MonApprentissageContext.Provider
      value={{
        ...state,
        fetchMesCours,
        fetchProgression,
      }}
    >
      {children}
    </MonApprentissageContext.Provider>
  );
};

export const useMonApprentissage = () => useContext(MonApprentissageContext);
