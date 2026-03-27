import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/style1.css";

function Header() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUsername(user?.username || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear session
    navigate("/"); // go to login page
  };

  return (
    <header className="header">
      <div className="header-title">
        Student Information Management System
      </div>

      <div className="header-user">
        {username && (
          <>
            <span>Welcome {username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;