import { useEffect, useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const API_URL = "http://localhost:3000/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", grade: "" });

  // Fetch students
  const loadStudents = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Add student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.age || !form.grade) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", age: "", grade: "" });
    loadStudents();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f4f6f8, #e9ebee)",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "#fff",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
          Student Management
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Age"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Grade"
            value={form.grade}
            onChange={(e) => setForm({ ...form, grade: e.target.value })}
            style={inputStyle}
          />

          <button style={buttonStyle}>Add Student</button>
        </form>

        <ul style={{ marginTop: "18px", padding: 0 }}>
          {students.map((s) => (
            <li
              key={s._id}
              style={{
                listStyle: "none",
                padding: "10px",
                marginBottom: "8px",
                background: "#f2f2f2",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              <strong>{s.name}</strong> ({s.age}) — {s.grade}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
