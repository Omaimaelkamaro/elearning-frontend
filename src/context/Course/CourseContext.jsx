// context/CourseContext.js
import { createContext, useContext, useReducer, useEffect } from "react";
import { courseReducer } from "./courseReducer";
import { courseService } from "@/service/apiCourses";


const CourseContext = createContext();

const initialState = {
  courses: [],
  loading: false,
  isSucces:false,
  error:false,
};

export const CourseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  const fetchCourses = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await courseService.getAllCourses();
      dispatch({ type: "SET_COURSES", payload: data.cours });
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const addCourse = async (courseData) => {
    try {
      const newCourse = await courseService.createCourse(courseData);
      dispatch({ type: "ADD_COURSE", payload: newCourse });
    } catch (error) {
      console.error("Failed to add course", error);
    }
  };

  const updateCourse = async (id, courseData) => {
    try {
      const updatedCourse = await courseService.updateCourse(id, courseData);
      dispatch({ type: "UPDATE_COURSE", payload: updatedCourse });
    } catch (error) {
      console.error("Failed to update course", error);
    }
  };

  const updateImageCourse = async (id, courseData) => {
    try {
      const updatedCourse = await courseService.updateImageCourse(id, courseData);
      dispatch({ type: "UPDATE_COURSE", payload: updatedCourse });
    } catch (error) {
      console.error("Failed to update course", error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await courseService.deleteCourse(id);
      dispatch({ type: "DELETE_COURSE", payload: id });
    } catch (error) {
      console.error("Failed to delete course", error);
    }
  };
  const archiveCourse = async (id) => {
    try {
      await courseService.ArchiverCourse(id)
      dispatch({ type: "Archive_COURSE", payload: id });
    } catch (error) {
      console.error("Failed to archive course", error);
    }
  };
  const desarchiveCourse = async (id) => {
    try {
      await courseService.DesarchiverCourse(id)
      dispatch({ type: "Desarchive_COURSE", payload: id });
    } catch (error) {
      console.error("Failed to desarchive Course", error);
    }
  };
const publishCourse = async (id) => {
  try {
    const publishedCourse = await courseService.publishCourse(id);
    dispatch({ type: "PUBLISH_COURSE", payload: publishedCourse });
  } catch (error) {
    console.error("Failed to publish course", error);
  }
};

  

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        ...state,
        fetchCourses,
        addCourse,
        updateCourse,
        deleteCourse,
        archiveCourse,
        desarchiveCourse,
        publishCourse,
        updateImageCourse
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};


export const useCourseContext = () => useContext(CourseContext);


