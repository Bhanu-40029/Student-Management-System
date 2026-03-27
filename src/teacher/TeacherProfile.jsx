import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TeacherLayout from "./TeacherLayout";
import API from "../auth/api";

function TeacherProfile() {
  const location = useLocation();

  // ✅ fallback to localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = location.state?.user || storedUser;

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
  const fetchTeacher = async () => {
    try {
      
      const res = await API.get("/teachers");
     

      const found = res.data.find(
        t => t.username === user?.username
      );

     

      setTeacher(found);
    } catch (err) {
      
    }
  };

  if (user) fetchTeacher();
}, [user]);

  return (
   <TeacherLayout user={user}>
  <h2>Teacher Profile</h2>

  {!teacher ? (
    <p>No profile found</p>
  ) : (
    <div className="profile-grid">

      <div><strong>Name:</strong> {teacher.name}</div>
      <div><strong>Department:</strong> {teacher.department}</div>
      <div><strong>Email:</strong> {teacher.email}</div>
      <div><strong>Phone:</strong> {teacher.phone}</div>

    </div>
  )}
</TeacherLayout>
  );
}

export default TeacherProfile;