import { useEffect, useState } from "react";
import StudentLayout from "./StudentLayout";
import API from "../auth/api";
import "../style/style1.css";

function ExamSection() {
  const [result, setResult] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchResults = async () => {
      const res = await API.get("/results");
      const studentResult = res.data.find(
        (r) => r.username === user?.username
      );
      setResult(studentResult);
    };

    if (user) fetchResults();
  }, [user]);

  if (!result) return <StudentLayout>Loading...</StudentLayout>;

  return (
    <StudentLayout>
      <h2>SEM END EXAM RESULT</h2>
      <p><strong>Name:</strong> {result.name}</p>
      <p><strong>Semester:</strong> {result.semester}</p>
      <p><strong>SGPA:</strong> {result.sgpa}</p>

      <table className="result-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Course</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {result.subjects.map((s, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{s.name}</td>
              <td>{s.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StudentLayout>
  );
}

export default ExamSection;