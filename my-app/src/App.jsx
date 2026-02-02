import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const saveItem = () => {
    if (!text.trim()) return;

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = text;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, text]);
    }

    setText("");
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const editItem = (index) => {
    setText(items[index]);
    setEditIndex(index);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="hero-title">Just do it.</h1>

        <div className="todo-card">
          <div className="input-row">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a task..."
              onKeyDown={(e) => e.key === "Enter" && saveItem()}
            />

            <button onClick={saveItem}>
              {editIndex !== null ? "Update" : "I Got This!"}
            </button>
          </div>

          <ul className="list">
            {items.map((item, index) => (
              <li key={index} className="list-item">
                <span>{item}</span>

                <div>
                  <button onClick={() => editItem(index)}>✓</button>
                  <button onClick={() => deleteItem(index)}>🗑</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
