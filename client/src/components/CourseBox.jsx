// CourseBox.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CourseBox.css';

const CourseBox = ({ course_instructor, course_Name, description, linkTo }) => {
  return (
    <div className="course-box bg-white rounded-lg overflow-hidden shadow-md p-4">
      <Link to={course_Name} className="block">
        <h2 className="text-xl font-bold mb-2">{course_Name}</h2>
        <p className="text-gray-700 mb-2">Course Instructor: {course_instructor}</p>
        <p className="text-gray-600">{description}</p>
      </Link>
    </div>
  );
}

export default CourseBox;
