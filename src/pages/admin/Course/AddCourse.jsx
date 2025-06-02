import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourseContext } from "@/context/Course/CourseContext.jsx";
import { useCategoryContext } from "@/context/Category/CategoryContext";
import { useFormateurContext } from "@/context/Formateur/FormateurContext";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";



const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { categories, getAllCategories } = useCategoryContext();
  const { formateurs, getAllFormateurs } = useFormateurContext();
  console.log("Formateurs récupérés :", formateurs);
  const [selectedFormateur, setSelectedFormateur] = useState("");


    const {addCourse,courses, isLoading ,isSuccess,error} = useCourseContext();

  const navigate = useNavigate();
 const { t, i18n } = useTranslation();
  const language = i18n.language;

  
  const createCourseHandler = async () => {
  if (!selectedCategory || !courseTitle) {
   toast.error(t("addCourse.toastError"));
    return;
  }

  await addCourse({
    title:courseTitle,
    categorie_id: parseInt(selectedCategory), 
    formateur_id: selectedFormateur,
 
  });
};

  // for displaying toast
  useEffect(()=>{
    if(isSuccess){
toast.success(courses?.message || t("addCourse.toastSuccess"));
        navigate("/admin/cours");
    }
    getAllCategories();
    getAllFormateurs();
  },[isSuccess, error])

  useEffect(()=>{
    getAllCategories();
    getAllFormateurs();
  },[])

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
       <h1 className="font-bold text-xl">
  {t("addCourse.title")}
</h1>
<p className="text-sm">
  {t("addCourse.description")}
</p>

      </div>
      <div className="space-y-4">
        <div>
          <Label>{t("addCourse.formTitle")}</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div> <Label>{t("addCourse.formCategory")}</Label>
          <Select onValueChange={setSelectedCategory}>
            <SelectTrigger className="min-w-[180px] max-w-[220px]">
              <SelectValue placeholder={t("addCourse.selectCategory")} />
            </SelectTrigger>
            <SelectContent>
  <SelectGroup>
    <SelectLabel>{t("Category")}</SelectLabel>
    {categories.map((category) => (
  <SelectItem key={category.id} value={category.id.toString()}>
    {language === "fr" ? category.titre : category.title}
  </SelectItem>
))}



    
  </SelectGroup>
</SelectContent>

           </Select>
            <Label>{t("addCourse.formateur")}</Label>

  <Select onValueChange={setSelectedFormateur}>
    <SelectTrigger className="min-w-[180px] max-w-[220px]">
      <SelectValue placeholder={t("addCourse.selectFormateur")} />

    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{t("Instructor")}</SelectLabel>

        {formateurs.map((formateur) => (
         <SelectItem
                  key={formateur.id}
                  value={formateur.id.toString()}
                >
                  {formateur.user?.name || `Formateur #${formateur.id}`}
                </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/cours")}>
            {t("addCourse.back")}
          </Button>
          <Button disabled={isLoading} onClick={async () => {
    await createCourseHandler();
    
    navigate("/admin/cours");}}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("addCourse.creating")}
              </>
            ) : (
               t("addCourse.create")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;