export default function TodoItem({ todo, onToggle, onDelete, onView }) {
  const priorityColors = {
    low: "#43a047",
    medium: "#fb8c00",
    high: "#e53935",
  };

  const priorityIcons = { low: "🟢", medium: "🟡", high: "🔴" };

  // Check if due date has passed
  const isOverdue =
    todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <div
      style={{
        ...styles.card,
        opacity: todo.completed ? 0.65 : 1,
        borderLeft: `5px solid ${priorityColors[todo.priority]}`,
      }}
    >
      <div style={styles.topRow}>
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          style={styles.checkbox}
          title={todo.completed ? "Mark as pending" : "Mark as completed"}
        />

        {/* Title */}
        <span
          style={{
            ...styles.title,
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#aaa" : "#222",
          }}
        >
          {todo.title}
        </span>

        {/* Priority Tag */}
        <span
          style={{
            ...styles.priorityTag,
            background: priorityColors[todo.priority],
          }}
        >
          {priorityIcons[todo.priority]} {todo.priority}
        </span>
      </div>

      {/* Description preview */}
      {todo.description && (
        <p style={styles.desc}>
          {todo.description.length > 80
            ? todo.description.slice(0, 80) + "..."
            : todo.description}
        </p>
      )}

      <div style={styles.bottomRow}>
        {/* Due Date */}
        <span
          style={{
            ...styles.dueDate,
            color: isOverdue ? "#e53935" : "#999",
          }}
        >
          {todo.dueDate
            ? `${isOverdue ? "⚠️ Overdue:" : "📅"} ${todo.dueDate}`
            : ""}
        </span>

        {/* Action Buttons */}
        <div style={styles.btns}>
          <button
            style={styles.viewBtn}
            onClick={() => onView(todo.id)}
            title="View details"
          >
            👁 View
          </button>
          <button
            style={styles.deleteBtn}
            onClick={() => onDelete(todo.id)}
            title="Delete todo"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: 10,
    padding: "14px 18px",
    marginBottom: 12,
    boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
    transition: "box-shadow 0.2s",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    cursor: "pointer",
    flexShrink: 0,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  priorityTag: {
    color: "#fff",
    fontSize: 11,
    padding: "3px 10px",
    borderRadius: 12,
    fontWeight: "bold",
    flexShrink: 0,
  },
  desc: {
    fontSize: 13,
    color: "#777",
    margin: "6px 0 0 28px",
    lineHeight: 1.5,
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  dueDate: {
    fontSize: 12,
    fontWeight: "500",
  },
  btns: {
    display: "flex",
    gap: 8,
  },
  viewBtn: {
    padding: "5px 14px",
    background: "#1565c0",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
  },
  deleteBtn: {
    padding: "5px 14px",
    background: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
  },
};
