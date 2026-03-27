import { useEffect, useState } from "react";
import StudentLayout from "./StudentLayout";
import API from "../auth/api";
import "../style/style1.css";

function StudentProfile() {
  const [student, setStudent] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get(`/students?username=${user?.username}`);
      setStudent(res.data[0]);
    };

    if (user) fetchProfile();
  }, [user]);

  return (
    <StudentLayout>
      <h2>Student Profile</h2>

      {student ? (
        <div className="profile-grid">
          <div><strong>Name:</strong> {student.name}</div>
          <div><strong>Roll No:</strong> {student.rollNo}</div>
          <div><strong>Branch:</strong> {student.branch}</div>
          <div><strong>Year:</strong> {student.year}</div>
          <div><strong>Email:</strong> {student.email}</div>
          <div><strong>Phone:</strong> {student.phone}</div>
          <div><strong>Address:</strong> {student.address}</div>
          <div><strong>DOB:</strong> {student.dob}</div>
        </div>
      ) : (
        <p>No profile found</p>
      )}
    </StudentLayout>
  );
}

export default StudentProfile;