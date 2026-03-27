import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import API from "../auth/api";
import "../style/style1.css";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    branch: "",
    year: ""
  });

  const [editingId, setEditingId] = useState(null);

  // fetch students
  useEffect(() => {
    API.get("/students").then(res => setStudents(res.data));
  }, []);

  // input change
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add or update
  const handleSubmit = async () => {
    if (!form.name || !form.rollNo) return alert("Fill all fields");

    if (editingId) {
      // UPDATE
      const res = await API.put(`/students/${editingId}`, form);
      setStudents(students.map(s => (s.id === editingId ? res.data : s)));
      setEditingId(null);
    } else {
      // ADD
      const res = await API.post("/students", form);
      setStudents([...students, res.data]);
    }

    setForm({ name: "", rollNo: "", branch: "", year: "" });
  };

  // delete
  const handleDelete = async id => {
    await API.delete(`/students/${id}`);
    setStudents(students.filter(s => s.id !== id));
  };

  // edit click
  const handleEdit = student => {
    setForm(student);
    setEditingId(student.id);
  };

  return (
    <AdminLayout>
      <div className="page-inner">
        <h2>Manage Students</h2>

        {/* TABLE */}
        <table className="timetable-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.rollNo}</td>
                <td>{s.branch}</td>
                <td>{s.year}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>{" "}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FORM */}
        <div className="form-card">
          <h3>{editingId ? "Update Student" : "Add New Student"}</h3>

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="rollNo"
            placeholder="Roll No"
            value={form.rollNo}
            onChange={handleChange}
          />

          <input
            name="branch"
            placeholder="Branch"
            value={form.branch}
            onChange={handleChange}
          />

          <input
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>
            {editingId ? "Update Student" : "Add Student"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageStudents;