import { useState } from "react";
import API from "../auth/api";
import AdminLayout from "./AdminLayout";

function AdminAddCourse() {

  const [name, setName] = useState("");
  const [credits, setCredits] = useState("");
  const [faculty, setFaculty] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      name,
      credits,
      faculty,
      branch,
      year
    };

    try {
      await API.post("/courses", newCourse);
      alert("Course Added Successfully");

      setName("");
      setCredits("");
      setFaculty("");
      setBranch("");
      setYear("");
    } catch (error) {
      console.error("Error adding course", error);
    }
  };

  return (
    <AdminLayout>

      <h2>Add Course</h2>

      <form onSubmit={handleSubmit} className="form-box">

        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Faculty"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        <button type="submit">Add Course</button>

      </form>

    </AdminLayout>
  );
}

export default AdminAddCourse;