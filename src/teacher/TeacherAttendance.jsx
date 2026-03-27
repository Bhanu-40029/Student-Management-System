import { useEffect, useState } from "react";
import API from "../auth/api";
import TeacherLayout from "./TeacherLayout";
import "../style/style1.css";

function TeacherAttendance() {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const fetchStudents = async () => {
      try {
        const res = await API.get("/students");

        // 🔥 filter by teacher department
        const filtered = res.data.filter(
          (s) =>
            s.branch?.toLowerCase() === user?.department?.toLowerCase()
        );

        setStudents(filtered);

      } catch (err) {
        console.error("Error fetching students", err);
      }
    };

    fetchStudents();

  }, [user]);

  // handle dropdown change
  const handleChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status
    });
  };

  // submit attendance
  const handleSubmit = async () => {

    try {

      const today = new Date().toISOString().split("T")[0];

      const promises = students.map((s) => {

        const status = attendance[s.id] || "Absent";

        return API.post("/attendance", {
          studentId: s.id,
          course: "General", // you can replace later with subject
          status: status,
          date: today
        });

      });

      await Promise.all(promises);

      alert("Attendance Submitted Successfully ✅");

    } catch (err) {
      console.error("Error submitting attendance", err);
    }
  };

  return (
    <TeacherLayout>

      <h2>Mark Attendance</h2>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <>
          <table className="attendance-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.rollNo}</td>

                  <td>
                    <select
                      onChange={(e) =>
                        handleChange(s.id, e.target.value)
                      }
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

          <button className="submit-btn" onClick={handleSubmit}>
            Submit Attendance
          </button>
        </>
      )}

    </TeacherLayout>
  );
}

export default TeacherAttendance;