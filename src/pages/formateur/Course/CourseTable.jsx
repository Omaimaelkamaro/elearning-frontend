import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCourseContext } from "@/context/Course/CourseContext.jsx";
import { Edit, Trash2 ,Archive, ArchiveRestore} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { courses, isLoading,deleteCourse,archiveCourse ,desarchiveCourse,fetchCourses} = useCourseContext();

  const navigate = useNavigate();

 

  const handleArchiveCourse = async (id) => {
  await archiveCourse(id);
  await fetchCourses();
};


 const handleDesarchiveCourse = async (id) => {
  await desarchiveCourse(id);
  await fetchCourses();
};

  const handleDelete = async (id) => {
    if (window.confirm("Confirm deletion?")) {
      await  deleteCourse(id);
      await fetchCourses();
    }
  };

  const coursesListe = courses || [];
  console.log("Courses list:", coursesListe);
   if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Button onClick={() => navigate(`create`)}>Create a new course</Button>

      {coursesListe.length === 0 ? (
        <p className="mt-4">No courses found.</p>
      ) : (
        <Table>
          <TableCaption>A list of your recent courses.</TableCaption>
          <TableHeader>
            <TableRow>
                 <TableHead>Title</TableHead>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead>Status</TableHead>
             
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coursesListe.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>
                <TableCell className="font-medium">
                  {course?.prix || "NA"}
                </TableCell>
                <TableCell>
                  <Badge>
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right ">
                  <Button
                    
                    variant="ghost"
                    onClick={() => navigate(`${course.id}`)}
                  >
                    <Edit size={16}/>
                  </Button>
                  
                

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(course.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                  <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => course.archived ? handleDesarchiveCourse(course.id) 
                                              : handleArchiveCourse(course.id)}
                                      className={course.archived  ? "text-green-600" : "text-gray-500"}
                                    >
                                      {course.archived  ? (
                                        <ArchiveRestore className="h-4 w-4" />
                                      ) : (
                                        <Archive className="h-4 w-4" />
                                      )}
                                   </Button>
                </TableCell>
                
                
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CourseTable;
