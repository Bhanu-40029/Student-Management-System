import { Link } from "react-router-dom";

function TeacherSidebar() {
  return (
    <div className="student-sidebar">
      <Link to="/teacher/dashboard">Dashboard</Link>
      <Link to="/teacher/profile">Profile</Link>
      <Link to="/teacher/timetable">Time Table</Link>
      <Link to="/teacher/students">Students</Link>
      <Link to="/teacher/attendance">Attendance</Link>
      
      <Link to="/teacher/announcements">Announcements</Link>
    </div>
  );
}

export default TeacherSidebar;