import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TeacherLayout from "./TeacherLayout";
import API from "../auth/api";

function TeacherDashboard() {
  const { state } = useLocation();
  const user = state?.user;

  const [todayClasses, setTodayClasses] = useState([]);
  const [studentsCount, setStudentsCount] = useState(0);
  const [announcementsCount, setAnnouncementsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 timetable for this teacher
        const tt = await API.get("/timetable");
        const myClasses = tt.data.filter(
          t => t.faculty === user.username
        );
        setTodayClasses(myClasses);

        // 🔹 total students
        const students = await API.get("/students");
        setStudentsCount(students.data.length);

        // 🔹 announcements
        const ann = await API.get("/announcements");
        setAnnouncementsCount(ann.data.length);

      } catch (err) {
        console.error("Dashboard error", err);
      }
    };

    if (user) fetchData();
  }, [user]);

  return (
    <TeacherLayout>
      <div className="welcome-box" >
      <h2>Welcome {user?.username} 👋</h2>
      <p>Here’s your teaching overview</p>
       </div>
      {/* Stats Cards */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>Today’s Classes</h3>
          <p>{todayClasses.length}</p>
        </div>

        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{studentsCount}</p>
        </div>

        <div className="stat-card">
          <h3>Announcements</h3>
          <p>{announcementsCount}</p>
        </div>

      </div>

      {/* Schedule */}
      <div className="announcement-box">
        <h3>Today’s Schedule</h3>

        {todayClasses.length === 0 ? (
          <p>No classes today</p>
        ) : (
          <ul>
            {todayClasses.map(c => (
              <li key={c.id}>
                📚 {c.subject} — {c.time}
              </li>
            ))}
          </ul>
        )}
      </div>
    </TeacherLayout>
  );
}

export default TeacherDashboard;