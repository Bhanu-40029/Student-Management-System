import { useEffect, useState } from "react";
import API from "../auth/api";
import AdminLayout from "./AdminLayout";

function AdminViewCourses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await API.get("/courses");
      setCourses(res.data);
    };

    fetchCourses();
  }, []);

  return (
    <AdminLayout>

      <h2>View Courses</h2>

      <table className="data-table">
        <thead>
          <tr>
            
            <th>Course Name</th>
            <th>Branch</th>
            <th>Year</th>
            <th>Faculty</th>
            <th>Credits</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              
              <td>{c.name}</td>
              <td>{c.branch}</td>
              <td>{c.year}</td>
              <td>{c.faculty}</td>
              <td>{c.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </AdminLayout>
  );
}

export default AdminViewCourses;