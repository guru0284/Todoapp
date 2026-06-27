import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoList from "./pages/TodoList";
import TodoDetail from "./pages/TodoDetail";

export default function App() {
  return (
    <BrowserRouter>
      {/* Global Navigation */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.brand}>
          📝 TodoApp
        </Link>
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo" element={<TodoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  nav: {
    background: "#1a1a2e",
    padding: "14px 30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  brand: {
    color: "#fff",
    textDecoration: "none",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
};
