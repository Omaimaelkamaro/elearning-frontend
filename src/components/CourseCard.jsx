import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 w-full max-w-md bg-white">
      <img src={course.courseThumbnail} alt="thumbnail" className="w-full h-40 object-cover rounded" />

      <h2 className="text-lg font-semibold mt-2">{course.courseTitle}</h2>

      <p className="text-sm text-gray-600 mt-1">
        {course.coursePrice === 0 ? "Gratuit" : `Payant : ₹${course.coursePrice}`}
      </p>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        S’inscrire
      </button>
    </div>
  );
};

export default CourseCard;
