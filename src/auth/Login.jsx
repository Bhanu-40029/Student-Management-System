import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "./api";
import "../style/style1.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.get("/users");

      const user = res.data.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        alert("Login Successful ✅");

        // store logged-in user in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // navigate based on role
        navigate(`/${user.role}/dashboard`);
      } else {
        alert("Invalid Credentials ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server not running or error fetching users");
    }
  };

  return (
    <Layout>
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            New user? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Login;