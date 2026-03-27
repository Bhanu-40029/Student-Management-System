import { useEffect, useState } from "react";
import TeacherLayout from "./TeacherLayout";
import API from "../auth/api";

function TeacherStudents() {

  const [students, setStudents] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const fetchStudents = async () => {
      try {

        // 🔥 get teacher details
        const teacherRes = await API.get("/teachers");

        const teacher = teacherRes.data.find(
          t => t.username === user.username
        );

        // 🔥 get students
        const res = await API.get("/students");

        // 🔥 filter dynamically
        const filtered = res.data.filter(
          (s) =>
            s.branch?.toLowerCase() ===
            teacher?.department?.toLowerCase()
        );

        setStudents(filtered);

      } catch (err) {
        console.error("Error fetching students", err);
      }
    };

    fetchStudents();

  }, [user]);

  return (
    <TeacherLayout>

      <h2>My Students</h2>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table className="timetable-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Branch</th>
              <th>Year</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.rollNo}</td>
                <td>{s.branch}</td>
                <td>{s.year}</td>
              </tr>
            ))}
          </tbody>

        </table>
      )}

    </TeacherLayout>
  );
}

export default TeacherStudents;