import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  /* =============================
     SAVE TO LOCALSTORAGE
  ============================= */
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // ADD or UPDATE
  const saveUser = () => {
    if (!name || !email || !phone) return;

    const newUser = { name, email, phone };

    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = newUser;
      setUsers(updated);
      setEditIndex(null);
    } else {
      setUsers([...users, newUser]);
    }

    setName("");
    setEmail("");
    setPhone("");
  };

  // DELETE
  const deleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  // EDIT
  const editUser = (index) => {
    const user = users[index];

    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setEditIndex(index);
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <h1 className="hero-title">Contact Info</h1>

      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* INPUTS */}
      <div className="form-row">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={saveUser}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* LIST */}
      <div className="todo-card">
        {users.map((user, index) => (
          <div key={index} className="list-item">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.phone}</span>

            <div>
              <button onClick={() => editUser(index)}>✏️</button>
              <button onClick={() => deleteUser(index)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
