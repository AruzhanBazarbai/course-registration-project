import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS = [
  { id: 1, name: "Student Aliya", username: "student", password: "1234", role: "student" },
  { id: 2, name: "Teacher Marat", username: "teacher", password: "1234", role: "teacher" },
];

export const Login = () => {
  const [username, setUsername] = useState("student");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/courses");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: "white", borderRadius: "16px", padding: "48px 52px", width: "420px", border: "1px solid #e5e7eb" }}>
        <div style={{ fontSize: "22px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>
          Edu<span style={{ color: "#6366f1" }}>Reg</span>
        </div>
        <div style={{ fontSize: "13.5px", color: "#9ca3af", marginBottom: "32px" }}>Course Registration Platform</div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", fontSize: "13px", padding: "10px 14px", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Enter username"
            style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", outline: "none", background: "#f9fafb", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", outline: "none", background: "#f9fafb", boxSizing: "border-box" }} />
        </div>

        <button onClick={handleLogin}
          style={{ width: "100%", background: "#6366f1", color: "white", border: "none", borderRadius: "8px", padding: "11px", fontSize: "14.5px", fontWeight: 600, cursor: "pointer", marginTop: "6px" }}>
          Sign in
        </button>

        {/* <div style={{ textAlign: "center", fontSize: "12px", color: "#d1d5db", marginTop: "18px" }}>
          student / 1234 · teacher / 1234
        </div> */}
      </div>
    </div>
  );
};