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
import { useParams } from "react-router-dom";
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

const ModuleTab = () => {
  const [title, setTitle] = useState("");
 const [textContenu, setTextContenu] = useState("");
const [fileContenu, setFileContenu] = useState(null);
  const [duree, setDuree] = useState("");
  const [ordre, setOrdre] = useState("");
  const [typeContenu, setTypeContenu] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const { id, moduleId } = params;

  const { data: moduleData, updatemodules } = useModuleContext();
  const module = moduleData?.module;
window.updatemodules = updatemodules;

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
    toast.error("Tous les champs sont obligatoires.");
    return;
  }

  let updatedModule;

  if (typeContenu === "pdf" || typeContenu === "video") {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("contenu", fileContenu); // fichier PDF ou vidéo
    formData.append("duree", duree);
    formData.append("ordre", ordre);
    formData.append("type_contenu", typeContenu);
    updatedModule = formData;
  } else {
    updatedModule = {
      title,
      contenu: textContenu,
      duree: parseInt(duree, 10),
      ordre: parseInt(ordre, 10),
      type_contenu: typeContenu,
    };
  }

  try {
    setIsLoading(true);
    await updatemodules(updatedModule, id, moduleId);

    toast.success("Module mis à jour avec succès !");
  } catch (err) {
    console.error(err);
    toast.error("Erreur lors de la mise à jour.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Card>
      <CardHeader>
        <CardTitle>Modifier le module</CardTitle>
        <CardDescription>
          Modifiez les champs ci-dessous et cliquez sur enregistrer.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Titre</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="contenu">Contenu</Label>
{/* {typeContenu === "pdf" || typeContenu === "video" ? (
  <Input
    id="contenu"
    type="file"
    accept={typeContenu === "pdf" ? ".pdf" : "video/*"}
    onChange={(e) => setFileContenu(e.target.files[0])}
  />
) : (
  <Input
    id="contenu"
   value={textContenu || ""}
    onChange={(e) => setTextContenu(e.target.value)}
    placeholder={typeContenu === "video" ? "URL de la vidéo" : "Texte du contenu"}
  />
)} */}




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
          <Label htmlFor="duree">Durée (en minutes)</Label>
          <Input
            id="duree"
            type="number"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="ordre">Ordre</Label>
          <Input
            id="ordre"
            type="number"
            value={ordre}
            onChange={(e) => setOrdre(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="type">Type de contenu</Label>
          <Select
      value={typeContenu}
      onValueChange={(value) => {
    setTypeContenu(value);
        // reset contenu correspondant au type
        if (value === "text") {
          setFileContenu(null);
        } else {
          setTextContenu("");
        }
      }}
    >
      <SelectTrigger id="type" className="w-full">
      <SelectValue placeholder="Sélectionnez un type" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
         <SelectLabel>Types disponibles</SelectLabel>
      <SelectItem value="text">Texte</SelectItem>
      <SelectItem value="pdf">PDF</SelectItem>
      <SelectItem value="video">Vidéo</SelectItem>
       </SelectGroup>
    </SelectContent>
    </Select>
        </div>
        <Button disabled={isLoading} onClick={handleUpdate}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              En cours...
            </>
          ) : (
            "Enregistrer"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModuleTab;
