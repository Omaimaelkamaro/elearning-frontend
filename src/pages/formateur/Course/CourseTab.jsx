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
// import { useCategoryContext } from "@/context/Category/CategoryContext";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

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

  const { id } = useParams();
  const navigate = useNavigate();
  // const { categories } = useCategoryContext();
  console.log(id);
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

  // const selectCategory = (value) => {
  //   setInput((prev) => ({ ...prev, category: value }));
  // };

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
      console.log("CourseData envoyé au backend:", formData );
      
      
      toast.success("Course updated successfully");
    } catch (err) {
      toast.error("Failed to update course");
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
      toast.error("Failed to publish or unpublish course");
    }
  };

  

  if (courseByIdLoading) return <h1>Loading...</h1>;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
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
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
            />
          </div>

          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <Label>Course Level</Label>
              <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="basique">Beginner</SelectItem>
                    <SelectItem value="moyen">Medium</SelectItem>
                    <SelectItem value="avance">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price ($)</Label>
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

              <Label htmlFor="gratuit">Free</Label>
            </div>
          </div>

          <div>
            <Label>Course Thumbnail</Label>
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
                alt="Course Thumbnail"
              />
            )}
          </div>

          <div className="flex gap-4">
            <Button onClick={() => navigate("/admin/cours")} variant="outline">
              Cancel
            </Button>
            <Button disabled={isSaving} onClick={updateCourseHandler}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
