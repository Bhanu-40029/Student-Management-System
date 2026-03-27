import { useEffect, useState } from "react";
import StudentLayout from "./StudentLayout";
import API from "../auth/api";
import"../style/style1.css"
function TimeTable() {
  const [data, setData] = useState([]);
  const [student, setStudent] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      const stuRes = await API.get(`/students?username=${user?.username}`);
      const stu = stuRes.data[0];
      setStudent(stu);

      const ttRes = await API.get("/timetable");
      const filtered = ttRes.data.filter(item => item.class === `${stu.branch}${stu.year}`);
      setData(filtered);
    };

    if (user) fetchData();
  }, [user]);

  return (
    <StudentLayout>
      <h2>My Time Table</h2>

      {data.length === 0 ? (
        <p>No timetable assigned</p>
      ) : (
        <table className="timetable-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Subject</th>
              <th>Time</th>
              <th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t) => (
              <tr key={t.id}>
                <td>{t.day}</td>
                <td>{t.subject}</td>
                <td>{t.time}</td>
                <td>{t.faculty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </StudentLayout>
  );
}

export default TimeTable;