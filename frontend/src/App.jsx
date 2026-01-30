import TaskApp from "./components/TaskApp";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const API = "http://localhost:4000"; // docker service name

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // =========================
  // Fetch tasks on page load
  // =========================
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // Add Task (save to Mongo)
  // =========================
  const addTask = async () => {
    if (!title) return;

    try {
      const res = await axios.post(`${API}/tasks`, {
        title,
        desc,
      });

      setTasks([...tasks, res.data]);
      setTitle("");
      setDesc("");
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // Toggle Task
  // =========================
  const toggleTask = async (id) => {
    try {
      const res = await axios.put(`${API}/tasks/${id}`);

      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // Delete Task
  // =========================
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🚀 DevOps Task Manager</h1>

      <div className="input-row">
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      {tasks.map((task) => (
        <div key={task._id} className={`task ${task.done ? "done" : ""}`}>
          <div>
            <strong>{task.title}</strong> — {task.desc}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="toggle-btn"
              onClick={() => toggleTask(task._id)}
            >
              Toggle
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;