import { useEffect, useState } from "react";
import TeacherLayout from "./TeacherLayout";
import "../style/style1.css";
import API from "../auth/api";
function TeacherAssignments({user}){
   const storedUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user || storedUser;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchTT = async () => {
      const res = await API.get("/timetable");

      const myTT = res.data.filter(
        (t) => t.faculty === currentUser.username
      );

      setData(myTT);
    };

    fetchTT();
  }, [currentUser]);

  return (
    <TeacherLayout user={currentUser}>
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
              <th>Class</th>
            </tr>
          </thead>

          <tbody>
            {data.map((t) => (
              <tr key={t.id}>
                <td>{t.day}</td>
                <td>{t.subject}</td>
                <td>{t.time}</td>
                <td>{t.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TeacherLayout>
  );
}
export default TeacherAssignments;