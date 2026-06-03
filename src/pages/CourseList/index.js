import React, { useState, useEffect } from "react";

const API = "http://localhost:5001";

export const CourseList = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [form, setForm] = useState({ title: "", instructor: "", schedule: "", seats: "" });

  const schedule = JSON.parse(localStorage.getItem("schedule_" + (user?.id)) || "[]");

  useEffect(() => {
    fetch(API + "/courses")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(() => showMsg("Server not available", "error"));
  }, []);

  const showMsg = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEnroll = (course) => {
    const sched = JSON.parse(localStorage.getItem("schedule_" + user.id) || "[]");
    if (sched.find(s => s.id === course.id)) { showMsg("Already enrolled!", "error"); return; }
    if (course.seats <= 0) { showMsg("No seats available!", "error"); return; }
    const updated = { ...course, seats: course.seats - 1 };
    fetch(API + "/courses/" + course.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seats: course.seats - 1 })
    }).then(() => {
      setCourses(courses.map(c => c.id === course.id ? updated : c));
      localStorage.setItem("schedule_" + user.id, JSON.stringify([...sched, course]));
      showMsg("Successfully enrolled!", "success");
    });
  };

  const handleDelete = (id) => {
    fetch(API + "/courses/" + id, { method: "DELETE" })
      .then(() => {
        setCourses(courses.filter(c => c.id !== id));
        showMsg("Course deleted!", "success");
      });
  };

  const openEdit = (course) => {
    setEditCourse(course);
    setForm({ title: course.title, instructor: course.instructor, schedule: course.schedule, seats: course.total });
    setShowModal(true);
  };

  const openAdd = () => {
    setEditCourse(null);
    setForm({ title: "", instructor: user.name, schedule: "", seats: "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title || !form.seats) { showMsg("Fill all fields!", "error"); return; }
    if (editCourse) {
      const updated = { ...editCourse, title: form.title, instructor: form.instructor, schedule: form.schedule, total: Number(form.seats), seats: Number(form.seats) };
      fetch(API + "/courses/" + editCourse.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      }).then(() => {
        setCourses(courses.map(c => c.id === editCourse.id ? updated : c));
        showMsg("Course updated!", "success");
      });
    } else {
      const newCourse = { title: form.title, instructor: form.instructor, schedule: form.schedule, seats: Number(form.seats), total: Number(form.seats) };
      fetch(API + "/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse)
      }).then(res => res.json()).then(data => {
        setCourses([...courses, data]);
        showMsg("Course added!", "success");
      });
    }
    setShowModal(false);
  };

  const isEnrolled = (id) => schedule.find(s => s.id === id);

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#111" }}>
            {user.role === "teacher" ? "Manage Courses" : "Available Courses"}
          </div>
          <div style={{ fontSize: "14px", color: "#9ca3af", marginTop: "3px" }}>
            {user.role === "teacher" ? "Add, edit or remove courses" : "Browse and enroll in courses"}
          </div>
        </div>
        {user.role === "teacher" && (
          <button onClick={openAdd} style={{ background: "#6366f1", color: "white", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "13.5px", fontWeight: 500, cursor: "pointer" }}>
            + New course
          </button>
        )}
      </div>

      {message && (
        <div style={{ background: messageType === "success" ? "#f0fdf4" : "#fef2f2", border: "1px solid " + (messageType === "success" ? "#bbf7d0" : "#fecaca"), borderRadius: "8px", color: messageType === "success" ? "#16a34a" : "#dc2626", padding: "10px 14px", marginBottom: "20px", fontSize: "13px" }}>
          {message}
        </div>
      )}

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Course", "Instructor", "Schedule", "Seats", ""].map(h => (
                <th key={h} style={{ padding: "11px 18px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #f5f5f5" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 600, color: "#111" }}>{course.title}</td>
                <td style={{ padding: "14px 18px", fontSize: "14px", color: "#374151" }}>{course.instructor}</td>
                <td style={{ padding: "14px 18px", fontSize: "14px", color: "#374151" }}>{course.schedule}</td>
                <td style={{ padding: "14px 18px" }}>
                  {course.seats === 0
                    ? <span style={{ background: "#fef2f2", color: "#dc2626", borderRadius: "6px", padding: "3px 10px", fontSize: "12px", fontWeight: 500 }}>Full</span>
                    : <span style={{ background: "#f0fdf4", color: "#16a34a", borderRadius: "6px", padding: "3px 10px", fontSize: "12px", fontWeight: 500 }}>{course.seats} seats</span>
                  }
                </td>
                <td style={{ padding: "14px 18px" }}>
                  {user.role === "student" && (
                    isEnrolled(course.id)
                      ? <span style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "5px 12px", fontSize: "13px" }}>Enrolled</span>
                      : <button onClick={() => handleEnroll(course)} disabled={course.seats <= 0}
                          style={{ background: course.seats > 0 ? "#6366f1" : "#e5e7eb", color: course.seats > 0 ? "white" : "#9ca3af", border: "none", borderRadius: "8px", padding: "5px 12px", fontSize: "13px", cursor: course.seats > 0 ? "pointer" : "not-allowed" }}>
                          Enroll
                        </button>
                  )}
                  {user.role === "teacher" && (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => openEdit(course)} style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "5px 12px", fontSize: "13px", color: "#374151", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDelete(course.id)} style={{ background: "none", border: "1px solid #fecaca", borderRadius: "8px", padding: "5px 12px", fontSize: "13px", color: "#dc2626", cursor: "pointer" }}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", borderRadius: "16px", width: "460px", border: "1px solid #e5e7eb" }}>
            <div style={{ padding: "22px 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f5f5f5" }}>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#111" }}>{editCourse ? "Edit Course" : "New Course"}</div>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "18px", color: "#9ca3af", cursor: "pointer" }}>x</button>
            </div>
            <div style={{ padding: "20px 24px" }}>
              {[["Course name", "title", "text"], ["Instructor", "instructor", "text"], ["Schedule", "schedule", "text"], ["Total seats", "seats", "number"]].map(([label, key, type]) => (
                <div key={key} style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>{label}</label>
                  <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 24px 22px", display: "flex", gap: "10px" }}>
              <button onClick={handleSave} style={{ background: "#6366f1", color: "white", border: "none", borderRadius: "8px", padding: "8px 18px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>Save</button>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 18px", fontSize: "14px", color: "#374151", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};