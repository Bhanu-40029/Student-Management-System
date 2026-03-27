import { useState } from "react";
import AdminLayout from "./AdminLayout";
import "../style/style1.css";

function AdminAnnouncements({ announcements, setAnnouncements }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    if (!title || !message) return alert("Fill all fields");

    const newAnnouncement = {
      id: Date.now(),
      title,
      message,
      date: new Date().toLocaleDateString()
    };

    setAnnouncements([...announcements, newAnnouncement]);
    setTitle("");
    setMessage("");
  };

  return (
    <AdminLayout>
      <div className="page-inner">
        <h2>Admin Announcements</h2>

        <div className="form-card">
          <input
            type="text"
            placeholder="Announcement Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
          className="announcement-input"
            placeholder="Announcement Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />

          <button onClick={handleAdd}>Add Announcement</button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAnnouncements;