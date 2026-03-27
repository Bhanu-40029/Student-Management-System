import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import API from "../auth/api";
import "../style/style.css";

function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: ""
  });

  const [editingId, setEditingId] = useState(null);

  // fetch teachers
  useEffect(() => {
    API.get("/teachers").then(res => setTeachers(res.data));
  }, []);

  // input change
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add or update
  const handleSubmit = async () => {
    if (!form.name || !form.department) return alert("Fill all fields");

    if (editingId) {
      // UPDATE
      const res = await API.put(`/teachers/${editingId}`, form);
      setTeachers(teachers.map(t => (t.id === editingId ? res.data : t)));
      setEditingId(null);
    } else {
      // ADD
      const res = await API.post("/teachers", form);
      setTeachers([...teachers, res.data]);
    }

    setForm({ name: "", department: "" });
  };

  // delete
  const handleDelete = async id => {
    await API.delete(`/teachers/${id}`);
    setTeachers(teachers.filter(t => t.id !== id));
  };

  // edit click
  const handleEdit = teacher => {
    setForm(teacher);
    setEditingId(teacher.id);
  };

  return (
    <AdminLayout>
      <div className="page-inner">
        <h2>Manage Teachers</h2>

        {/* TABLE */}
        <table className="timetable-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map(t => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.department}</td>
                <td>
                  <button onClick={() => handleEdit(t)}>Edit</button>{" "}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(t.id)}
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
          <h3>{editingId ? "Update Teacher" : "Add New Teacher"}</h3>

          <input
            name="name"
            placeholder="Teacher Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>
            {editingId ? "Update Teacher" : "Add Teacher"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageTeachers;