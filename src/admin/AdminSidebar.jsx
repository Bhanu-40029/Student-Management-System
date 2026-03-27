import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="student-sidebar">
      <Link to="/admin/dashboard">Admin Dashboard</Link>
      <Link to="/admin/students">Manage Students</Link>
      <Link to="/admin/teachers">Manage Teachers</Link>
      
      <Link to="/admin/announcements">Announcements</Link>
      <Link to="/admin/profile">Admin Profile</Link>
      <Link to="/admin/add-course">Add Course</Link>
      <Link to="/admin/view-courses">View Courses</Link>
    </div>
  );
}

export default AdminSidebar;