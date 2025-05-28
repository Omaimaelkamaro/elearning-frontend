import React, { createContext, useContext, useReducer } from "react";
import { ModuleReducer } from "./ModuleReducer";
import { ModuleService } from "@/service/apiModule"; 

const ModuleContext  = createContext();

const initialState = {
  modules: [],
  isLoading: false,
  error: null,
};

export const ModuleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ModuleReducer, initialState);

  const getAllmodules = async (courseId) => {
   
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await ModuleService.getAllmodules(courseId);
       console.log("Modules fetched from API:", data);
      dispatch({ 
        
        type: "SET_Modules", 
        payload: data.Module // Triple protection
        
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({ type: "SET_ERROR", payload: errorMsg });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  

  const createmodules = async (moduleData, courseId) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      if (!courseId) {
        throw new Error("Course ID is required");
      }
      
      const data = await ModuleService.createmodules(moduleData, courseId);
      
      dispatch({ 
        type: "ADD_Module", 
        payload: { ...data, courseId } // Associe le module à son cours
      });
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({ type: "SET_ERROR", payload: errorMsg });
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };


  const updatemodules = async (newmodule,cours,moduleId) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await ModuleService.updatemodules(newmodule,cours.id,moduleId);
      dispatch({ type: "UPDATE_Modules", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const deletemodules = async (newmodule,cours) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await ModuleService.deletemodules(newmodule,cours.id);
      dispatch({ type: "DELETE_Module", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  


  return (
    <ModuleContext.Provider
      value={{
        ...state,
        getAllmodules,
        createmodules,
        deletemodules,
        updatemodules,

      }}
    >
      {children}
    </ModuleContext.Provider>
  );
};

export const useModuleContext = () => useContext(ModuleContext);
