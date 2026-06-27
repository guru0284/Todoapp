export default function FilterBar({ filter, setFilter, priority, setPriority }) {
  const statusOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "🕐 Active" },
    { value: "completed", label: "✅ Done" },
  ];

  return (
    <div style={styles.bar}>
      {/* Status Filter */}
      <div style={styles.group}>
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            style={{
              ...styles.filterBtn,
              background: filter === opt.value ? "#1a1a2e" : "#fff",
              color: filter === opt.value ? "#fff" : "#444",
              border: filter === opt.value
                ? "1px solid #1a1a2e"
                : "1px solid #ddd",
            }}
            onClick={() => setFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Priority Filter */}
      <select
        style={styles.select}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="all">All Priorities</option>
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
      </select>
    </div>
  );
}

const styles = {
  bar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    flexWrap: "wrap",
    gap: 8,
  },
  group: {
    display: "flex",
    gap: 6,
  },
  filterBtn: {
    padding: "7px 16px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: "500",
    transition: "all 0.15s",
  },
  select: {
    padding: "7px 12px",
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 13,
    background: "#fff",
    cursor: "pointer",
  },
};
