import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchCourses } from '../store/slices/coursesSlice';

const Courses: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, isLoading } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Available Courses
        </h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Browse All Courses
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-sm text-gray-500">
                  ⭐ {course.rating}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {course.description}
              </p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Instructor:</span>
                  <span>{course.instructor_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{course.duration_weeks} weeks</span>
                </div>
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span className="capitalize">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Students:</span>
                  <span>{course.enrollment_count}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;