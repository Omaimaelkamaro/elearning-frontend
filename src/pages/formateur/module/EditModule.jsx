import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ModuleTab from "./ModuleTab";
import { useTranslation } from "react-i18next";

const EditModule = () => {
  const params = useParams();
  const courseId = params.id;
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Link to={`/formateur/cours/${courseId}/module`}>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="font-bold text-xl">{t("module.updatey")}</h1>
        </div>
      </div>
      <ModuleTab />
    </div>
  );
};

export default EditModule;