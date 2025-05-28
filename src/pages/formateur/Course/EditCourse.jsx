import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = ({id}) => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding course
        </h1>
        <Link to="module">
          <Button className="hover:text-indigo-500" variant="link">Go to lectures page</Button>
        </Link>
      </div>
      <CourseTab id={id} />
    </div>
  );
};

export default EditCourse;