import RichTextEditor from "@/components/RichTextEditor";
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
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
    gratuit: false,
  });

  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
    updateCourse,
    updateImageCourse,
    publishCourse,
  } = useCourseContext();

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData.course;
      setInput({
        courseTitle: course.title || "",
        gratuit: course.gratuit === 1 || course.gratuit === true,
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.niveau_de_difficulte || "",
        coursePrice: course.prix || "",
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const selectCourseLevel = (value) => {
    setInput((prev) => ({ ...prev, courseLevel: value }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    setIsSaving(true);

    const formData = new FormData();
    formData.append("title", input.courseTitle);
    formData.append("description", input.description);
    formData.append("categorie_id", input.category);
    formData.append("niveau_de_difficulte", input.courseLevel);
    formData.append("prix", input.coursePrice);
    formData.append("gratuit", input.gratuit ? 1 : 0);

    await updateCourse(id, formData);

    if (input.courseThumbnail) {
      const imageData = new FormData();
      imageData.append("photo_path", input.courseThumbnail);
      await updateImageCourse(id, imageData);
    }

    try {
      toast.success(t("course.updateSuccess"));
    } catch (err) {
      toast.error(t("course.updateFail"));
    } finally {
      setIsSaving(false);
    }
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ id, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(t("course.publishFail"));
    }
  };

  if (courseByIdLoading) return <h1>{t("common.loading")}</h1>;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>{t("course.basicInfo")}</CardTitle>
          <CardDescription>
            {t("course.descriptionInfo")}
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")
            }
          >
            {courseByIdData?.course.isPublished
              ? t("course.unpublish")
              : t("course.publish")}
          </Button>
          <Button variant="destructive">{t("course.remove")}</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>{t("course.title")}</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder={t("course.titlePlaceholder")}
            />
          </div>

          <div>
            <Label>{t("course.description")}</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <Label>{t("course.level")}</Label>
              <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px] truncate">
                  <SelectValue placeholder={t("course.selectLevel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("course.level")}</SelectLabel>
                    <SelectItem value="basique">{t("course.levels.beginner")}</SelectItem>
                    <SelectItem value="moyen">{t("course.levels.medium")}</SelectItem>
                    <SelectItem value="avance">{t("course.levels.advanced")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{t("course.price")}</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>

            <div className="flex items-center space-x-2 mt-5">
              <Checkbox
                id="gratuit"
                checked={input.gratuit === true || input.gratuit === "1"}
                onChange={(e) =>
                  setInput({ ...input, gratuit: e.target.checked })
                }
              />
              <Label htmlFor="gratuit">{t("course.free")}</Label>
            </div>
          </div>

          <div>
            <Label>{t("course.thumbnail")}</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt={t("course.thumbnail")}
              />
            )}
          </div>

          <div className="flex gap-4">
            <Button onClick={() => navigate("/admin/cours")} variant="outline">
              {t("common.cancel")}
            </Button>
            <Button
              disabled={isSaving}
              onClick={async () => {
                await updateCourseHandler();
                navigate("/admin/cours");
              }}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("common.wait")}
                </>
              ) : (
                t("common.save")
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
