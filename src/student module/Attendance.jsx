import { useEffect, useState } from "react";
import StudentLayout from "./StudentLayout";
import API from "../auth/api";
import "../style/style1.css";
function Attendance() {

  const [data, setData] = useState([]);
  const [percentage, setPercentage] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const fetchData = async () => {

      const res = await API.get("/attendance");

      const myData = res.data.filter(
        (a) => String(a.studentId) === String(user.id)
      );

      setData(myData);

      // calculate %
      const total = myData.length;
      const present = myData.filter(a => a.status === "Present").length;

      const percent = total ? ((present / total) * 100).toFixed(1) : 0;
      setPercentage(percent);
    };

    fetchData();

  }, [user]);

  return (
    <StudentLayout>

      <h2>My Attendance</h2>

      <h3 style={{ marginBottom: "10px", color: "#5c54d6" }}>
        Overall Attendance: {percentage}%
      </h3>

      {data.length === 0 ? (
        <p>No attendance yet</p>
      ) : (
        <table className="attendance-table">

          <thead>
            <tr>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((a) => (
              <tr key={a.id}>
                <td>{a.course}</td>
                <td>{a.date}</td>
                <td>{a.status}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}

    </StudentLayout>
  );
}

export default Attendance;