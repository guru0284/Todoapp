import { useState } from "react";
import { createTodo } from "../api/todoApi";

export default function AddTodo({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    try {
      setLoading(true);
      const res = await createTodo(form);
      onAdd(res.data);
      setForm({ title: "", description: "", priority: "medium", dueDate: "" });
      setError("");
    } catch (err) {
      setError("Failed to add todo. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.box}>
      <h3 style={styles.heading}>➕ Add New Todo</h3>

      {error && <p style={styles.error}>⚠️ {error}</p>}

      {/* Title */}
      <label style={styles.label}>Title *</label>
      <input
        style={styles.input}
        placeholder="What needs to be done?"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />

      {/* Description */}
      <label style={styles.label}>Description</label>
      <textarea
        style={styles.textarea}
        placeholder="Add more details (optional)..."
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* Priority & Due Date Row */}
      <div style={styles.row}>
        <div style={styles.half}>
          <label style={styles.label}>Priority</label>
          <select
            style={styles.select}
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        <div style={styles.half}>
          <label style={styles.label}>Due Date</label>
          <input
            type="date"
            style={styles.select}
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>
      </div>

      <button
        style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Adding..." : "✅ Add Todo"}
      </button>
    </div>
  );
}

const styles = {
  box: {
    background: "#eef2ff",
    border: "1px solid #c5cae9",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  heading: {
    margin: "0 0 14px 0",
    fontSize: 17,
    color: "#1a1a2e",
  },
  label: {
    display: "block",
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    width: "100%",
    padding: "9px 12px",
    marginBottom: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 15,
    boxSizing: "border-box",
    background: "#fff",
  },
  textarea: {
    width: "100%",
    height: 80,
    padding: "9px 12px",
    marginBottom: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    boxSizing: "border-box",
    resize: "vertical",
    background: "#fff",
  },
  row: {
    display: "flex",
    gap: 12,
    marginBottom: 14,
  },
  half: {
    flex: 1,
  },
  select: {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    background: "#fff",
    boxSizing: "border-box",
  },
  btn: {
    padding: "10px 24px",
    background: "#43a047",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: "bold",
  },
  error: {
    color: "#c62828",
    fontSize: 13,
    marginBottom: 10,
    background: "#ffebee",
    padding: "6px 10px",
    borderRadius: 6,
  },
};
