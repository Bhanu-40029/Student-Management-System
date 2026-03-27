import { useEffect, useState } from "react";
import API from "../auth/api";
import StudentLayout from "./StudentLayout";

function StudentCourseRegistration() {

  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await API.get("/courses");
      setCourses(res.data);
    };

    fetchCourses();
  }, []);

  const handleRegister = async (courseId) => {

    const registration = {
      studentId: user.id,
      courseId: courseId
    };

    try {
      await API.post("/registrations", registration);
      alert("Course Registered Successfully");
    } catch (error) {
      console.error("Registration Error", error);
    }
  };

  return (
    <StudentLayout>

      <h2>Available Courses</h2>

      <table className="data-table">

        <thead>
          <tr>
            <th>Course</th>
            <th>Branch</th>
            <th>Year</th>
            <th>Faculty</th>
            <th>Credits</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (

            <tr key={course.id}>

              <td>{course.name}</td>
              <td>{course.branch}</td>
              <td>{course.year}</td>
              <td>{course.faculty}</td>
              <td>{course.credits}</td>

              <td>
                <button onClick={() => handleRegister(course.id)}>
                  Register
                </button>
              </td>

            </tr>

          ))}
        </tbody>

      </table>

    </StudentLayout>
  );
}

export default StudentCourseRegistration;