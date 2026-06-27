import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getTodoById, updateTodo } from "../api/todoApi";

export default function TodoDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    if (!id) {
      setError("No todo ID provided in the URL.");
      return;
    }
    getTodoById(id)
      .then((res) => {
        setTodo(res.data);
        setForm(res.data);
      })
      .catch(() => {
        setError("Todo not found. It may have been deleted.");
      });
  }, [id]);

  async function handleSave() {
    if (!form.title || form.title.trim() === "") {
      alert("Title cannot be empty.");
      return;
    }
    try {
      setSaving(true);
      const res = await updateTodo(id, form);
      setTodo(res.data);
      setEditing(false);
      setSaveMsg("Changes saved successfully!");
      setTimeout(() => setSaveMsg(""), 3000);
    } catch (err) {
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setForm(todo);
    setEditing(false);
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.center}>
          <h2 style={{ color: "#c62828" }}>⚠️ {error}</h2>
          <button style={styles.backBtn} onClick={() => navigate("/")}>
            ← Back to List
          </button>
        </div>
      </div>
    );
  }

  if (!todo) {
    return (
      <div style={styles.page}>
        <div style={styles.center}>
          <p style={{ color: "#999" }}>Loading todo...</p>
        </div>
      </div>
    );
  }

  const priorityColors = {
    low: "#43a047",
    medium: "#fb8c00",
    high: "#e53935",
  };

  const priorityIcons = { low: "🟢", medium: "🟡", high: "🔴" };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Back button */}
        <button style={styles.backBtn} onClick={() => navigate("/")}>
          ← Back to List
        </button>

        {/* Success message */}
        {saveMsg && <div style={styles.successBox}>{saveMsg}</div>}

        <div style={styles.card}>
          {/* Status Badge */}
          <div style={styles.topRow}>
            <span
              style={{
                ...styles.statusBadge,
                background: todo.completed ? "#43a047" : "#fb8c00",
              }}
            >
              {todo.completed ? "✅ Completed" : "🕐 Pending"}
            </span>

            <span
              style={{
                ...styles.priorityBadge,
                background: priorityColors[todo.priority],
              }}
            >
              {priorityIcons[todo.priority]} {todo.priority.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Title</label>
            {editing ? (
              <input
                style={styles.input}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            ) : (
              <h2 style={{
                ...styles.title,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#999" : "#1a1a2e",
              }}>
                {todo.title}
              </h2>
            )}
          </div>

          {/* Description */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Description</label>
            {editing ? (
              <textarea
                style={styles.textarea}
                value={form.description}
                placeholder="Add a description..."
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            ) : (
              <p style={styles.desc}>
                {todo.description || "No description provided."}
              </p>
            )}
          </div>

          {/* Priority */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Priority</label>
            {editing ? (
              <select
                style={styles.select}
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            ) : (
              <p style={{ color: priorityColors[todo.priority], fontWeight: "bold", margin: "4px 0" }}>
                {priorityIcons[todo.priority]} {todo.priority.toUpperCase()}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Due Date</label>
            {editing ? (
              <input
                type="date"
                style={styles.input}
                value={form.dueDate || ""}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
              />
            ) : (
              <p style={styles.metaText}>
                {todo.dueDate
                  ? `📅 ${new Date(todo.dueDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}`
                  : "No due date set"}
              </p>
            )}
          </div>

          {/* Completed toggle when editing */}
          {editing && (
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Mark as Completed</label>
              <label style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={form.completed}
                  onChange={(e) =>
                    setForm({ ...form, completed: e.target.checked })
                  }
                />
                <span style={{ marginLeft: 8 }}>
                  {form.completed ? "Yes, completed" : "Not yet completed"}
                </span>
              </label>
            </div>
          )}

          {/* Metadata */}
          <div style={styles.metaBox}>
            <p style={styles.metaText}>🆔 ID: {todo.id}</p>
            <p style={styles.metaText}>
              📅 Created: {new Date(todo.createdAt).toLocaleString()}
            </p>
            <p style={styles.metaText}>
              ✏️ Last Updated: {new Date(todo.updatedAt).toLocaleString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={styles.actions}>
            {editing ? (
              <>
                <button
                  style={styles.saveBtn}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "💾 Save Changes"}
                </button>
                <button style={styles.cancelBtn} onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button style={styles.editBtn} onClick={() => setEditing(true)}>
                ✏️ Edit Todo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    fontFamily: "sans-serif",
  },
  container: {
    maxWidth: 680,
    margin: "0 auto",
    padding: "30px 20px",
  },
  center: { textAlign: "center", paddingTop: 80 },
  backBtn: {
    background: "none",
    border: "1px solid #ccc",
    padding: "8px 18px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    marginBottom: 20,
    color: "#555",
  },
  successBox: {
    background: "#e8f5e9",
    border: "1px solid #a5d6a7",
    color: "#2e7d32",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 28,
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
  },
  topRow: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  statusBadge: {
    color: "#fff",
    padding: "5px 14px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: "bold",
  },
  priorityBadge: {
    color: "#fff",
    padding: "5px 14px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: "bold",
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    display: "block",
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    margin: "4px 0",
  },
  desc: {
    color: "#555",
    lineHeight: 1.6,
    margin: "4px 0",
  },
  input: {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 15,
    boxSizing: "border-box",
    marginTop: 4,
  },
  textarea: {
    width: "100%",
    height: 100,
    padding: "9px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    boxSizing: "border-box",
    marginTop: 4,
    resize: "vertical",
  },
  select: {
    padding: "9px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    marginTop: 4,
    width: "100%",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginTop: 4,
  },
  metaBox: {
    background: "#f9f9f9",
    borderRadius: 8,
    padding: 14,
    marginTop: 20,
    marginBottom: 20,
  },
  metaText: {
    fontSize: 12,
    color: "#888",
    margin: "4px 0",
  },
  actions: {
    display: "flex",
    gap: 10,
  },
  editBtn: {
    padding: "10px 24px",
    background: "#1565c0",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: "bold",
  },
  saveBtn: {
    padding: "10px 24px",
    background: "#43a047",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelBtn: {
    padding: "10px 24px",
    background: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: "bold",
  },
};
