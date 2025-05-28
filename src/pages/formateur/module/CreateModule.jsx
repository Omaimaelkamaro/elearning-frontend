import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModuleContext } from "@/context/Module/ModuleContext";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Module  from "@/pages/formateur/module/Module";

const CreateModule = () => {
  const [moduleTitle, setModuleTitle] = useState("");
  const { id: courseId } = useParams(); 
  const navigate = useNavigate();

  const {
    modules,
    isLoading,
    error,
    createmodules,
    getAllmodules
  } = useModuleContext();

  console.log("modules dans CreateModule:", modules, "length:", modules?.length);

  useEffect(() => {
    if (!courseId) {
      console.error("Course ID is missing!");
      return;
    }
    getAllmodules(courseId).catch(err => {
      console.error("Failed to load modules:", err);
    });
  }, [courseId]);

  const handleCreateModule = async () => {
    if (!courseId) {
      toast.error("Course ID is missing");
      return;
    }

    if (!moduleTitle.trim()) {
      toast.error("Module title is required");
      return;
    }

    try {
      await createmodules({ title: moduleTitle }, courseId); // ✅ fixed argument
      setModuleTitle("");
      toast.success("Module created successfully");
      await getAllmodules(courseId);
    } catch (err) {
      console.error("Full error details:", err);
      toast.error(err.response?.data?.message || err.message || "Creation failed");
    }
  };

  

// const courseIdNum = Number(courseId);

// const filteredModules = Array.isArray(modules)
//   ? modules.filter(module => module?.cours_id === courseIdNum || module?.course?.id === courseIdNum)
//   : [];

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add modules, add some basic details for your new module
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, laborum!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/formateur/cours/${courseId}`)} // ✅ fixed
          >
            Back to course
          </Button>
          <Button 
            disabled={isLoading} 
            onClick={handleCreateModule}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create module"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {isLoading ? (
            <p>Loading modules...</p>
          ) : error ? (
            <p>Failed to load modules: {error}</p>
          ) : modules.length === 0 ? (
            <p>No modules available for this course</p>
          ) : (
            modules.map((module, index) => (
              <Module
                key={module.id || index }
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
