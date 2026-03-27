import { Link } from "react-router-dom"
import "../style/style.css";
function StudentSidebar(){
    return(
        <>
        <div className="student-sidebar">
      <Link to="/student/dashboard">Student Dashboard</Link>
      <Link to="/student/profile">Student Profile</Link>
      <Link to="/student/timetable">Time Table</Link>
      <Link to="/student/results">Exam Results</Link>
      <Link to="/student/attendance">Attendance</Link>
      <Link to="/student/announcements">Announcements</Link>
      <Link to="/student/course-registration">Course Registration</Link>
    </div>
        </>
    )
}
export default StudentSidebar;