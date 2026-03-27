import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Register(){
      const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  const handleRegister = () => {
    const existingUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const newUser = { username, password, role };

    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    alert("Registered successfully!");
    navigate("/");
  };
   return (
     <Layout>
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
    </Layout>
  );
}
export default Register;