import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModuleContext } from "@/context/Module/ModuleContext";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Module from "@/pages/formateur/module/Module";
import { useTranslation } from "react-i18next";

const CreateModule = () => {
  const [moduleTitle, setModuleTitle] = useState("");
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const {
    modules,
    isLoading,
    error,
    createmodules,
    getAllmodules,
  } = useModuleContext();

  useEffect(() => {
    if (!courseId) {
      console.error("Course ID is missing!");
      return;
    }
    getAllmodules(courseId).catch((err) => {
      console.error("Failed to load modules:", err);
    });
  }, [courseId]);

  const handleCreateModule = async () => {
    if (!courseId) {
      toast.error(t("module.errorCourseId"));
      return;
    }

    if (!moduleTitle.trim()) {
      toast.error(t("module.errorTitle"));
      return;
    }

    try {
      await createmodules({ title: moduleTitle }, courseId);
      setModuleTitle("");
      toast.success(t("module.successCreate"));
      await getAllmodules(courseId);
    } catch (err) {
      console.error("Full error details:", err);
      toast.error(
        err.response?.data?.message || err.message || t("module.errorCreation")
      );
    }
  };

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">{t("module.titleHeader")}</h1>
        <p className="text-sm">{t("module.subtitle")}</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>{t("module.labelTitle")}</Label>
          <Input
            type="text"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            placeholder={t("module.placeholderTitle")}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/formateur/cours/${courseId}`)}
          >
            {t("module.backToCourse")}
          </Button>
          <Button disabled={isLoading} onClick={handleCreateModule}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("common.wait")}
              </>
            ) : (
              t("module.createModule")
            )}
          </Button>
        </div>
        <div className="mt-10">
          {isLoading ? (
            <p>{t("module.loading")}</p>
          ) : error ? (
            <p>{t("module.loadingError")}: {error}</p>
          ) : modules.length === 0 ? (
            <p>{t("module.noModules")}</p>
          ) : (
            modules.map((module, index) => (
              <Module
                key={module.id || index}
                module={module}
                title={module.title}
                id={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateModule;
