import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./auth/Login";
import Register from "./auth/Register";

/* Student */
import StudentDashboard from "./student module/StudentDashboard";
import StudentProfile from "./student module/StudentProfile";
import TimeTable from "./student module/TimeTable";
import ExamSection from "./student module/ExamSection";
import Attendance from "./student module/Attendance";
import Announcements from "./student module/Announcements";

/* Admin */
import AdminAnnouncements from "./admin/AdminAnnouncements";
import AdminDashboard from "./admin/AdminDashboard";
import ManageStudents from "./admin/ManageStudents";
import ManageTeachers from "./admin/ManageTeachers";

import AdminProfile from "./admin/AdminProfile";

/* Teacher */
import TeacherDashboard from "./teacher/TeacherDashboard";
import TeacherTimeTable from "./teacher/TeacherTimetable";
import TeacherStudents from "./teacher/TeacherStudents";
import TeacherAttendance from "./teacher/TeacherAttendance";
import TeacherProfile from "./teacher/TeacherProfile";
import TeacherAssignments from "./teacher/TeacherAssignments";
import TeacherResults from "./teacher/TeacherResults";
import TeacherAnnouncements from "./teacher/TeacherAnnouncements";
import TeacherTimetable from "./teacher/TeacherTimetable";
import AdminAddCourse from "./admin/AdminAddCourse";
import AdminViewCourses from "./admin/AdminViewCourses";
import StudentCourseRegistration from "./student module/StudentCourseRegistration";

function App() {
  const [user, setUser] = useState(null);

  /* 🔔 ANNOUNCEMENTS GLOBAL STATE */
  const [announcements, setAnnouncements] = useState(() => {
    return JSON.parse(localStorage.getItem("announcements")) || [];
  });

  useEffect(() => {
    localStorage.setItem("announcements", JSON.stringify(announcements));
  }, [announcements]);

  /* 📊 ATTENDANCE GLOBAL STATE */
  const [attendanceData, setAttendanceData] = useState([]);

  return (
    <BrowserRouter>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= STUDENT ================= */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/timetable" element={<TimeTable />} />
        <Route path="/student/results" element={<ExamSection />} />
        <Route path="/student/course-registration" element={<StudentCourseRegistration />}/>

        <Route
          path="/student/attendance"
          element={<Attendance attendanceData={attendanceData} />}
        />

        <Route
          path="/student/announcements"
          element={<Announcements announcements={announcements} />}
        />
         <Route
          path="/teacher/announcements"
          element={<TeacherAnnouncements announcements={announcements} />}
        />


        {/* ================= ADMIN ================= */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route
          path="/admin/announcements"
          element={
            <AdminAnnouncements
              announcements={announcements}
              setAnnouncements={setAnnouncements}
            />
          }
        />

        <Route path="/admin/students" element={<ManageStudents />} />
        <Route path="/admin/teachers" element={<ManageTeachers />} />
        
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/add-course" element={<AdminAddCourse />} />
        <Route path="/admin/view-courses" element={<AdminViewCourses />} />


        {/* ================= TEACHER ================= */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/timetable" element={<TeacherTimetable user={user} />}
/>
        <Route path="/teacher/students" element={<TeacherStudents />} />

        <Route
          path="/teacher/attendance"
          element={
            <TeacherAttendance
              attendanceData={attendanceData}
              setAttendanceData={setAttendanceData}
            />
          }
        />

        <Route path="/teacher/assignments" element={<TeacherAssignments />} />
        <Route path="/teacher/results" element={<TeacherResults />} />

        {/* <Route
          path="/teacher/announcements"
          element={<TeacherAnnouncements announcements={announcements} />}
        /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;