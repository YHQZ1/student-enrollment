import { useEffect, useState } from "react";

const API_URL = "/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", grade: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch students
  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Add or Update student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.age || !form.grade) return;

    try {
      if (editingId) {
        // Update existing student
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setEditingId(null);
      } else {
        // Create new student
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      setForm({ name: "", age: "", grade: "" });
      await loadStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  // Edit student
  const handleEdit = (student) => {
    setForm({
      name: student.name,
      age: student.age,
      grade: student.grade,
    });
    setEditingId(student._id);
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      await loadStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setForm({ name: "", age: "", grade: "" });
    setEditingId(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,300&family=Karla:wght@400;500;600;700&display=swap');
        
        :root {
          --cream: #faf8f5;
          --charcoal: #1a1a1a;
          --terracotta: #d4735e;
          --sage: #7a9b76;
          --warm-gray: #8a8376;
          --light-terracotta: #f2ded9;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Karla', sans-serif;
          background: var(--cream);
          color: var(--charcoal);
          line-height: 1.6;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .page-wrapper {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 40px 20px;
          position: relative;
        }

        .page-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--light-terracotta) 0%, transparent 70%);
          opacity: 0.4;
          pointer-events: none;
        }

        .container {
          width: 100%;
          max-width: 720px;
          background: white;
          border: 2px solid var(--charcoal);
          box-shadow: 12px 12px 0 var(--charcoal);
          position: relative;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .header {
          background: var(--charcoal);
          padding: 48px 56px;
          border-bottom: 2px solid var(--charcoal);
          position: relative;
          overflow: hidden;
        }

        .header::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: var(--terracotta);
          opacity: 0.15;
          border-radius: 50%;
        }

        .header-content {
          position: relative;
          z-index: 1;
        }

        .academic-year {
          font-family: 'Karla', sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--warm-gray);
          margin-bottom: 12px;
          font-weight: 600;
        }

        .title {
          font-family: 'Fraunces', serif;
          font-size: 48px;
          font-weight: 700;
          color: var(--cream);
          margin-bottom: 8px;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .subtitle {
          font-size: 15px;
          color: var(--warm-gray);
          font-weight: 400;
          font-style: italic;
        }

        .main-content {
          padding: 56px;
        }

        .section {
          margin-bottom: 48px;
        }

        .section:last-child {
          margin-bottom: 0;
        }

        .section-label {
          font-family: 'Karla', sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--warm-gray);
          margin-bottom: 24px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-label::before {
          content: '';
          width: 32px;
          height: 2px;
          background: var(--terracotta);
        }

        .form-grid {
          display: grid;
          gap: 24px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-label {
          font-family: 'Fraunces', serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--charcoal);
          margin-bottom: 10px;
          display: block;
        }

        .text-input {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid var(--charcoal);
          background: var(--cream);
          font-family: 'Karla', sans-serif;
          font-size: 16px;
          color: var(--charcoal);
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .text-input:focus {
          outline: none;
          background: white;
          border-color: var(--terracotta);
          box-shadow: 4px 4px 0 var(--light-terracotta);
          transform: translate(-2px, -2px);
        }

        .text-input::placeholder {
          color: var(--warm-gray);
          font-weight: 400;
        }

        .submit-btn {
          width: 100%;
          padding: 18px 32px;
          background: var(--terracotta);
          border: 2px solid var(--charcoal);
          color: white;
          font-family: 'Karla', sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: 8px;
          box-shadow: 4px 4px 0 var(--charcoal);
        }

        .submit-btn:hover {
          transform: translate(-4px, -4px);
          box-shadow: 8px 8px 0 var(--charcoal);
        }

        .submit-btn:active {
          transform: translate(0, 0);
          box-shadow: 2px 2px 0 var(--charcoal);
        }

        .cancel-btn {
          background: var(--warm-gray);
          margin-top: 12px;
        }

        .cancel-btn:hover {
          background: #7a7366;
        }

        .divider {
          height: 2px;
          background: var(--charcoal);
          margin: 48px 0;
          position: relative;
        }

        .divider::after {
          content: '✦';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 0 16px;
          color: var(--terracotta);
          font-size: 12px;
        }

        .roster-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 32px;
        }

        .roster-title {
          font-family: 'Fraunces', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--charcoal);
        }

        .count-badge {
          background: var(--sage);
          color: white;
          padding: 6px 18px;
          border: 2px solid var(--charcoal);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .student-grid {
          list-style: none;
          display: grid;
          gap: 16px;
        }

        .student-card {
          border: 2px solid var(--charcoal);
          background: white;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          animation: slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 20px;
          align-items: center;
        }

        .student-card:hover {
          background: var(--light-terracotta);
          transform: translate(-4px, -4px);
          box-shadow: 4px 4px 0 var(--charcoal);
        }

        .student-number {
          font-family: 'Fraunces', serif;
          font-size: 42px;
          font-weight: 300;
          color: var(--terracotta);
          line-height: 1;
          font-style: italic;
          opacity: 0.4;
        }

        .student-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .student-name {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--charcoal);
          line-height: 1.3;
        }

        .student-meta {
          display: flex;
          gap: 16px;
          font-size: 14px;
          color: var(--warm-gray);
          font-weight: 500;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .meta-item::before {
          content: '•';
          color: var(--terracotta);
        }

        .grade-display {
          background: var(--charcoal);
          color: white;
          padding: 8px 20px;
          border: 2px solid var(--charcoal);
          font-family: 'Fraunces', serif;
          font-size: 18px;
          font-weight: 700;
          min-width: 60px;
          text-align: center;
        }

        .empty-state {
          text-align: center;
          padding: 64px 32px;
          border: 2px dashed var(--warm-gray);
          background: var(--cream);
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.3;
        }

        .empty-title {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 8px;
        }

        .empty-text {
          font-size: 15px;
          color: var(--warm-gray);
          font-style: italic;
        }

        /* Action buttons styles */
        .student-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }

        .action-btn {
          padding: 6px 16px;
          border: 2px solid var(--charcoal);
          font-family: 'Karla', sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
        }

        .edit-btn {
          background: var(--sage);
          color: white;
        }

        .edit-btn:hover {
          background: #6a8a66;
          transform: translateY(-2px);
        }

        .delete-btn {
          background: var(--terracotta);
          color: white;
        }

        .delete-btn:hover {
          background: #c3624e;
          transform: translateY(-2px);
        }

        .edit-indicator {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .edit-badge {
          background: var(--sage);
          color: white;
          padding: 6px 16px;
          border: 2px solid var(--charcoal);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .edit-cancel-btn {
          background: var(--warm-gray);
          color: white;
          padding: 6px 16px;
          border: 2px solid var(--charcoal);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-cancel-btn:hover {
          background: #7a7366;
          transform: translateY(-2px);
        }

        .loading-state {
          text-align: center;
          padding: 64px 32px;
          border: 2px dashed var(--warm-gray);
          background: var(--cream);
        }

        .loading-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.3;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }

        .loading-title {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 8px;
        }

        @media (max-width: 768px) {
          .container {
            box-shadow: 8px 8px 0 var(--charcoal);
          }

          .header,
          .main-content {
            padding: 32px 28px;
          }

          .title {
            font-size: 36px;
          }

          .student-card {
            grid-template-columns: 1fr;
            gap: 16px;
            text-align: center;
          }

          .student-number {
            display: none;
          }

          .student-meta {
            justify-content: center;
          }

          .grade-display {
            justify-self: center;
            margin-bottom: 12px;
          }

          .roster-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="container">
          <header className="header">
            <div className="header-content">
              <div className="academic-year">Academic Year 2024–2025</div>
              <h1 className="title">Student Registry</h1>
              <p className="subtitle">Class enrollment & academic records</p>
            </div>
          </header>

          <div className="main-content">
            <section className="section">
              {editingId ? (
                <div className="edit-indicator">
                  <div className="section-label">Edit Student</div>
                  <button className="edit-cancel-btn" onClick={handleCancel}>
                    Cancel Edit
                  </button>
                </div>
              ) : (
                <div className="section-label">New Enrollment</div>
              )}

              <form className="form-grid" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                  <label className="input-label">Full Name</label>
                  <input
                    className="text-input"
                    type="text"
                    placeholder="Enter student's full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Age</label>
                  <input
                    className="text-input"
                    type="number"
                    placeholder="Student's age"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    min="1"
                    max="100"
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Current Grade</label>
                  <input
                    className="text-input"
                    type="text"
                    placeholder="e.g., A, B+, C"
                    value={form.grade}
                    onChange={(e) =>
                      setForm({ ...form, grade: e.target.value })
                    }
                    required
                  />
                </div>

                <button className="submit-btn" type="submit">
                  {editingId ? "Update Student" : "Enroll Student"}
                </button>

                {editingId && (
                  <button
                    className="submit-btn cancel-btn"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </section>

            <div className="divider" />

            <section className="section">
              <div className="roster-header">
                <h2 className="roster-title">Current Roster</h2>
                <div className="count-badge">
                  {loading ? "..." : `${students.length} enrolled`}
                </div>
              </div>

              {loading ? (
                <div className="loading-state">
                  <div className="loading-icon">⏳</div>
                  <div className="loading-title">Loading students...</div>
                </div>
              ) : students.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📖</div>
                  <div className="empty-title">No students enrolled</div>
                  <div className="empty-text">
                    Begin by adding your first student above
                  </div>
                </div>
              ) : (
                <ul className="student-grid">
                  {students.map((s, index) => (
                    <li
                      key={s._id}
                      className="student-card"
                      style={{ animationDelay: `${index * 0.08}s` }}
                    >
                      <div className="student-number">{index + 1}</div>
                      <div className="student-details">
                        <div className="student-name">{s.name}</div>
                        <div className="student-meta">
                          <span className="meta-item">{s.age} years</span>
                          <span className="meta-item">
                            ID: {s._id.slice(-6)}
                          </span>
                        </div>
                        <div className="student-actions">
                          <button
                            className="action-btn edit-btn"
                            onClick={() => handleEdit(s)}
                          >
                            Edit
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDelete(s._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="grade-display">{s.grade}</div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
