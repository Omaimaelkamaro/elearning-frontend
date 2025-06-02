import React, { createContext, useContext, useReducer } from "react";
import { FormateurReducer } from "./FormateurReducer";
import { FormateurService } from "@/service/apiFormateur"; 

const FormateurContext  = createContext();

const initialState = {
  formateurs: [],
  isLoading: false,
  error: null,
};

export const FormateurProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FormateurReducer, initialState);

  const getAllFormateurs = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await FormateurService.getAllFormateurs();
      dispatch({ type: "SET_formateurs", payload: data.formateurs }); 
      // Assure-toi que ta réponse a bien une propriété formateurs (tableau)
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  

  const addformateur = async (newformateur) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await FormateurService.createFormateurs(newformateur);
      dispatch({ type: "ADD_formateur", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  
  return (
    <FormateurContext.Provider
      value={{
        ...state,
        getAllFormateurs,
        addformateur,
      }}
    >
      {children}
    </FormateurContext.Provider>
  );
};

export const useFormateurContext = () => useContext(FormateurContext);
