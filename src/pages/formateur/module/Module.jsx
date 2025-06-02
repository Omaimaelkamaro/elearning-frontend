import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Module = ({ module, courseId, index }) => {
    const { t, i18n } = useTranslation();
  const language = i18n.language;
  const navigate = useNavigate();
  const goToUpdatemodule = () => {
    navigate(`${module.id}`);
  };
  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        module - {index+1}: {module.title}
      </h1>
      <Edit
        onClick={goToUpdatemodule}
        size={20}
        className=" cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      />
    </div>
  );
};

export default Module;