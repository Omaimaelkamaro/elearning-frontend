import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModuleContext } from "@/context/Module/ModuleContext";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const ModuleTab = () => {
  const [title, setTitle] = useState("");
  const [textContenu, setTextContenu] = useState("");
  const [fileContenu, setFileContenu] = useState(null);
  const [duree, setDuree] = useState("");
  const [ordre, setOrdre] = useState("");
  const [typeContenu, setTypeContenu] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const params = useParams();
  const { id, moduleId } = params;
  const navigate = useNavigate();
  const { data: moduleData, updatemodules } = useModuleContext();
  const module = moduleData?.module;

  useEffect(() => {
    if (module) {
      setTitle(module.title || "");
      setDuree(module.duree || "");
      setOrdre(module.ordre || "");
      setTypeContenu(module.type_contenu || "");
      if (module.type_contenu !== "pdf" && module.type_contenu !== "video") {
        setTextContenu(module.contenu || "");
      }
    }
  }, [module]);

  const handleUpdate = async () => {
    if (
      !title ||
      !duree ||
      !ordre ||
      !typeContenu ||
      (typeContenu === "text" && !textContenu) ||
      ((typeContenu === "pdf" || typeContenu === "video") && !fileContenu)
    ) {
      toast.error(t("moduleTab.errors.fieldsRequired"));
      return;
    }

    let updatedModule;

    if (typeContenu === "pdf" || typeContenu === "video") {
      updatedModule = {
        title,
        duree,
        ordre,
        type_contenu: typeContenu,
        contenu: fileContenu,
      };
    } else {
      updatedModule = {
        title,
        contenu: textContenu,
        duree,
        ordre,
        type_contenu: typeContenu,
      };
    }

    try {
      setIsLoading(true);
      await updatemodules(updatedModule, id, moduleId);
      toast.success(t("moduleTab.success"));
    } catch (err) {
      console.error(err);
      toast.error(t("moduleTab.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("moduleTab.title")}</CardTitle>
        <CardDescription>{t("moduleTab.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">{t("moduleTab.fields.title")}</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="contenu">{t("moduleTab.fields.content")}</Label>
          {typeContenu === "text" && (
            <Input
              id="contenu"
              type="text"
              value={textContenu || ""}
              onChange={(e) => setTextContenu(e.target.value)}
            />
          )}
          {(typeContenu === "pdf" || typeContenu === "video") && (
            <Input
              id="contenu"
              type="file"
              onChange={(e) => setFileContenu(e.target.files[0])}
            />
          )}
        </div>
        <div>
          <Label htmlFor="duree">{t("moduleTab.fields.duration")}</Label>
          <Input
            id="duree"
            type="number"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="ordre">{t("moduleTab.fields.order")}</Label>
          <Input
            id="ordre"
            type="number"
            value={ordre}
            onChange={(e) => setOrdre(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="type">{t("moduleTab.fields.type")}</Label>
          <Select
            value={typeContenu}
            onValueChange={(value) => {
              setTypeContenu(value);
              if (value === "text") {
                setFileContenu(null);
              } else {
                setTextContenu("");
              }
            }}
          >
            <SelectTrigger id="type" className="w-full">
              <SelectValue placeholder={t("moduleTab.fields.selectType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("moduleTab.fields.availableTypes")}</SelectLabel>
                <SelectItem value="text">{t("moduleTab.fields.text")}</SelectItem>
                <SelectItem value="pdf">{t("moduleTab.fields.pdf")}</SelectItem>
                <SelectItem value="video">{t("moduleTab.fields.video")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button
          disabled={isLoading}
          onClick={async () => {
            await handleUpdate();
            navigate(`/formateur/cours/${id}/module`);
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("moduleTab.saving")}
            </>
          ) : (
            t("moduleTab.save")
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModuleTab;
