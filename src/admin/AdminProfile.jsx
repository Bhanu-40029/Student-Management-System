import AdminLayout from "./AdminLayout";
import "../style/style.css";
import { useNavigate } from "react-router-dom";

function AdminProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AdminLayout>
      <div className="page-inner">
        <h2>Admin Profile</h2>
         
        <div className="profile-grid">

  <div><strong>ID:</strong> {user?.id}</div>
  <div><strong>Username:</strong> {user?.username}</div>
  <div><strong>Role:</strong> {user?.role}</div>
  <div><strong>Email:</strong> admin@example.com</div>
  <div><strong>Phone:</strong> +91 9876543210</div>
  <div><strong>Department:</strong> Administration</div>

</div>

<div className="profile-actions">
  <button className="edit-btn">Edit Profile</button>
  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>

        
      </div>
    </AdminLayout>
  );
}

export default AdminProfile;