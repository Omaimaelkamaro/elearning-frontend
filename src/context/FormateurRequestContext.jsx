import React, { createContext, useReducer } from 'react';
import { DemandeService } from '@/service/apiDevenirFormateur';
import { useContext } from "react";

export const FormateurdemandeContext = createContext();  

const initialState = {
  loading: false,
  success: null,
  error: null,
};

const formateurReducer = (state, action) => {
  switch (action.type) {
    case 'DEMANDE_START':
      return { ...state, loading: true, error: null, success: null };
    case 'DEMANDE_SUCCESS':
      return { ...state, loading: false, success: action.payload, error: null };
    case 'DEMANDE_ERREUR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const FormateurDProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formateurReducer, initialState);

  const postDemandeFormateur = async (persuasion) => {
    dispatch({ type: 'DEMANDE_START' });
    try {
      const data = await DemandeService.envoyerDemandeFormateur(persuasion);
      dispatch({ type: 'DEMANDE_SUCCESS', payload: data.message });
    } catch (err) {
      dispatch({ type: 'DEMANDE_ERREUR', payload: err.message || 'Erreur serveur' });
    }
  };

  return (
    <FormateurdemandeContext.Provider value={{ ...state, postDemandeFormateur }}>
      {children}
    </FormateurdemandeContext.Provider>
  );
};
export const useFormateurdemandeContext = () => useContext(FormateurdemandeContext);