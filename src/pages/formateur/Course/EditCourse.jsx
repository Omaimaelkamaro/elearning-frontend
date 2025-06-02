import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";
import { useTranslation } from "react-i18next";

const EditCourse = ({id}) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          {t("course.addDetail")}  
        </h1>
        <Link to="module">
          <Button className="hover:text-indigo-500" variant="link">{t("course.direction")}</Button>
        </Link>
      </div>
      <CourseTab id={id} />
    </div>
  );
};

export default EditCourse;