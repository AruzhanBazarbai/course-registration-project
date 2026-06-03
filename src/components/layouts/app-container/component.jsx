import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export const AppContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItem = (label, path) => {
    const active = location.pathname === path;
    return (
      <button onClick={() => navigate(path)} style={{
        padding: "6px 14px", borderRadius: "8px", fontSize: "14px",
        color: active ? "#4f46e5" : "#6b7280", cursor: "pointer",
        border: "none", background: active ? "#eef2ff" : "none",
        fontWeight: 500, fontFamily: "'Segoe UI', sans-serif"
      }}>
        {label}
      </button>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', sans-serif" }}>
      {user && (
        <div style={{ background: "white", borderBottom: "1px solid #f0f0f0", height: "56px", display: "flex", alignItems: "center", padding: "0 28px", gap: "16px", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ fontSize: "17px", fontWeight: 700, color: "#111" }}>
            Edu<span style={{ color: "#6366f1" }}>Reg</span>
          </div>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb" }} />
          <div style={{ display: "flex", gap: "4px", flex: 1 }}>
            {navItem("Courses", "/courses")}
            {user.role === "student" && navItem("My Schedule", "/schedule")}
            {user.role === "teacher" && navItem("Manage", "/courses")}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#eef2ff", color: "#4f46e5", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {user.name[0]}
            </div>
            <div style={{ fontSize: "13.5px", fontWeight: 500, color: "#374151" }}>{user.name}</div>
            <button onClick={handleLogout} style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "5px 12px", fontSize: "13px", color: "#6b7280", cursor: "pointer" }}>
              Sign out
            </button>
          </div>
        </div>
      )}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "36px 28px" }}>
        <Outlet />
      </div>
    </div>
  );
};