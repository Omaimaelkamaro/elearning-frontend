import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ModuleTab from "./ModuleTab";

const EditModule = () => {
  const params = useParams();
  const courseId = params.courseId;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/course/${courseId}/module`}>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="font-bold text-xl">Update Your module</h1>
        </div>
      </div>
      <ModuleTab />
    </div>
  );
};

export default EditModule;