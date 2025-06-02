import React, { createContext, useContext, useReducer } from "react";
import { categoryReducer } from "./CategoryReducer";
import { categorieService } from "@/service/apiCategory"; 

const CategoryContext = createContext();

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);
  

  const getAllCategories = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await categorieService.getAllCategories();
      dispatch({ type: "SET_CATEGORIES", payload: data.categories }); 
      // Assure-toi que ta réponse a bien une propriété categories (tableau)
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const addCategory = async (newCategory) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await categorieService.createCategory(newCategory);
      dispatch({ type: "ADD_CATEGORY", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  
  return (
    <CategoryContext.Provider
      value={{
        ...state,
        getAllCategories,
        addCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
