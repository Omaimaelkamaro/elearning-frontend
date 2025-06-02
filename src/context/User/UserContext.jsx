import React, { createContext, useReducer, useEffect } from "react";
import { UserReducer } from "./UserReducer";
import { UserService } from "@/service/apiUsers";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  
    const fetchUsers = async () => {
      try {
        const data = await UserService.getAllUsers();
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: data.users });
      } catch (error) {
        dispatch({ type: "FETCH_USERS_ERROR", payload: error.message });
      }
    };

    


  const addUser = async (userData) => {
    console.log("User data being sent:", userData);
    try {
      const newUser = await UserService.createCategory(userData);
      
      dispatch({ type: "ADD_USER", payload: newUser });
    } catch (error) {
      console.error("Add user failed", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await UserService.deleteCourse(userId);
      dispatch({ type: "DELETE_USER", payload: userId });
    } catch (error) {
      console.error("Delete user failed", error);
    }
  };

  return (
    <UserContext.Provider value={{ ...state, addUser, deleteUser,fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};
