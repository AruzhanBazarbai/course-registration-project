import React, { useState } from "react";

export const Schedule = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [schedule, setSchedule] = useState(
    JSON.parse(localStorage.getItem("schedule_" + user.id) || "[]")
  );
  const [message, setMessage] = useState("");

  const handleRemove = (course) => {
    const updated = schedule.filter(c => c.id !== course.id);
    setSchedule(updated);
    localStorage.setItem("schedule_" + user.id, JSON.stringify(updated));

    const courses = JSON.parse(localStorage.getItem("courses") || "[]");
    localStorage.setItem("courses", JSON.stringify(
      courses.map(c => c.id === course.id ? { ...c, seats: c.seats + 1 } : c)
    ));

    setMessage("Course removed from schedule!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#111" }}>My Schedule</div>
          <div style={{ fontSize: "14px", color: "#9ca3af", marginTop: "3px" }}>{schedule.length} courses enrolled</div>
        </div>
      </div>

      {schedule.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
          {[["Enrolled", schedule.length], ["This week", schedule.length], ["Total hours", schedule.length * 2]].map(([label, val]) => (
            <div key={label} style={{ background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "16px 20px" }}>
              <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>{label}</div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#111" }}>{val}</div>
            </div>
          ))}
        </div>
      )}

      {message && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", color: "#16a34a", padding: "10px 14px", marginBottom: "20px", fontSize: "13px" }}>
          {message}
        </div>
      )}

      {schedule.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📅</div>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>No courses yet</div>
          <div style={{ fontSize: "14px", color: "#9ca3af" }}>Go to Courses tab and enroll in courses</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {schedule.map(course => (
            <div key={course.id} style={{ background: "white", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#6366f1", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "#111" }}>{course.title}</div>
                <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "3px" }}>{course.instructor}</div>
              </div>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#6366f1", background: "#eef2ff", padding: "4px 10px", borderRadius: "20px", whiteSpace: "nowrap" }}>
                {course.schedule}
              </span>
              <button onClick={() => handleRemove(course)} style={{ background: "none", border: "1px solid #fecaca", borderRadius: "8px", padding: "5px 12px", fontSize: "13px", color: "#dc2626", cursor: "pointer" }}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};