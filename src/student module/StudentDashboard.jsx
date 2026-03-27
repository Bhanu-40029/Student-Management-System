import { useEffect, useState } from "react";
import StudentLayout from "./StudentLayout";
import API from "../auth/api";
import "../style/style1.css";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [attendanceCount, setAttendanceCount] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const attRes = await API.get("/attendance");
      const myAtt = attRes.data.filter(
        (a) => String(a.studentId) === String(user?.id)
      );
      setAttendanceCount(myAtt.length);

      const annRes = await API.get("/announcements");
      setAnnouncements(annRes.data);

      const ttRes = await API.get("/timetable");
      setTimetable(ttRes.data.slice(0, 1)); // show first upcoming class
    };

    if (user) fetchData();
  }, [user]);

  return (
    <StudentLayout>
      <div className="dashboard-container">
        {/* Welcome */}
        <div className="welcome-box">
          <h2>Welcome {user?.username} 👋</h2>
          <p>Track your academics and stay updated</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Attendance Records</h3>
            <p>{attendanceCount}</p>
          </div>

          <div className="stat-card">
            <h3>Total Announcements</h3>
            <p>{announcements.length}</p>
          </div>

          <div className="stat-card">
            <h3>Upcoming Class</h3>
            <p>{timetable[0]?.subject || "N/A"}</p>
          </div>

          <div className="stat-card">
            <h3>Status</h3>
            <p>Active</p>
          </div>
        </div>

        {/* Announcements Preview */}
        <div className="announcement-box">
          <h3>Latest Announcements</h3>
          {announcements.slice(0, 3).map((a) => (
            <p key={a.id}>📢 {a.title}</p>
          ))}
        </div>

      </div>
    </StudentLayout>
  );
}

export default StudentDashboard;