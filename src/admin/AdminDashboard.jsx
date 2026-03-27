import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import API from "../auth/api";
import "../style/style.css";
function AdminDashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await API.get("/students");
        const teachersRes = await API.get("/teachers");

        setStudentsCount(studentsRes.data.length);
        setTeachersCount(teachersRes.data.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>

  {/* 💜 Welcome */}
  <div className="welcome-box">
    <h2>Welcome Admin 👋</h2>
    <p>Manage your system efficiently</p>
  </div>

  {/* 📊 Stats */}
  <div className="stats-grid">

    <div className="stat-card">
      <h3>Total Students</h3>
      <p>{studentsCount}</p>
    </div>

    <div className="stat-card">
      <h3>Total Teachers</h3>
      <p>{teachersCount}</p>
    </div>

    <div className="stat-card">
      <h3>System Status</h3>
      <p>Active ✅</p>
    </div>

  </div>

</AdminLayout>
  );
}

export default AdminDashboard;